import Loader from '@/components/Loader';
import SavedOption from '@/components/SavedOption';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useGetSavedPosts } from '@/lib/react-query/queryAndMutation';
import { Models } from 'appwrite';

const Saved = () => {
  const { user } = useUserContext();

  const { data: posts, isPending: isPostLoading } = useGetSavedPosts(user.id);

  return (
    <div className='flex flex-col gap-6 p-10 h-screen'>
      <div className='flex gap-2 items-center justify-start mb-[30px]'>
        <img
          src='/assets/icons/save.svg'
          width={40}
        />
        <p className='text-4xl font-bold'>Saved Posts</p>
      </div>

      <SavedOption />
      <div className='mt-[30px]'>
        {isPostLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <div className='grid grid-cols-3 gap-4'>
            {posts?.documents.map((post: Models.Document) => {
              return (
                <img
                  className='w-[330px] h-[330px] rounded-2xl'
                  src={post.post?.imageUrl}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className='flex justify-center'>
        <Button className='shad-button_dark_4 my-[60px] '>Load More</Button>
      </div>
    </div>
  );
};

export default Saved;
