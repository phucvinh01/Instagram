import { Models } from 'appwrite';
import Loader from './Loader';
import React from 'react';
import { Empty } from 'antd';
import ModalPost from './ModalPost';

type GridPostListProps = {
  post: Models.DocumentList<Models.Document>;
  isLoading: boolean;
};

const GridPostList = ({ post, isLoading }: GridPostListProps) => {
  return isLoading ? (
    <div className='flex justify-center items-center'>
      <Loader />
    </div>
  ) : post.total === 0 ? (
    <div className='flex justify-center items-center'>
      <Empty />
    </div>
  ) : (
    <div className='grid grid-cols-3 gap-4'>
      {post?.documents.map((post: Models.Document, index:number) => {
        return (
          <React.Fragment key={index}>
            <ModalPost post={post} option='img' widthImg={'330px'} heightImg={'330px'}/>
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default GridPostList;
