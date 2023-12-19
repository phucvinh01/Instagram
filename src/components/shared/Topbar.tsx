import  { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queryAndMutation'
import { useUserContext } from '@/context/AuthContext'

const Topbar = () => {

    const {user} = useUserContext()
    const navigate = useNavigate()
    const {mutate: signOut, isSuccess} = useSignOutAccount()
    useEffect(() => {
        if(isSuccess) {
            navigate(0)
        }
    },[isSuccess])
  return (
    <section className='topbar'>
        <div className='flex-between py-4 px-5'>
            <Link className='flex gap-3 items-center' to={'/'}>
                <img src='/assets/images/logo.svg' alt='logo' 
                width={130}
                height={325}
                />
            </Link>
            <div className='flex gap-4'>
                <Button onClick={() =>signOut()} variant={"ghost"} className='shad-button_ghost'>
                    <img  src='/assets/icons/logout.svg'  alt='logout'/>
                </Button>
                <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
                    <img src={user.imageUrl}  className='h-8 w-8 rounded-full'/>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default Topbar