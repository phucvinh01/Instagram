import GridPostList from '@/components/GridPostList';
import SearchResults from '@/components/SearchResults';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'

const Explore = () => {

  const [searchValue, setSearchValue] = useState<string>('')


  return (
     <div className="explore-container">
        
      
{/* 
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div> */}

      {/* {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )} */}
    </div>
  )
}

export default Explore