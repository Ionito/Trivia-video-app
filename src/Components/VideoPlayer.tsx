import { Box } from '@chakra-ui/layout'
import React from 'react'
import Video from '../Assets/video.mp4'
import QuestionOverlay from './QuestionOverlay'
import { Fade } from '@chakra-ui/react'
import useQuestionApp from '../Hooks/useQuestionApp'

interface Props {}

const VideoPlayer: React.FC<Props> = () => {
  const { openQuestion } = useQuestionApp()
  return (
    <Box position="relative" overflow="hidden">
      <Fade in={!!openQuestion}>
        <QuestionOverlay {...openQuestion} />
      </Fade>
      <video controls autoPlay src={Video} muted />
    </Box>
  )
}

export default VideoPlayer
