// src/components/PostCard.tsx
import React, { useState } from 'react';
import type { Post } from '../store/userStore';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl   border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex-1 capitalize leading-snug">
          {post.title}
        </h3>
        <span className="bg-gray-700/50 text-gray-400 px-3 py-1 rounded-lg text-xs font-medium ml-4 whitespace-nowrap border border-gray-600/50">
          #{post.id}
        </span>
      </div>

      <div className="text-gray-400 text-sm leading-relaxed">
        {isExpanded ? (
          <p className="mb-4">{post.body}</p>
        ) : (
          <p className="mb-4 line-clamp-3">{post.body}</p>
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors"
      >
        {isExpanded ? (
          <>
            Show Less
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </>
        ) : (
          <>
            Read More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

export default PostCard;