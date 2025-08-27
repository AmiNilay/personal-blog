import React, { useState } from 'react';
import { createPost } from '../../api';

const CreatePostForm = () => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    imageUrl: '',
  });
  const [status, setStatus] = useState({ message: '', type: '' }); // 'success' or 'error'

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postData.title || !postData.content) {
      setStatus({ message: 'Title and Content are required.', type: 'error' });
      return;
    }
    
    setStatus({ message: 'Publishing...', type: 'loading' });

    try {
      await createPost(postData);
      setStatus({ message: 'Post created successfully! ✨', type: 'success' });
      // Clear form on success
      setPostData({ title: '', content: '', imageUrl: '' });
    } catch (error) {
      setStatus({ message: 'Failed to create post. Please try again.', type: 'error' });
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
                       status.type === 'error' ? 'rgba(244, 114, 114, 0.2)' : 'transparent',
    color: status.type === 'success' ? '#14b8a6' : 
           status.type === 'error' ? '#ef4444' : 'var(--text-secondary)',
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create New Post</h2>
      
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
          placeholder="Your Awesome Post Title"
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
          placeholder="Write your thoughts... You can use **bold**, *italic*, and code blocks."
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
          placeholder="https://example.com/image.png"
        />
      </div>
      <button type="submit" className="btn" disabled={status.type === 'loading'}>
        {status.type === 'loading' ? 'Publishing...' : 'Publish Post'}
      </button>
    </form>
  );
};

export default CreatePostForm;