 import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const MainDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { users, fetchUsers } = useUserStore();

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers, users.length]);

  // Getting the number of cities and users to compute for my main page
  const stats = useMemo(() => {
    const cities = new Set(users.map(u => u.address.city));
    const companies = new Set(users.map(u => u.company.name));
    
    return {
      totalUsers: users.length,
      totalCities: cities.size,
      totalCompanies: companies.size,
      avgUsersPerCity: users.length > 0 ? (users.length / cities.size).toFixed(1) : '0'
    };
  }, [users]);

  // The most Recent users  
  const recentUsers = useMemo(() => {
    return users.slice(-5).reverse();
  }, [users]);

  // City distribution data
  const cityData = useMemo(() => {
    const cityCount: Record<string, number> = {};
    users.forEach(user => {
      cityCount[user.address.city] = (cityCount[user.address.city] || 0) + 1;
    });
    return Object.entries(cityCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [users]);

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-green-500 text-sm font-medium">+100%</span>
          </div>
          <div className="text-gray-400 text-sm mb-1">Total Users</div>
          <div className="text-3xl font-bold text-white">{stats.totalUsers}</div>
        </div>

         <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-cyan-500 text-sm font-medium">Active</span>
          </div>
          <div className="text-gray-400 text-sm mb-1">Cities</div>
          <div className="text-3xl font-bold text-white">{stats.totalCities}</div>
        </div>

         <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-purple-500 text-sm font-medium">Growing</span>
          </div>
          <div className="text-gray-400 text-sm mb-1">Companies</div>
          <div className="text-3xl font-bold text-white">{stats.totalCompanies}</div>
        </div>

         <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-green-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-green-500 text-sm font-medium">Stable</span>
          </div>
          <div className="text-gray-400 text-sm mb-1">Avg Users/City</div>
          <div className="text-3xl font-bold text-white">{stats.avgUsersPerCity}</div>
        </div>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">City Distribution</h2>
            <button 
              onClick={() => navigate('/users')}
              className="text-blue-500 hover:text-blue-400 text-sm font-medium transition"
            >
              View All →
            </button>
          </div>

          <div className="space-y-4">
            {cityData.map(([city, count], index) => {
              const percentage = (count / users.length) * 100;
              const colors = ['blue', 'cyan', 'purple', 'green', 'yellow'];
              const color = colors[index % colors.length];
              
              return (
                <div key={city} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{city}</span>
                    <span className="text-gray-400">{count} users ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full bg-linear-to-r from-${color}-500 to-${color}-400 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        
        <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/users')}
              className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              View All Users
            </button>

            <button className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Data
            </button>

            <button 
              onClick={() => fetchUsers()}
              className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Data
            </button>
          </div>
        </div>
      </div>


      <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Users</h2>
          <button 
            onClick={() => navigate('/users')}
            className="text-blue-500 hover:text-blue-400 text-sm font-medium transition"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {recentUsers.map(user => (
            <div 
              key={user.id}
              onClick={() => navigate(`/user/${user.id}`)}
              className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 hover:border-blue-500/50 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto group-hover:scale-110 transition-transform">
                {user.name.charAt(0)}
              </div>
              <h3 className="text-white font-medium text-center mb-1 truncate">{user.name}</h3>
              <p className="text-gray-400 text-xs text-center truncate">{user.email}</p>
              <p className="text-gray-500 text-xs text-center mt-2">{user.address.city}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;