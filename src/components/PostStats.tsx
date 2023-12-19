import { Models } from 'appwrite';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa6';
import { TbLocationShare } from 'react-icons/tb';
import { checkIsLiked } from '@/lib/utils';
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from '@/lib/react-query/queryAndMutation';
import { Heart, LassoIcon, Send, ShareIcon } from 'lucide-react';

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = useLocation();
  const likesList = post.liked?.map((user: Models.Document) => user.$id);

  const [like, setLikes] = useState<string[]>([]);

  useEffect(() => {
    setLikes(likesList);
  }, []);

  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSaving } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...like];

    const hasLike = newLikes.includes(userId);

    if (hasLike) {
      newLikes = newLikes.filter((Id) => Id !== userId);
    } else {
      newLikes?.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    } else {
      savePost({ userId: userId, postId: post.$id });
      setIsSaved(true);
    }
  };

  const containerStyles = location.pathname.startsWith('/profile')
    ? 'w-[420px]'
    : '';

  return (
    <>
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className='flex gap-3'>     
        {
          checkIsLiked(like, userId)
              ? <Heart fill='red' color='red'  size={25} className='cursor-pointer'onClick={(e) => handleLikePost(e)}/>
              : <Heart  size={25} onClick={(e) => handleLikePost(e)}/>
        }
        
        <LassoIcon size={25} className='cursor-pointer'/>
        <Send size={25} className='cursor-pointer'/>
      </div>

      <div className='flex gap-2'>
        <img
          src={
            isSaving
              ? '/assets/icons/loader.svg'
              : isSaved
              ? '/assets/icons/saved.svg'
              : '/assets/icons/save.svg'
          }
          alt='share'
          width={30}
          height={30}
          className='cursor-pointer'
          onClick={(e) => handleSavePost(e)}
        />
      </div>

    </div>
    <p className='mt-1 text-light-1'>{like.length} liked</p>
    </>
  );
};

export default PostStats;
