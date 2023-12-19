import FormPost from '@/components/forms/FormPost';

const CreatePost = () => {
  return (
    <div className='flex flex-1 justify-center'>
      <div className='common-container'>
        <div className='max-w-lg flex-start justify-start w-full gap-3'>
          <img
            src='/assets/icons/add-post.svg'
            alt='gallery-add'
            className='text-white'
          />
          <p className='text-white font-bold text-left w-full'> Create post</p>
        </div>
        <FormPost action='create' />
      </div>
    </div>
  );
};

export default CreatePost;
