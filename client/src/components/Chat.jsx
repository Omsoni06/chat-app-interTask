import { useState, useEffect } from "react";
import { socket } from "../socket";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";

function Chat({ username, room, isConnected }) {
  const [messages, setMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    function onMessage(message) {
      setMessages((prev) => [...prev, message]);
    }

    function onRoomUsers(users) {
      setRoomUsers(users);
    }

    function onUserTyping({ username }) {
      setTypingUser(username);
    }

    function onUserStopTyping() {
      setTypingUser(null);
    }

    socket.on("message", onMessage);
    socket.on("room_users", onRoomUsers);
    socket.on("user_typing", onUserTyping);
    socket.on("user_stop_typing", onUserStopTyping);

    return () => {
      socket.off("message", onMessage);
      socket.off("room_users", onRoomUsers);
      socket.off("user_typing", onUserTyping);
      socket.off("user_stop_typing", onUserStopTyping);
    };
  }, []);

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden transition-opacity"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <Sidebar
        room={room}
        roomUsers={roomUsers}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <div className="flex-1 flex flex-col">
        {/* Modern Header with Gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSidebar(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div>
              <h2 className="text-xl font-bold flex items-center">
                <span className="text-2xl mr-2">#</span>
                {room}
              </h2>
              <p className="text-xs text-white/80">
                {roomUsers.length} members online
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-green-400 animate-pulse" : "bg-red-400"
                }`}
              />
              <span className="text-xs font-medium hidden sm:inline">
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        </div>

        <MessageList messages={messages} currentUsername={username} />
        <TypingIndicator typingUser={typingUser} />
        <MessageInput username={username} room={room} />
      </div>
    </div>
  );
}

export default Chat;
