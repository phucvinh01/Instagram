import BottomBar from '@/components/BottomBar'
import LeftSideBar from '@/components/LeftSideBar'
import Topbar from '@/components/Topbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Topbar />
      <LeftSideBar />
      <section className='flex flex-1 h-screen'>
         <Outlet />
      </section>
      <BottomBar /> 
    </div>
  )
}

export default RootLayout