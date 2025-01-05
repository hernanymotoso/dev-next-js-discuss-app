'use server'

import { z } from "zod"
import { auth } from "@/auth"
import { redirect } from 'next/navigation'
import { db } from "@/db"
import { routePaths } from "@/routePaths"
import { revalidatePath } from "next/cache"
import { Topic } from "@prisma/client"

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/[a-z-]/, {
        message: "Must be lowercase letters or dashes without spaces"
    }),
    description: z.string().min(10)
})

type CreateTopicFormState = {
    fieldErrors: {
        name?: string[]
        description?: string[]
        _form?: string[]
    }
}

export async function createTopic(formState: CreateTopicFormState,formData: FormData): Promise<CreateTopicFormState> {
    
    await new Promise(resolve => setTimeout(resolve, 44000))
   
    const parsedFields = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description")
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

    let topic: Topic
    try {
        topic = await db.topic.create({
            data: {
                slug: parsedFields.data.name,
                description: parsedFields.data.description
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

    revalidatePath(routePaths.home())
    redirect(routePaths.topicShow(topic.slug))
}