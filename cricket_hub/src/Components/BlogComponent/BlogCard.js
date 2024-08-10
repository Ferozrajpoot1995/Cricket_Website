// src/BlogComponent/BlogCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogCard = ({id,title, description, imageUrl }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" style={{ height: '280px' }} src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Please Click on Read More button to read the full description.</Card.Text>
        <Link to={`/${id}`} className="btn btn-primary">Read More</Link>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
