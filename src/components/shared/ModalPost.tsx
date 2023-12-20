import { useState } from 'react';
import { Modal } from 'antd';
import { Models } from 'appwrite';
import { formatRelativeTime } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import PostStats from '../PostStats';
import { Button } from '../ui/button';

type ModalPostProps = {
  post: Models.Document;
  option: 'img' | 'text';
  widthImg?: string;
  heightImg?: string
};

const ModalPost = ({ post, option, widthImg, heightImg }: ModalPostProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserContext();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {option === 'img' ? (
        <img
          className={`rounded-md ${heightImg ? `w-[${heightImg}]`: 'm-h-[486px]'} ${widthImg ? widthImg: 'm-w-[486px]'}`}
          src={post.imageUrl}
          alt={post.caption}
          onClick={showModal}
        />
      ) : (
        <p className='cursor-pointer text-sm text-gray-500' onClick={showModal}>Show all 30 comment</p>
      )}

      <Modal
        width={1000}
        centered
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        style={{
          color: 'white',
        }}
        onCancel={handleCancel}>
        <div className='flex flex-col lg:flex-row gap-4 mt-5'>
          <div className='flex-between lg:hidden lg:border-b lg:py-4 sm:mb-2'>
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
          <img
            src={post.imageUrl}
            className='lg:w-[60%]  w-full max-h-[572px]'
          />
          <div className='lg:w-[40%] w-full flex flex-col lg:gap-5 gap-1'>
            <div className='border-b py-4 hidden lg:flex-between'>
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
            <div className='h-1/2 lg:flex justify-center items-center hidden'>
              "commet"
            </div>
            <div className='lg:border'></div>
            <PostStats
              post={post}
              userId={user.id}
            />
            <div className='lg:flex items-center justify-between gap-3 hidden'>
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

              <input
                className='bg-transparent border-none outline-none p-2 '
                placeholder='insert new comment'
              />

              <Button
                variant={'ghost'}
                className='shad-button_ghost'>
                Insert
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalPost;
