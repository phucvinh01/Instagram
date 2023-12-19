import  { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queryAndMutation';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import { Skeleton } from 'antd';

const LeftSideBar = () => {
  const { user,isLoading } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <nav className='leftsidebar fixed h-screen'>
      <div className='flex flex-col gap-7'>
        <Link
          className='flex gap-3 items-center'
          to={'/'}>
          <img
            src='/assets/images/logo.svg'
            alt='logo'
            width={170}
          />
        </Link>   
       

        <ul className='flex flex-col gap-4'>
          {sidebarLinks.map((item: INavLink) => {
            const isActive = pathname === item.route ;
            return (
              <li
                key={item.label}
                className={`flex py-1 gap-2 leftsidebar-link group ${
                  isActive && 'bg-primary-500'
                }`}>
                <NavLink
                  to={item.route}
                  className='flex items-center gap-2 p-2 '>
                  <img
                    className={`group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                    src={item.imgURL}
                    alt={item.imgURL}
                  />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

         {
          isLoading ? (<Skeleton avatar/>) : (<> <Link
          to={`/profile/${user.id}`}
          className={`flex  items-center py-1 px-2 gap-2 leftsidebar-link group `}>
          <img
            src={user.imageUrl}
            className='h-8 w-8 rounded-full'
          /> 
          <p>Profile</p>         
        </Link></>)
        }
        
      </div>
        <Button
          onClick={() => signOut()}
          variant={'ghost'}
          className='shad-button_ghost mt-7'>
          <img
            src='/assets/icons/logout.svg'
            alt='logout'
          />
          <p className='small-medium lg:base-medium'>Logout</p>
        </Button>
    </nav>
  );
};

export default LeftSideBar;
