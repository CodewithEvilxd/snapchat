'use client'
import { ArrowBigLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { deleteChat } from '@/lib/serveractions'
import { useParams } from 'next/navigation'
import { useFormStatus } from 'react-dom'

const ChatTopbar = ({ userProfile }: { userProfile: any }) => {
    const {id} = useParams<{id:string}>();
    const deleteChatHandler = deleteChat.bind(null,id);
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <Link href={'/chat'} >
                    <ArrowBigLeft />
                </Link>
                <div className='flex items-center gap-1'>
                    <Avatar>
                        <AvatarImage src={userProfile.profilePhoto} alt='user-profile-photo' />
                    </Avatar>
                    <h1 className='font-bold'>{userProfile.fullname}</h1>
                </div>
            </div>
            <form action={deleteChatHandler}>
                <SubmitButton />
            </form>
        </div>
    )
}

export default ChatTopbar

const SubmitButton = () => {
    const {pending} = useFormStatus();
    return (
        <Button variant={'destructive'} className='rounded-full'>
            {
                !pending ? "Clear Chat" : <Button variant={'destructive'} className='rounded-full'> <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>
            }
        </Button>
    )
}