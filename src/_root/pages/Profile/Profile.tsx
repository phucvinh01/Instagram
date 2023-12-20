import GridPostList from '@/components/shared/GridPostList';
import { useUserContext } from '@/context/AuthContext';
import { useGetUserPosts } from '@/lib/react-query/queryAndMutation';

const Profile = () => {
  const { user } = useUserContext();

  const {data:posts, isPending: isGetPost} = useGetUserPosts(user.id)

  return ( 
        <GridPostList post = {posts as any}  isLoading = {isGetPost} />
  );
};

export default Profile;
