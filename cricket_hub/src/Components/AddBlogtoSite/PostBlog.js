import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const apiUrl = 'https://localhost:7191/api/BlogPost'; // Replace with your API URL

const BlogPostCrud = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imagePath: '',
        createdAt: '',
        updatedAt: ''
    });

    const [posts, setPosts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false); // Added loading state
    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(apiUrl);
            setPosts(response.data);
        } catch (error) {
            setError('Error fetching blog posts. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (editingId) {
                await axios.put(`${apiUrl}/${editingId}`, formData);
            } else {
                await axios.post(apiUrl, formData);
            }
            fetchPosts();
            resetForm();
        } catch (error) {
            setError('Error submitting form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (post) => {
        setFormData(post);
        setEditingId(post.id); // Assuming `id` is the unique identifier
    };

    const handleDelete = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${apiUrl}/${id}`);
            fetchPosts();
        } catch (error) {
            setError('Error deleting post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            imagePath: '',
            createdAt: '',
            updatedAt: ''
        });
        setEditingId(null);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">{editingId ? 'Edit Blog Post' : 'Create Blog Post'}</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="imagePath" className="form-label">Image Path:</label>
                    <input
                        type="text"
                        id="imagePath"
                        name="imagePath"
                        className="form-control"
                        value={formData.imagePath}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="createdAt" className="form-label">Created At:</label>
                    <input
                        type="datetime-local"
                        id="createdAt"
                        name="createdAt"
                        className="form-control"
                        value={formData.createdAt}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="updatedAt" className="form-label">Updated At:</label>
                    <input
                        type="datetime-local"
                        id="updatedAt"
                        name="updatedAt"
                        className="form-control"
                        value={formData.updatedAt}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Processing...' : (editingId ? 'Update Post' : 'Create Post')}
                </button>
                {error && <p className="text-danger mt-2">{error}</p>} {/* Display error if any */}
            </form>

            <h2>Blog Posts List</h2>
            {loading ? <p>Loading...</p> : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image Path</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">No blog posts available</td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.description}</td>
                                    <td>{post.imagePath}</td>
                                    <td>{new Date(post.createdAt).toLocaleString()}</td>
                                    <td>{new Date(post.updatedAt).toLocaleString()}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(post)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BlogPostCrud;
