import  { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useSignOutAccount } from '@/lib/react-query/queryAndMutation';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';

const LeftSideBar = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <nav className='leftsidebar'>
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
        <Link
          to={`/profile/${user.id}`}
          className='flex gap-3 items-center'>
          <img
            src={user.imageUrl}
            className='h-12 w-12 rounded-full'
          />
          <div className='flex flex-col gap-1'>
            <p className='body-blod'>{user.name}</p>
            <small>@{user.username}</small>
          </div>
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
