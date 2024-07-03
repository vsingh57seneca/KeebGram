import React from 'react'
import { useRouter } from 'next/router'

const index = () => {
    const router = useRouter();

  return (
    <div>
        <button className='btn btn-sm btn-success text-white' onClick={() => router.push('/editor/create')}>Create</button>
    </div>
  )
}

export default index