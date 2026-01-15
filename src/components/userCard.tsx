// src/components/UserCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../store/userStore';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/user/${user.id}`)}
      className="bg-linear-to-br  from-gray-800/50 to-gray-900/50   border border-gray-700/50 rounded-xl p-6 cursor-pointer hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10 group"
    >
      {/* useer card Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl     ">
          {user.name.charAt(0)}
        </div>
        <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg text-xs font-medium border border-blue-500/20">
          ID: {user.id}
        </div>
      </div>

      
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition">
          {user.name}
        </h3>
        <p className="text-gray-400 text-sm">@{user.username}</p>
      </div>
 
      <div className="space-y-2 mb-4 pb-4 border-b border-gray-700/50">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="truncate">{user.email}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="truncate">{user.phone}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{user.address.city}</span>
        </div>
      </div>

      {/* Company scetion */}
      <div className="mb-4">
        <div className="text-sm font-semibold text-gray-300 mb-1">{user.company.name}</div>
        <div className="text-xs text-gray-500 italic line-clamp-2">"{user.company.catchPhrase}"</div>
      </div>

      {/*  Button */}
      <button className="w-full px-4 py-2 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-blue-500/20 hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/50">
        View Profile
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default UserCard;