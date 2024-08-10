// src/components/BlogPostDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

const apiUrl = 'https://localhost:7191/api/BlogPost'; // Replace with your API URL

const BlogPostDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${id}`);
        setBlog(response.data);
      } catch (error) {
        setError('Error fetching blog post details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!blog) return <p>No blog post found.</p>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img 
         
          src={blog.imagePath || 'https://via.placeholder.com/150'} 
          style={{ 
            height: '300px', 
            objectFit: 'cover' // Ensures image maintains its aspect ratio
          }} 
        />
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>{blog.description}</Card.Text>
          <Card.Text><small className="text-muted">Created At: {new Date(blog.createdAt).toLocaleString()}</small></Card.Text>
          <Card.Text><small className="text-muted">Updated At: {new Date(blog.updatedAt).toLocaleString()}</small></Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlogPostDetail;
