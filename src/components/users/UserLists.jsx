import {useEffect, useState} from 'react'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'

function UserLists() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async() => {
    fetch(`${process.env.REACT_APP_GITHUB_BASE_URL}/users`,
    {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    })
    .then(res => res.json()) 
    .then(data => {
      setUsers(data)
      setLoading(false)
    })
  }

  if(!loading){
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <UserItem key={user.id} user={user}/>
        ))}
      </div>
    )
  } else {
    return (
      <>
        <Spinner />
        <div className='w-100'>
          <div className='mx-auto'>
          <p className='text-center text-2xl ml-5'>Loading...</p>
          </div>
        </div>
      </>      
    )
  }  
}

export default UserLists