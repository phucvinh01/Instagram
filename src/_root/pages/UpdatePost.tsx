import FormPost from '@/components/forms/FormPost';
import { useGetPostById } from '@/lib/react-query/queryAndMutation';
import { Loader } from 'lucide-react';
import { useParams } from 'react-router-dom';

const UpdatePost = () => {

  const {id} = useParams()

  const {data:post, isPending} = useGetPostById(id || '')


  if(isPending) {
    return <><Loader /></>
  }
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-xl flex-start justify-start w-full gap-3'>
          <img
            src='/assets/icons/add-post.svg'
            alt='gallery-add'
            className='text-white'
          />
          <p className='text-white font-bold text-left w-full'> Update post</p>
        </div>
        <FormPost action="update" post ={post} />
      </div>
    </div>
  );
};

export default UpdatePost;
