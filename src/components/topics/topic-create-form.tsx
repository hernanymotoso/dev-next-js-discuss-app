'use client'

import { useActionState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@nextui-org/popover'
import { Input, Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import * as actions from '@/actions'
import FormButton from '../common/form-button'

export default function TopicCreateForm() {
    const [formState, action, pending] = useActionState(actions.createTopic, { fieldErrors: {} })

    return (
        <Popover placement='left'>
            <PopoverTrigger>
                <Button color='primary'>Create a Topic</Button>
            </PopoverTrigger>

            <PopoverContent>
                <form action={action}>
                    <div className='flex flex-col gap-4 p-4 w-80'>
                        <h3 className='text-lg'>Create a Topic</h3>

                        <Input 
                            name="name" 
                            label="Name" 
                            labelPlacement='outside' 
                            placeholder='Name'
                            isInvalid={!!formState.fieldErrors.name} 
                            errorMessage={formState.fieldErrors.name?.join(', ')}
                        />

                        <Textarea 
                            name="description"
                            label="Description"
                            labelPlacement="outside"
                            placeholder="Describe your topic"
                            isInvalid={!!formState.fieldErrors.description} 
                            errorMessage={formState.fieldErrors.description?.join(', ')}
                        />

                        {formState.fieldErrors._form ? (
                            <div className='rounded p-2 bg-red-200 border border-red-400'>
                                {formState.fieldErrors._form.join(', ')}
                            </div>
                        ) : null}

                       <FormButton isLoading={pending}>Save</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}