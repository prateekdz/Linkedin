import React from 'react';

const PostCard = ({ author, content, image, timeAgo = '1h', onLike }) => {
  return (
    <article className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-4 bg-white">
      <header className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">{author?.name || 'Unknown'}</div>
              <div className="text-xs text-gray-500">{author?.title || 'Member'}</div>
            </div>
            <div className="text-xs text-gray-400">{timeAgo}</div>
          </div>
        </div>
      </header>

      <div className="mt-3 text-sm text-gray-800">{content}</div>

      {image && (
        <div className="mt-3 rounded-lg overflow-hidden">
          <img src={image} alt="post" className="w-full h-auto object-cover" />
        </div>
      )}

      <footer className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <button
            onClick={onLike}
            className="px-3 py-2 rounded-lg hover:bg-gray-100 transition flex items-center gap-2"
          >
            <span>Like</span>
          </button>
          <button className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">Comment</button>
          <button className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">Share</button>
        </div>
        <div className="text-xs text-gray-400">0 comments</div>
      </footer>
    </article>
  );
};

export default PostCard;
