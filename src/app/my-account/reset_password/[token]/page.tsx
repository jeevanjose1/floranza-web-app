import { ChangePassword } from '@/components/screen/change-password/change-password'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className="container-md my-16 flex items-center justify-center">

       <ChangePassword/>
      </div>
    
  )
}