 import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import PostCard from '../components/postCard';
import LoadingSpinner from '../components/loadingSpinner';

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { 
    users,
    selectedUser,
    userPosts, 
    isLoadingPosts, 
    fetchUsers,
    fetchUserPosts,
    setSelectedUser
  } = useUserStore();

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers, users.length]);

  useEffect(() => {
    if (id && users.length > 0) {
      const user = users.find(u => u.id === parseInt(id));
      if (user) {
        setSelectedUser(user);
        fetchUserPosts(user.id);
      }
    }
  }, [id, users, setSelectedUser, fetchUserPosts]);

  if (!selectedUser && users.length > 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">User Not Found</h2>
          <p className="text-gray-400 mb-6">The user you're looking for doesn't exist</p>
          <button
            onClick={() => navigate('/users')}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all font-medium"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  if (!selectedUser) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
       <button
        onClick={() => navigate('/users')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Users
      </button>

       <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden">
         <div className="h-32 bg-linear-to-r from-blue-500 via-cyan-500 to-purple-500"></div>
        
        <div className="px-8 pb-8">
           <div className="flex items-end gap-6 -mt-16 mb-6">
            <div className="w-32 h-32 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-5xl border-4 border-gray-900 shadow-xl">
              {selectedUser.name.charAt(0)}
            </div>
            <div className="flex-1 mb-4">
              <h1 className="text-3xl font-bold text-white mb-2">{selectedUser.name}</h1>
              <p className="text-gray-400 text-lg">@{selectedUser.username}</p>
            </div>
            <div className="mb-4 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/20">
              ID: {selectedUser.id}
            </div>
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Email</div>
                  <div className="text-sm text-gray-300">{selectedUser.email}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Phone</div>
                  <div className="text-sm text-gray-300">{selectedUser.phone}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Website</div>
                  <div className="text-sm text-blue-400">{selectedUser.website}</div>
                </div>
              </div>
            </div>

           
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Address
              </h3>
              <div className="space-y-1 text-sm text-gray-300">
                <p>{selectedUser.address.suite}, {selectedUser.address.street}</p>
                <p>{selectedUser.address.city}</p>
                <p className="text-gray-400">{selectedUser.address.zipcode}</p>
              </div>
            </div>

             <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Company
              </h3>
              <div className="space-y-2">
                <div className="text-base font-semibold text-white">{selectedUser.company.name}</div>
                <div className="text-sm text-gray-400 italic">"{selectedUser.company.catchPhrase}"</div>
                <div className="text-xs text-gray-500">{selectedUser.company.bs}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

       <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Posts</h2>
          {!isLoadingPosts && (
            <span className="text-gray-400 text-sm">{userPosts.length} posts</span>
          )}
        </div>

        {isLoadingPosts ? (
          <LoadingSpinner />
        ) : userPosts.length === 0 ? (
          <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Posts Yet</h3>
            <p className="text-gray-400">This user hasn't created any posts</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {userPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailPage;