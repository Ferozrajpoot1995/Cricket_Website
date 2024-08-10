// src/components/BlogList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import BlogCard from '../BlogComponent/BlogCard';

const apiUrl = 'https://localhost:7191/api/BlogPost'; // Replace with your API URL

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(apiUrl);
        setBlogs(response.data);
      } catch (error) {
        setError('Error fetching blog posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const renderBlogRows = () => {
    const rows = [];
    for (let i = 0; i < blogs.length; i += 3) {
      const rowBlogs = blogs.slice(i, i + 3);
      rows.push(
        <Row key={i} className="mb-4">
          {rowBlogs.map((blog, index) => (
            <Col key={index} md={4}>
              <BlogCard
                id={blog.id}
                title={blog.title}
                description={blog.description}
                imageUrl={blog.imagePath || 'https://via.placeholder.com/150'} // Default image if none
              />
            </Col>
          ))}
        </Row>
      );
    }
    return rows;
  };

  return (
    <Container>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : blogs.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        renderBlogRows()
      )}
    </Container>
  );
};

export default BlogList;
