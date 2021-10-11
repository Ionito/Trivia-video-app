import React, { useState, useEffect } from 'react'
import Video from '../Assets/video.mp4'
import QuestionOverlay from './QuestionOverlay'
import { Fade, Box } from '@chakra-ui/react'
import useQuestionApp from '../Hooks/useQuestionApp'
import { Question } from '../Types'

const animationTime = 0.5
const transition = {
  enter: { duration: animationTime },
  exit: { duration: animationTime },
}

const VideoPlayer: React.FC = () => {
  const [showinqQuestion, setShowinqQuestion] = useState<Question | undefined>(
    undefined
  )
  const [isAnimating, setIsAnimating] = useState(false)
  const { openQuestion } = useQuestionApp()

  useEffect(() => {
    if (openQuestion && !showinqQuestion) {
      setShowinqQuestion(openQuestion)
      setIsAnimating(true)
    } else if (showinqQuestion) {
      setIsAnimating(false)
      setTimeout(() => {
        setShowinqQuestion(openQuestion)
        if (openQuestion) setIsAnimating(true)
      }, 1000 * animationTime)
    }
  }, [openQuestion])
  return (
    <Box position="relative" overflow="hidden">
      <Fade unmountOnExit={true} in={isAnimating} transition={transition}>
        <QuestionOverlay {...showinqQuestion} />
      </Fade>
      <video controls autoPlay src={Video} muted />
    </Box>
  )
}

export default VideoPlayer
