import { useEffect, useRef } from "react";

function MessageList({ messages, currentUsername }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
      {messages.map((message, index) => {
        if (message.isSystem) {
          return (
            <div key={index} className="flex justify-center my-4">
              <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-100 px-4 py-2 rounded-full shadow-sm">
                <svg
                  className="w-4 h-4"
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
                <span className="font-medium">{message.text}</span>
              </div>
            </div>
          );
        }

        const isOwn = message.username === currentUsername;

        return (
          <div
            key={index}
            className={`flex ${
              isOwn ? "justify-end" : "justify-start"
            } animate-fade-in`}
          >
            <div
              className={`max-w-xs sm:max-w-md lg:max-w-lg ${
                isOwn ? "order-2" : "order-1"
              }`}
            >
              {!isOwn && (
                <div className="flex items-center space-x-2 mb-2 px-1">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                    {message.username.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-xs font-semibold text-gray-700">
                    {message.username}
                  </p>
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl shadow-md transition-all hover:shadow-lg ${
                  isOwn
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                }`}
              >
                <p className="break-words leading-relaxed">{message.text}</p>
                <p
                  className={`text-xs mt-1.5 ${
                    isOwn ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
