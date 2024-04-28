import LeftSidebar from '@/components/LeftSidebar'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex h-screen'>
        <LeftSidebar/>
        {children}
    </div>
  )
}

export default Layout