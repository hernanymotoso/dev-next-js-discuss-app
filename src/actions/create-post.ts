'use server'

import { z } from "zod"
import { auth } from "@/auth"
import { Post } from "@prisma/client"
import { db } from "@/db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { routePaths } from "@/routePaths"

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
})

type CreatePostFormState = {
    fieldErrors: {
        title?: string[]
        content?: string[]
        _form?: string[]
    }
}

export async function createPost(slug: string, formState: CreatePostFormState,formData: FormData): Promise<CreatePostFormState> {    
    const parsedFields = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content")
    })

    if(!parsedFields.success) {
        const fieldErrors = parsedFields.error.flatten().fieldErrors
        return { fieldErrors }
    }

    const session = await auth()
    if(!session || !session.user) {
        return {
            fieldErrors: {
                _form: ["You must be signed in to create a topic"]               
            }
        }
    }

    const topic = await db.topic.findFirst({
        where: { slug }
    })

    if(!topic) {
        return {
            fieldErrors: {
                _form: ["Topic not found"]
            }
        }
    }

    let post: Post
    try {
        post = await db.post.create({
            data: {
                title: parsedFields.data.title,
                content: parsedFields.data.content,
                topicId: topic.id,
                userId: session.user.id || ''
            }
        })
    } catch (error) {
        if(error instanceof Error) {
            return {
                fieldErrors: {
                    _form: [error.message]
                }
            }
        }

        return {
            fieldErrors: {
                _form: ["Something went wrong"]
            }
        }
    }

    console.log({post})
    revalidatePath(routePaths.topicShow(slug))
    redirect(routePaths.postShow(slug, post.id))
}