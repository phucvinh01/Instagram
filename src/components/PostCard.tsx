import { formatRelativeTime } from '@/lib/utils';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import PostStats from './PostStats';
import ModalPost from '@/components/shared/ModalPost';
import { Smile } from 'lucide-react';

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  return (
    <div className='post-card'>
      <div className='flex-between mb-4'>
        <div className='flex items-center gap-3'>
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                '/assets/icons/profile-placeholder.svg'
              }
              alt='creator'
              className='w-12 lg:h-12 rounded-full'
            />
          </Link>

          <div className='flex flex-col'>
            <p className='base-medium lg:body-bold text-light-1'>
              {post.creator.name}
            </p>
            <div className='flex-center gap-2 text-light-3'>
              <p className='subtle-semibold lg:small-regular '>
                {formatRelativeTime(post.$createdAt)}
              </p>
              •
              <p className='subtle-semibold lg:small-regular'>
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && 'hidden'}`}>
          <img
            src={'/assets/icons/edit.svg'}
            alt='edit'
            width={20}
            height={20}
          />
        </Link>
      </div>

      <ModalPost post={post} option='img' />
      <div className='mt-2 w-full'>
        <PostStats
          post={post}
          userId={user.id}
        />
      </div>

      <div className='small-medium lg:base-medium py-2'>
        <p>{post.caption}</p>
        <ul className='flex gap-1 mt-2'>
          {post.tags.map((tag: string, index: string) => (
            <li
              key={`${tag}${index}`}
              className='text-light-3 small-regular'>
              #{tag}
            </li>
          ))}
        </ul>
      </div>

      <ModalPost post={post} option='text' />

      <div className='flex justify-between items-center'>
          <input className='outline-none bg-transparent py-3' placeholder='Insert comment' />
          <Smile />
      </div>

      <div className='border mt-3'></div>
    </div>
  );
};

export default PostCard;
