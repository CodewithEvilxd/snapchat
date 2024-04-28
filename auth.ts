import NextAuth from "next-auth"
import Github from "next-auth/providers/github";
import connectDatabase from "./lib/db";
import { User } from "./models/user.model";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
        clientId:process.env.NEXT_GITHUB_CLIENT_ID,
        clientSecret:process.env.NEXT_GITHUB_CLIENT_SECRET
    })
  ],
  secret:process.env.NEXTAUTH_SECRET,

  callbacks:{
    async session({session}:{session:any}){
        try {
            await connectDatabase();
            if(session.user){
                const user = await User.findOne({email: session.user.email});
                if(user){
                    session.user._id = user._id;
                    return session;
                }else{
                    console.log('User not found');
                }
            }else{
                console.log('Invalid session');
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async signIn({account, profile}){
        if(account?.provider === 'github'){
            await connectDatabase();
            try {
                const user = await User.findOne({email:profile?.email});
                if(!user){
                    const newUser = await User.create({
                        username:profile?.login,
                        fullname:profile?.name,
                        email:profile?.email,
                        profilePhoto:profile?.avatar_url,
                    })
                    await newUser.save();
                }
                return true;
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        return false;
    }
  }
});