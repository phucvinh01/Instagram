
import Loader from '@/components/shared/Loader';
import ModalPost from '@/components/shared/ModalPost';
import { useUserContext } from '@/context/AuthContext';
import { useGetSavedPosts } from '@/lib/react-query/queryAndMutation';
import { Models } from 'appwrite';

const Saved = () => {
  const { user } = useUserContext();

  const { data: posts, isPending: isPostLoading } = useGetSavedPosts(user.id);

  return ( 
      <div className='mt-[30px]'>
        {isPostLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <div className='grid grid-cols-3 gap-4'>
            {posts?.documents.map((post: Models.Document) => {
              return (
                <ModalPost post={post.post} option='img'/>
              );
            })}
          </div>
        )}
      </div>
  );
};

export default Saved;
