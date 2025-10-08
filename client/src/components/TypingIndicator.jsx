function TypingIndicator({ typingUser }) {
  if (!typingUser) return null;

  return (
    <div className="px-6 py-3 bg-white border-t border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
          {typingUser.charAt(0).toUpperCase()}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            {typingUser}
          </span>
          <span className="text-sm text-gray-500">is typing</span>
          <div className="flex space-x-1 ml-1">
            <div
              className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
