import React from 'react'
import SnapchatLogo from "@/public/snapchat-logo.png"
import Image from 'next/image'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-gray-300 h-screen'>
            <div className='w-screen h-screen flex items-center justify-center'>
                <div className='bg-white p-10 flex flex-col items-center text-center shadow-lg rounded-md'>
                    <Image
                        src={SnapchatLogo}
                        alt="snapchat-logo"
                        width={40}
                        height={40}
                    />
                    {children}
                </div>
            </div>

        </div>
    )
}

export default layout