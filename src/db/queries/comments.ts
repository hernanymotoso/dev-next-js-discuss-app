import { db } from "@/db";
import { Comment } from "@prisma/client";

export type CommentWithData = (
    Comment & {
        user: {
            name: string | null;
            image: string | null;
        }
    }
)

export async function fetchCommentsByPostId(postId: string): Promise<CommentWithData[]> {
    return await db.comment.findMany({
        where: { postId },
        include: {
            user: { select: { name: true, image: true } },
        }
    });
}