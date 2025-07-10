const ChatMessage = ({ message, index }) => {
const isClient = message.sender === 'client'

  return (
    <div
      className={`animate-slide-in-${
        isClient ? 'left' : 'right'
      } animation-delay-${index * 1000}`}
    >
      <div
        className={`${
          isClient
            ? 'bg-gray-100 rounded-lg p-4 max-w-xs'
            : 'bg-cyan-500 text-white rounded-lg p-4 max-w-xs ml-auto'
        } `}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  )
}

export default ChatMessage
