import Loader from '@/components/Loader'
import PostCard from '@/components/PostCard'
import { useGetRecentPosts } from '@/lib/react-query/queryAndMutation'
import { Models } from 'appwrite'

const Home = () => {

  const {data:posts, isPending: isPostLoading} = useGetRecentPosts()

  console.log(posts);

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>
            Home Feed
          </h2>
          {
            isPostLoading && !posts ? (<Loader />) : (
              <ul className='flex flex-col flex-1 gap-4 w-full'>
                {
                  posts?.documents.map((post:Models.Document) => {
                    return (                     
                        <PostCard post = {post} />                     
                    )
                  })
                }
              </ul>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home