import { useState, useEffect } from 'react'

export const useTypingEffect = (text, speed = 100) => {
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (isTyping && typedText.length < text.length) {
      const timeout = setTimeout(() => {
        setTypedText(text.slice(0, typedText.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    } else if (typedText.length === text.length) {
      setIsTyping(false)
    }
  }, [typedText, isTyping, text, speed])

  const resetTyping = () => {
    setTypedText('')
    setIsTyping(true)
  }

  return { typedText, isTyping, resetTyping }
}
