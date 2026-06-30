import React from 'react'
import User from './User'
import GetAllUser from '../Context/GetAllUser'

const Users = () => {
  const [allUser] = GetAllUser();
  console.log(allUser);
  return (
    <div  className="overflow-y-auto max-h-[82vh] ">
        {allUser.map((user,index)=>{
           return <User key={index} user = {user}/>
        }
        )}
    </div>
  )
}

export default Users