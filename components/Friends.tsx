import React from 'react'
import Friend from './Friend'
import { getSidebarUsers } from '@/lib/userdata'
import { auth } from '@/auth'

const Friends = async () => {
  const authUser = await auth();
  const otherUsers = authUser?.user ? await getSidebarUsers(authUser?.user?. id) : [];

  return (
    <div className='flex-1 overflow-y-auto'>
      {
        otherUsers.map((user) => {
          return (
            <Friend key={user._id} user={user}/>
          )
        })
      }

    </div>
  )
}

export default Friends