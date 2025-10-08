function Sidebar({ room, roomUsers, showSidebar, setShowSidebar }) {
  return (
    <div
      className={`${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed lg:relative z-30 w-72 bg-white border-r border-gray-200 h-full transition-transform duration-300 ease-in-out flex flex-col shadow-xl`}
    >
      {/* Sidebar Header */}
      <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Room Info
          </h3>
        </div>
        <button
          onClick={() => setShowSidebar(false)}
          className="lg:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Room Name Display */}
      <div className="p-5 border-b border-gray-200 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <p className="text-xs font-medium mb-1 text-white/80">Current Room</p>
        <p className="text-2xl font-bold flex items-center">
          <span className="mr-2">#</span>
          {room}
        </p>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wide">
            Members
          </h4>
          <span className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {roomUsers.length}
          </span>
        </div>
        <ul className="space-y-2">
          {roomUsers.map((user) => (
            <li
              key={user.socketId}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user.username}
                </p>
                <p className="text-xs text-green-600 font-medium">Online</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
