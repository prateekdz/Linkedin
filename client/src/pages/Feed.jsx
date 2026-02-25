import React, { useState, useEffect } from 'react';
import { postService } from '../services';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const loadPosts = async () => {
    try {
      setLoading(true);
      const { data } = await postService.getPosts();
      setPosts(data.posts);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await postService.createPost({ content: newPost });
      setNewPost('');
      loadPosts();
    } catch (err) {
      setError('Failed to create post');
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold">
                {user?.firstName?.charAt(0)}
              </div>
              <form onSubmit={handlePostSubmit} className="flex-1">
                <input
                  type="text"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Start a post, try writing here..."
                  className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:border border-gray-300 placeholder-gray-600"
                />
                <div className="mt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setNewPost('')}
                    className="px-6 py-2 text-gray-700 font-semibold hover:bg-gray-100 rounded-full transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newPost.trim()}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">No posts yet. Be the first to share!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} onUpdate={loadPosts} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Feed;
