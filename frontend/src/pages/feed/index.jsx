import NavBar from '@/components/NavBar'
import React from 'react'

const index = () => {
  return (
    <>
        <div className="min-h-screen bg-white text-black">
          <div className="flex">
            <div className="w-fit m-2">
              <NavBar />
            </div>
            <div className="w-px min-h-screen bg-gradient-to-b from-white via-gray-700 to-white hidden md:block"></div>
            <div className="m-4 w-full flex justify-center items-center">Content</div>
          </div>
        </div>
    </>
  )
}

export default index