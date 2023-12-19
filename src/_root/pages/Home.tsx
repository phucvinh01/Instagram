import PostCard from '@/components/PostCard'
import RightSideBar from '@/components/shared/RightSideBar'
import Story from '@/components/shared/Story'
import { useGetRecentPosts } from '@/lib/react-query/queryAndMutation'
import { Models } from 'appwrite'
import { Loader } from 'lucide-react'

const Home = () => {

  const {data:posts, isPending: isPostLoading} = useGetRecentPosts()


  return (
    <div className='flex'>
      <div className='home-container'>
         <Story />
        <div className='flex justify-center'>
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
      <RightSideBar />
    </div>
  )
}

export default Home