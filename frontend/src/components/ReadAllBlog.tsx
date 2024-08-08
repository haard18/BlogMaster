import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the BlogPost interface to match the response structure
interface BlogPost {
  _id: string;
  user: {
    _id: string; // Include user ID if needed
    username: string;
  };
  title: string;
  description: string;
  tag: string;
  date: string;
  __v: number;
  likes: number;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/post/getAllBlogs");
        setBlogs(response.data);

        // Initialize likes state
        const initialLikes = response.data.reduce(
          (acc: { [key: string]: number }, blog: BlogPost) => {
            acc[blog._id] = blog.likes || 0;
            return acc;
          },
          {}
        );
        setLikes(initialLikes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error); // Debugging line
        setError("Failed to fetch blog posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleLike = async (_id: string) => {
    if (!likedPosts[_id]) {
      try {
        console.log("Liking post with id:", _id); // Debugging line
        const response = await axios.put(`http://localhost:5000/api/post/like/${_id}`);
        console.log("Response from server:", response.data); // Debugging line

        const updatedLikes = response.data.likes; // Assuming `post.likes` is the number of likes

        setLikes((prevLikes) => ({
          ...prevLikes,
          [_id]: updatedLikes,
        }));

        setLikedPosts((prevLikedPosts) => ({
          ...prevLikedPosts,
          [_id]: true,
        }));
      } catch (error) {
        console.error("Failed to update likes in the database", error);
      }
    } else {
      console.log("Post already liked"); // Debugging line
    }
  };

  if (loading) {
    return <div className="text-center mt-4 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        All Blog Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
              <p className="text-gray-600 mt-2">
                {blog.description.length > 100
                  ? `${blog.description.substring(0, 100)}...`
                  : blog.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">Tag: {blog.tag}</p>
              <p className="text-sm text-gray-500 mt-2">Posted by: {blog.user.username}</p> {/* Access the username */}
              <p className="text-sm text-gray-500 mt-2">
                Date: {new Date(blog.date).toLocaleDateString()}
              </p>
              <button
                className="mt-4 inline-block text-blue-500 hover:underline"
                onClick={() => (window.location.href = `/blog/${blog._id}`)}
              >
                Read More
              </button>
              <button
                onClick={() => handleLike(blog._id)}
                className={`mt-4 px-4 py-2 rounded ${
                  likedPosts[blog._id] ? "bg-gray-500" : "bg-blue-500"
                } text-white`}
                disabled={likedPosts[blog._id]}
              >
                Like ({likes[blog._id]})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
