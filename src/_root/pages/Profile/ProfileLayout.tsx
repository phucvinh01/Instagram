import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useGetUserPosts } from '@/lib/react-query/queryAndMutation';
import { Loader } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const ProfileLayout = () => {

  const { user } = useUserContext();
  const {data:posts, isPending: isGetPost} = useGetUserPosts(user.id)
  return (
     <div className='container lg:px-10 w-full'>
      <div className='lg:px-10 pt-4 pb-14 flex border-b'>
        <div className='w-1/3 flex justify-center items-center'>
          <img
            src={user.imageUrl}
            width={150}
            height={150}
            className='rounded-full'
          />
        </div>
        <div className='px-4 mt-6 flex flex-col gap-6 w-2/3 justify-start text-light-1'>
          <div className='flex sm:flex-row  gap-10 items-center'>
            <p>{user.username}</p>
            <Button className='shad-button_dark_4'>Edit profile</Button>
          </div>
          <div className='flex gap-10'>
            {isGetPost ? <Loader></Loader> : <p>{posts?.total} Post</p>}
            <p>30 follower</p>
            <p>100 follwing</p>
          </div>
          <p>{user.name}</p>
          <p>{user.bio}</p>
        </div>
        
      </div>
      <div className='flex justify-center items-center'>
        <ul className='flex gap-10'>
          <li className='p-4 cursor-pointer'>
            <NavLink to={`/profile/${user.username}`}>
              Post
            </NavLink>
          </li>
           <li className='p-4 cursor-pointer'>
             <NavLink to={`/profile/saved`}>
              Saved
            </NavLink>
          </li>
           <li className='p-4 cursor-pointer'>
             <NavLink to={`/profile/tag`}>
              Tag
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='mb-[100px]'>
        <Outlet />
      </div>
    </div>
  )
}

export default ProfileLayout