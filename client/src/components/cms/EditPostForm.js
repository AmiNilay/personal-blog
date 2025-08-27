import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, updatePost } from '../../api';

const EditPostForm = () => {
  const [postData, setPostData] = useState({ title: '', content: '', imageUrl: '' });
  const [status, setStatus] = useState({ message: '', type: '' });
  const { id } = useParams(); // Gets the post ID from the URL
  const navigate = useNavigate(); // To redirect after successful update

  // Step 1: Fetch the existing post data when the component loads
  useEffect(() => {
    const getPost = async () => {
      setStatus({ message: 'Loading post data...', type: 'loading' });
      try {
        const { data } = await fetchPostById(id);
        setPostData({
          title: data.title,
          content: data.content,
          imageUrl: data.imageUrl || '',
        });
        setStatus({ message: '', type: '' });
      } catch (error) {
        setStatus({ message: 'Could not find post.', type: 'error' });
        console.error(error);
      }
    };
    getPost();
  }, [id]);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  // Step 2: Handle the form submission to update the post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: 'Updating...', type: 'loading' });
    try {
      await updatePost(id, postData);
      setStatus({ message: 'Post updated successfully!', type: 'success' });
      // Redirect to the post page after a short delay
      setTimeout(() => navigate(`/post/${id}`), 1500);
    } catch (error) {
      setStatus({ message: 'Failed to update post.', type: 'error' });
      console.error(error);
    }
  };

  // Dynamic styling for status messages
  const messageStyle = {
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontWeight: '600',
    backgroundColor: status.type === 'success' ? 'rgba(45, 212, 191, 0.2)' : 
                       status.type === 'error' ? 'rgba(244, 114, 114, 0.2)' : 
                       status.type === 'loading' ? 'rgba(251, 211, 141, 0.2)' : 'transparent',
    color: status.type === 'success' ? '#14b8a6' : 
           status.type === 'error' ? '#ef4444' : 
           status.type === 'loading' ? '#f59e0b' : 'var(--text-secondary)',
  };

  if (status.type === 'error' && !postData.title) {
    return <div style={messageStyle}>{status.message}</div>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Edit Post</h2>
      
      {status.message && <div style={messageStyle}>{status.message}</div>}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={postData.title}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content (Markdown is supported)</label>
        <textarea
          id="content"
          name="content"
          value={postData.content}
          onChange={handleChange}
          className="form-textarea"
          rows="15"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Header Image URL (Optional)</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          value={postData.imageUrl}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <button type="submit" className="btn" disabled={status.type === 'loading'}>
        {status.type === 'loading' ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default EditPostForm;