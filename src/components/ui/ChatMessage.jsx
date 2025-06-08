const ChatMessage = ({ message, index }) => {
  const isClient = message.sender === 'client'

  return (
    <div
      className={`animate-slide-in-${
        isClient ? 'left' : 'right'
      } animation-delay-${index * 500}`}
    >
      <div
        className={`${
          isClient
            ? 'bg-gray-100 rounded-lg p-4 max-w-xs'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 max-w-xs ml-auto'
        } transform hover:scale-105 transition-all duration-300`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  )
}

export default ChatMessage
