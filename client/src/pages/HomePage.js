import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion
import { fetchPosts } from '../api';
import PostCard from '../components/blog/PostCard';
import SentimentAnalyzer from '../components/aiml/SentimentAnalyzer';
import PostCardSkeleton from '../components/blog/PostCardSkeleton'; // Import Skeleton
import './HomePage.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from API on component mount
  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch posts. Is the server running?');
        console.error(err);
      } finally {
        // Add a small delay to show off the skeleton loader
        setTimeout(() => setLoading(false), 1000);
      }
    };
    getPosts();
  }, []);

  // Filter posts whenever the search query or original post list changes
  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);


  // Framer Motion variants for the container of the post cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Each child will animate 0.1s after the previous one
      }
    }
  };


  return (
    <div>
      <section className="hero">
        <h1 className="hero-title">A Developer's Journal</h1>
        <p className="hero-subtitle">Exploring the intersection of AI, Machine Learning, and Modern Web Development.</p>
      </section>

      <section>
        {/* Search Bar */}
        <div className="search-container form-group">
            <input 
                type="text"
                placeholder="Search articles..."
                className="form-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        <h2 style={{ marginBottom: '2rem' }}>Latest Articles</h2>
        {error && <p style={{ color: '#f47067' }}>{error}</p>}
        
        {/* Conditional Rendering Logic */}
        {loading ? (
            // Show Skeleton Loaders while loading
            <div>
                <PostCardSkeleton />
                <PostCardSkeleton />
            </div>
        ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <p>
                  {searchQuery ? 'No posts found matching your search.' : 'No posts yet. Why not create one?'}
                </p>
              )}
            </motion.div>
        )}
      </section>

      <section style={{ marginTop: '4rem' }}>
        <SentimentAnalyzer />
      </section>
    </div>
  );
};

export default HomePage;