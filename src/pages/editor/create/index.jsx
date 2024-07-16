import EditorCreate from '@/components/editor/EditorCreate'
import React from 'react'
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
}

export default index