import EditorCreate from '@/components/editor/EditorCreate'
import React from 'react'
<<<<<<< HEAD

const index = () => {
  return (
    <div><EditorCreate /></div>
  )
=======
import { useRouter } from 'next/router'

const index = () => {

    const router = useRouter();
    const { design } = router.query;

    let initialData = null;
    if (design) {
        try {
            initialData = JSON.parse(decodeURIComponent(design));
        } catch (error) {
            console.error('Failed to parse design data: ', error);
        }
    }

    return (
        <div><EditorCreate initialData={initialData}/></div>
    )
>>>>>>> origin/dn
}

export default index