"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { routePaths } from "@/routePaths";

const createCommentSchema = z.object({
  content: z.string().min(3),
});

type CreateCommentFormState = {
  fieldErrors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createComment(
  { postId, parentId }: { postId: string; parentId?: string },
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const parsedFields = createCommentSchema.safeParse({
    content: formData.get("content"),
  });

  if (!parsedFields.success) {
    return {
      fieldErrors: parsedFields.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      fieldErrors: {
        _form: ["You must sign in to do this."],
      },
    };
  }

  try {
    await db.comment.create({
      data: {
        content: parsedFields.data.content,
        postId: postId,
        parentId: parentId,
        userId: session.user.id || '',
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        fieldErrors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        fieldErrors: {
          _form: ["Something went wrong..."],
        },
      };
    }
  }

  const topic = await db.topic.findFirst({
    where: { posts: { some: { id: postId } } },
  });

  if (!topic) {
    return {
      fieldErrors: {
        _form: ["Failed to revalidate topic"],
      },
    };
  }

  revalidatePath(routePaths.postShow(topic.slug, postId));
  return {
    fieldErrors: {},
    success: true,
  };
}
