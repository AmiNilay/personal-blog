import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchPostById, deletePost } from '../api';
import PostDetail from '../components/blog/PostDetail';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // React Router hooks for getting URL parameters and redirecting
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetches the post data when the component loads or the ID changes
  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const { data } = await fetchPostById(id);
        setPost(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError('Failed to fetch the post. It may not exist or the server is down.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [id]); // The effect re-runs if the `id` parameter changes

  // Handler function for the delete button
  const handleDelete = async () => {
    // Show a confirmation dialog to prevent accidental deletion
    if (window.confirm('Are you sure you want to permanently delete this post?')) {
      try {
        await deletePost(id);
        alert('Post deleted successfully.');
        navigate('/'); // Redirect to the homepage after successful deletion
      } catch (err) {
        console.error('Failed to delete the post.', err);
        alert('An error occurred while deleting the post.');
      }
    }
  };

  // --- Conditional Rendering ---

  // Show a loading message while data is being fetched
  if (loading) {
    return <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading post...</p>;
  }

  // Show an error message if the fetch failed
  if (error) {
    return <p style={{ color: '#f47067', textAlign: 'center', fontSize: '1.2rem' }}>{error}</p>;
  }

  // --- Main Component Render ---
  return (
    <div>
      {/* Container for action buttons */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        
        {/* "Edit Post" button that links to the edit page */}
        <Link to={`/edit/post/${id}`} className="btn">
          Edit Post
        </Link>
        
        {/* "Delete Post" button with custom styling to indicate a destructive action */}
        <button 
          onClick={handleDelete} 
          className="btn" 
          style={{ 
            background: '#b91c1c', // A dangerous red color
            boxShadow: '0 0 15px rgba(185, 28, 28, 0.5)' // A subtle red glow
          }}
        >
          Delete Post
        </button>

      </div>

      {/* The component that renders the actual post content */}
      <PostDetail post={post} />
    </div>
  );
};

export default PostPage;