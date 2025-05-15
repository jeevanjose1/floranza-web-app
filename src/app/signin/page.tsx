import { LoginForm } from '@/components/screen/signin/login-form'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className="container-md my-16 flex items-center justify-center">

       <LoginForm/>
      </div>
    
  )
}