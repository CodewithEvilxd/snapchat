import { signIn } from '@/auth'
import Signup from '@/components/Signup'
import React from 'react'

const SignupPage = () => {
  // inline function level
  const singupHandler = async () => {
    'use server'
    await signIn('github');
  }
  return (
    <form action={singupHandler}>
        <Signup/>
    </form>
  )
}

export default SignupPage