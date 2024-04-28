'use server'
import { auth, signOut } from "@/auth";
import { Chat } from "@/models/chat.model";
import { Message } from "@/models/message.model";
import { redirect } from "next/navigation";

import {v2 as cloudinary} from 'cloudinary';
import connectDatabase from "./db";
import { revalidatePath } from "next/cache";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

// module level server actions
export const sendSnapMessage = async (content: string, receiverId: string, messageType: 'image' | 'text') => {
    try {
        await connectDatabase();
        const authUser = await auth();
        const senderId = authUser?.user?._id;
        
        let uploadResponse;
        if(messageType === 'image'){
            uploadResponse = await cloudinary.uploader.upload(content);
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            content: uploadResponse?.secure_url || content,
            messageType
        });

        let chat = await Chat.findOne({
            participants:{$all:[senderId, receiverId]}
        });
        if(!chat){
            chat = await Chat.create({
                participants:[senderId, receiverId],
                messages:[newMessage._id]
            });
        }else{
            chat.messages.push(newMessage._id);
            await chat.save();
        }
        revalidatePath(`/chat/${receiverId}`);
        return JSON.parse(JSON.stringify(newMessage));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteChat = async (userId:string) => {
    try {
        await connectDatabase();
        const authUser = await auth();
        if(!authUser) return;
        
        const chat = await Chat.findOne({
            participants:{$all:[authUser?.user?._id, userId]}
        });
        if(!chat) return;

        const messageIdInString = chat.messages.map((id)=> id.toString());

        await Message.deleteMany({_id:{$in:messageIdInString}});
        await Chat.deleteOne({_id:chat._id});
        revalidatePath(`/chat/${userId}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
    redirect('/chat');
}


export const logoutHandler = async () => {
    try {
        await signOut();
    } catch (error) {
        console.log(error);
        throw error;
    }
    redirect("/login");
}
