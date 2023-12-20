import { useUserContext } from '@/context/AuthContext';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';

const RightSideBar = () => {
  const { user,isLoading } = useUserContext();

  return (
    <div className='right-side-bar'>
        {
          isLoading ? (<Skeleton avatar/>) : (<> <Link
          to={`/profile/${user.username}`}
          className={`flex  items-center py-1 px-2 gap-2  group `}>
          <img
            src={user.imageUrl}
            className='h-12 w-12 rounded-full'
          /> 
          <div className='flex flex-col gap-1'>
                <p className='text-light-1 text-xs font-bold'>{user.username}</p>   
                <p className='text-gray-500 text-xs'>{user.name}</p>
          </div>
                
        </Link></>)
        }
        <div className='flex justify-between'>
          <p>Suggest for you</p>
          <p>See all</p>
        </div>
    </div>
  )
}

export default RightSideBar