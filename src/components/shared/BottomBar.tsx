import { bottombarLinks  } from '@/constants';
import { INavLink } from '@/types';
import { NavLink, useLocation  } from 'react-router-dom';

const BottomBar = () => {
  const { pathname } = useLocation();
  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((item: INavLink) => {
        const isActive = pathname === item.route;
        return (
          <NavLink
            to={item.route}
            className={`flex items-center gap-2 p-2 ${
              isActive && 'bg-primary-500 rounded-md px-4 py-3 transition'
            }`}>
            <img
              className={`${
                isActive && 'invert-white'
              }`}
              src={item.imgURL}
              alt={item.imgURL}
              width={25}
            />
          </NavLink>
        );
      })}
    </section>
  );
};

export default BottomBar;
