import React, { useContext } from 'react'
import { userDataContext } from '../Context/UserContext'

const NochatUse = () => {
    const{userData} = useContext(userDataContext);
  return (
    <>
    <div className='flex flex-col items-center justify-center mt-[40%]'>
        <h1 className='text-center'>No Conversation</h1>
        <p>Select a conversation to start a chat.</p>
        {userData.name}
    </div>
    </>
  )
}

export default NochatUse