import { Chat } from "@/models/chat.model";
import connectDatabase from "./db";

export const getMessage = async (loggedInUserId: string, otherUserId: string) => {
    try {
        await connectDatabase();

        const chatMessage = await Chat.findOne({
            participants:{$all:[loggedInUserId, otherUserId]}
        }).populate({
            path:'messages',
            populate:{
                path:'senderId',
                model:'User',
                select:'fullname'
            }
        });
        if(!chatMessage) return [];
        return JSON.parse(JSON.stringify(chatMessage.messages));
    } catch (error) {
        console.log(error);
        throw error;
    }
}