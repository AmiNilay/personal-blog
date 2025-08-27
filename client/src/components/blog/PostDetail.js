import React from 'react';
import ReactMarkdown from 'react-markdown';

const PostDetail = ({ post }) => {
  if (!post) {
    return null; // Or return a loading spinner/message
  }

  const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="post-detail">
      <h1>{post.title}</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Published on {postDate}
      </p>

      {post.imageUrl && (
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          style={{ 
            width: '100%', 
            borderRadius: '12px', 
            marginBottom: '2rem' 
          }} 
        />
      )}

      <div className="post-detail-content">
        {/* ReactMarkdown safely renders your blog content */}
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default PostDetail;