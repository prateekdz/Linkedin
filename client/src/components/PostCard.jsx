import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { postService } from '../services';
import { useAuth } from '../hooks/useAuth';

const PostCard = ({ post, onUpdate }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.likes.some(like => like._id === user._id));
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      await postService.likePost(post._id);
      setIsLiked(!isLiked);
      onUpdate?.();
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await postService.addComment(post._id, { text: comment });
      setComment('');
      onUpdate?.();
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {post.author.firstName.charAt(0)}
          </div>
          <div className="ml-3 flex-1">
            <p className="font-semibold text-gray-900">
              {post.author.firstName} {post.author.lastName}
            </p>
            <p className="text-xs text-gray-600">{post.author.headline || 'User'}</p>
            <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
          </div>
        </div>

        <p className="text-gray-900 mb-3 leading-relaxed">{post.content}</p>

        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="w-full rounded-lg mb-3 max-h-96 object-cover"
          />
        )}

        <div className="flex justify-between text-gray-600 text-sm mb-4 py-2 border-t border-gray-200">
          <button className="flex items-center gap-2 hover:text-blue-600 transition">
            <Heart size={18} />
            <span>{post.likes.length}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <MessageCircle size={18} />
            <span>{post.comments.length}</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600 transition">
            <Share2 size={18} />
          </button>
        </div>

        <div className="flex gap-2 pt-3 border-t border-gray-200">
          <button
            onClick={handleLike}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
              isLiked
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            Like
          </button>
          <button className="flex-1 py-2 px-4 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <MessageCircle size={18} />
            Comment
          </button>
        </div>

        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <form onSubmit={handleComment} className="mb-4 flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Post
              </button>
            </form>

            <div className="space-y-3">
              {post.comments.map((c) => (
                <div key={c._id} className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold">
                    {c.user.firstName.charAt(0)}
                  </div>
                  <div className="bg-gray-50 rounded-lg px-3 py-2 flex-1">
                    <p className="font-semibold text-sm text-gray-900">
                      {c.user.firstName} {c.user.lastName}
                    </p>
                    <p className="text-sm text-gray-700">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
