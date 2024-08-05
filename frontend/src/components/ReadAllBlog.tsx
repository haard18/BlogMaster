import React, { useState, useEffect } from "react";
import axios from "axios";

interface BlogPost {
  _id: string;
  user: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  __v: number;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/post/getAllBlogs");
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch blog posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center mt-4 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">All Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
              <p className="text-gray-600 mt-2">
                {blog.description.length > 100
                  ? `${blog.description.substring(0, 100)}...`
                  : blog.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Tag: {blog.tag}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Posted by User ID: {blog.user}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Date: {new Date(blog.date).toLocaleDateString()}
              </p>
              <button
                className="mt-4 inline-block text-blue-500 hover:underline"
                onClick={() => window.location.href = `/blog/${blog._id}`}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
