import { SignupForm } from '@/components/screen/signup/signup-form'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className="container-md my-16 flex items-center justify-center">

       <SignupForm/>
      </div>
    
  )
}