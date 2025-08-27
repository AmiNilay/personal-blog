import React from 'react';

const PostCardSkeleton = () => {
  return (
    <div className="post-card-skeleton">
      <div className="skeleton-line skeleton-title"></div>
      <div className="skeleton-line skeleton-text"></div>
      <div className="skeleton-line skeleton-text-short"></div>
    </div>
  );
};

export default PostCardSkeleton;