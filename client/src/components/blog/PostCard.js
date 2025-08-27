import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion

const PostCard = ({ post }) => {
  // Framer Motion variants for individual post cards
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const createSnippet = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
    return truncated + '...';
  };

  return (
    <motion.article className="post-card" variants={itemVariants}>
      <small style={{ color: 'var(--text-secondary)' }}>{postDate}</small>
      <Link to={`/post/${post._id}`}>
        <h2>{post.title}</h2>
      </Link>
      <p>{createSnippet(post.content, 150)}</p>
      <Link to={`/post/${post._id}`} className="read-more-link">
        Read Full Article →
      </Link>
    </motion.article>
  );
};

export default PostCard;