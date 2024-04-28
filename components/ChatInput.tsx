'use client';
import React, { useState } from 'react'
import { BiCamera } from 'react-icons/bi'
import { MdPhotoCamera } from 'react-icons/md'
import { Button } from './ui/button'
import { EmojiPopover } from './EmojiPopover'
import { sendSnapMessage } from '@/lib/serveractions';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const ChatInput = () => {
    const [inputText, setInputText] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const params = useParams<{ id: string }>();
    const receiverId = params.id;
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // inline server action / module level 
        try {
            setLoading(true);
            // send snap here using server action
            await sendSnapMessage(
                inputText,
                receiverId,
                "text"
            );
            setInputText("");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex justify-between items-center gap-2'>
            <div className='p-2 cursor-pointer bg-gray-200 rounded-full'>
                <MdPhotoCamera size={'24px'} />
            </div>
            <form onSubmit={submitHandler} className='w-full'>
                <div className='flex items-center gap-4'>
                    <input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        type='text'
                        placeholder='Send a snap message'
                        className='rounded-full w-full border border-gray-400 p-2 outline-none font-medium'
                    />
                    {
                        loading ?
                            (
                                <Button className='rounded-full'>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </Button>
                            ) :
                            (
                                <Button className='rounded-full' type='submit'>Send snap</Button>
                            )
                    }

                </div>
            </form>
            <div>
                <EmojiPopover />
            </div>
        </div>
    )
}

export default ChatInput