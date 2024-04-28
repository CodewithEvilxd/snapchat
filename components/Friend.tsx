import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { formatDate } from '@/lib/utils';
import { IoSend, IoSendOutline } from 'react-icons/io5';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { MdCheckCircleOutline } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';

const Friend = ({ user }: { user: any }) => {
  
  const lastMessage = user.lastMessage;
  const lastMessageType = lastMessage?.messageType;
  const formattedDate = lastMessage ? formatDate(lastMessage?.createdAt) : formatDate(new Date());
  const amISender = lastMessage && lastMessage?.senderId?._id !== user.participants[0]._id;
  const isMessageOpened = lastMessage?.openend;

  let messageStatus: string = '';
  let icon: JSX.Element = <IoMdSend/>;

  if (amISender) {
    messageStatus = isMessageOpened ? 'Opened' : 'Sent';
    icon = lastMessageType === 'text' ?
      (isMessageOpened ? <IoSend size={'16px'} className='text-[#00b4d8]' /> : <IoSendOutline size={'16px'} className='text-[#00b4d8]' />)
      :
      (isMessageOpened ? <RiCheckboxBlankFill size={'16px'} className='text-red-500' /> : <MdCheckCircleOutline size={'16px'} className='text-red-500' />)

  } else {
    if (!lastMessage) {
      icon = <RiCheckboxBlankFill />
      messageStatus = 'New Snap'
    }
  }


  return (
    <Link href={`/chat/${user._id}`} className='flex items-center justify-between border-b-2 border-[#E3E6E8] my-2 p-3'>
      <div className=' flex gap-2'>
        <Avatar>
          <AvatarImage src={user.participants[0].profilePhoto} alt={'profilephoto'} />
        </Avatar>
        <div>
          <h1 className='font-medium'>{user.participants[0].fullname}</h1>
          <p className={` ${messageStatus === "New Snap" ? 'text-purple-600' : null} text-xs font-bold text-gray-500 gap-1 flex`}>
            <span className={`${messageStatus === "New Snap" ? 'hidden' : null}`}>{icon}</span>
            {
              messageStatus === "New Snap" ? <span>{messageStatus} 🔥</span> : <span>{messageStatus} - {formattedDate} </span>
            }
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Friend