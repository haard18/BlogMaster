import React, { useState, useEffect } from "react";
import axios from "axios";
import { SparklesCore } from "./ui/sparkles";
import AppNavbar from "./AppNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faSpinner } from "@fortawesome/free-solid-svg-icons";

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
  likes: string[]; // Array of strings representing the IDs of users who liked the post
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [updatingLikes, setUpdatingLikes] = useState<{ [key: string]: boolean }>({});

  // Function to fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/post/getAllBlogs");
      const blogsData = response.data.map((blog: BlogPost) => ({
        ...blog,
        likes: blog.likes || [], // Ensure likes is always an array
      }));
      setBlogs(blogsData);

      // Update likedPosts state
      const userId = localStorage.getItem("userId") || ""; // Get the current user ID
      const likedPostsState = blogsData.reduce(
        (acc: { [key: string]: boolean }, blog: BlogPost) => {
          acc[blog._id] = blog.likes.includes(userId); // Mark posts as liked if user ID is in the likes array
          return acc;
        },
        {} as { [key: string]: boolean }
      );

      setLikedPosts(likedPostsState);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to fetch blog posts. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const likePost = async (_id: string) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      if (likedPosts[_id]) {
        alert("You have already liked this post!");
        return;
      }

      setUpdatingLikes((prevState) => ({
        ...prevState,
        [_id]: true,
      }));

      await axios.put(
        `http://localhost:5000/api/post/like/${_id}`,
        {},
        {
          headers: {
            "auth-token": token || "", // Include the token in the headers
          },
        }
      );

      // Refetch blogs after updating likes
      await fetchBlogs();

      // Update likedPosts state to reflect the change
      setLikedPosts((prevLikedPosts) => ({
        ...prevLikedPosts,
        [_id]: true, // Set the post as liked
      }));
    } catch (error) {
      console.error("Failed to like the post", error);
    } finally {
      setUpdatingLikes((prevState) => ({
        ...prevState,
        [_id]: false,
      }));
    }
  };

  const dislikePost = async (_id: string) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      setUpdatingLikes((prevState) => ({
        ...prevState,
        [_id]: true,
      }));

      await axios.delete(`http://localhost:5000/api/post/unlike/${_id}`, {
        headers: {
          "auth-token": token || "", // Include the token in the headers
        },
      });

      // Refetch blogs after updating likes
      await fetchBlogs();

      // Update likedPosts state to reflect the change
      setLikedPosts((prevLikedPosts) => ({
        ...prevLikedPosts,
        [_id]: false, // Set the post as disliked
      }));
    } catch (error) {
      console.error("Failed to dislike the post", error);
    } finally {
      setUpdatingLikes((prevState) => ({
        ...prevState,
        [_id]: false,
      }));
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-4 text-gray-500 flex justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin className="text-4xl" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden">
        <AppNavbar />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-start overflow-hidden pt-24 mt-[5%] h-max">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-500">
          All Blog Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 lg:px-16 xl:px-32 2xl:px-40">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white bg-opacity-10 backdrop-blur-lg shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-700"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{blog.title}</h2>
                <p className="text-gray-300 mb-4">
                  {blog.description.length > 150
                    ? `${blog.description.substring(0, 150)}...`
                    : blog.description}
                </p>
                <div className="flex justify-between items-center mb-4 text-gray-400">
                  <p className="text-sm">
                    Tag:{" "}
                    <span className="font-semibold text-blue-300">
                      {blog.tag}
                    </span>
                  </p>
                  <p className="text-sm">
                    Posted by:{" "}
                    <span className="font-semibold text-yellow-300">
                      {blog.user.username}
                    </span>
                  </p>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Date:{" "}
                  <span className="font-semibold">
                    {new Date(blog.date).toLocaleDateString()}
                  </span>
                </p>
                <div className="flex justify-between items-center">
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-4 py-2 rounded-md hover:shadow-md transition transform hover:scale-105"
                    onClick={() => (window.location.href = `/blog/${blog._id}`)}
                  >
                    Read More
                  </button>
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className={`text-2xl cursor-pointer transition transform hover:scale-125 ${
                        likedPosts[blog._id] ? "text-green-400" : "text-gray-500"
                      } ${updatingLikes[blog._id] ? "pointer-events-none" : ""}`}
                      onClick={() => !likedPosts[blog._id] && likePost(blog._id)}
                    />
                    <span className="text-white font-semibold">
                      {blog.likes.length}
                    </span>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className={`text-2xl cursor-pointer transition transform hover:scale-125 ${
                        likedPosts[blog._id] ? "text-red-400" : "text-gray-500"
                      }`}
                      onClick={() => dislikePost(blog._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={120}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
    </>
  );
};

export default BlogList;
