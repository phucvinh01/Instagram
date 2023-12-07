import {Outlet, Navigate} from 'react-router-dom'
import img from '/public/assets/images/side-img.svg'
const AuthLayout = () => {

    const isAuth = false

  return (
    <>
{
        isAuth ? (
            <Navigate to={'/'} />
        ) : (
            <>
                <section className='flex justify-center items-center flex-1 flex-col'>
                    <Outlet/>
                </section>
                <img src={img} alt='side' className='hidden xl:block w-1/2 bg-no-repeat object-cover' />
            </>
        )
    }
    </>
    
  )
}

export default AuthLayout