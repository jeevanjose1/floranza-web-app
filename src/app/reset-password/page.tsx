import { ResetPassword } from '@/components/screen/reset-password/reset-password'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className="container-md my-16 flex items-center justify-center">

       <ResetPassword/>
      </div>
    
  )
}