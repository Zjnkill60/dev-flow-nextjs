"use client"
import { removeAQuestion } from '@/lib/actions/question.action'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    type:string 
    itemId:string
    clerkId:string
}
const EditDeleteAction = ({type ,  itemId,clerkId} : Props) => {
    const router = useRouter()
    const handleDelete = async (e:any) => {
        e.preventDefault()
        e.stopPropagation()
        if(type == "Question") {
          await  removeAQuestion({_id :JSON.parse(itemId),clerkId})
        }
    }

    const handleEdit = (e:any) => {
        e.preventDefault()
        e.stopPropagation()
        router.push(`/questions/edit/${JSON.parse(itemId)}`)
    }
  return (
    <div className='flex items-center gap-4'>
        {type == "Question" && 
        <Image
            src={"/assets/icons/edit.svg"}
            alt='edit'
            width={16}
            height={16}
            className='object-contain'
            onClick={(e) => handleEdit(e)}

        />}
         <Image
            src={"/assets/icons/trash.svg"}
            alt='edit'
            width={16}
            height={16}
            className='object-contain'
            onClick={(e) => handleDelete(e)}
            />
    </div>
  )
}

export default EditDeleteAction