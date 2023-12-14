import FormPost from '@/components/forms/FormPost';
import React from 'react';

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-xl flex-start justify-start w-full gap-3'>
          <img
            src='/assets/icons/add-post.svg'
            alt='gallery-add'
            className='text-white'
          />
          <p className='text-white font-bold text-left w-full'> Create post</p>
        </div>
        <FormPost />
      </div>
    </div>
  );
};

export default CreatePost;
