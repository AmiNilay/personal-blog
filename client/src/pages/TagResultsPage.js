import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostsByTag } from '../api';
import PostCard from '../components/blog/PostCard';
import { motion } from 'framer-motion';

const TagResultsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tagName } = useParams(); // Get tag name from URL

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchPostsByTag(tagName);
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts by tag", error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [tagName]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  if (loading) return <p>Loading articles...</p>;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>
        Posts tagged with <span style={{ color: 'var(--primary-color)' }}>#{tagName}</span>
      </h1>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posts.length > 0 ? (
          posts.map(post => <PostCard key={post._id} post={post} />)
        ) : (
          <p>No posts found with this tag.</p>
        )}
      </motion.div>
    </div>
  );
};

export default TagResultsPage;