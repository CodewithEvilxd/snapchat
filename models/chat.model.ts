import mongoose, { Document, Model, Types } from "mongoose";

export interface ChatInterface{
    participants:Types.ObjectId[],
    messages:Types.ObjectId[],
}

export interface ChatDocument extends ChatInterface, Document{
    createdAt:Date,
    updatedAt:Date,
}

const chatModel = new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message'
        }
    ]
},{timestamps:true});
export const Chat : Model<ChatDocument> = mongoose?.models?.Chat || mongoose.model('Chat', chatModel);