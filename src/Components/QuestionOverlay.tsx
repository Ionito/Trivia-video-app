import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import { Stack, Box, Heading, HStack } from '@chakra-ui/layout'
import { Choices, Question } from '../Types'

const QuestionOverlay: React.FC<Partial<Question>> = ({
  answerA,
  answerB,
  question,
  correctAnswer,
}) => {
  const [clickedAnswer, setClickedAnswer] = useState<Choices | undefined>()
  const handleClick = (answer: Choices) => (e: React.MouseEvent) => {
    if (!clickedAnswer) {
      setClickedAnswer(answer)
    }
  }
  const getAssertColor = (assert: Choices) => {
    return assert === correctAnswer ? 'green.400' : 'red.500'
  }

  return (
    <Box
      position="absolute"
      ml="auto"
      left="10%"
      bottom="10%"
      w="80%"
      p="6"
      zIndex="40"
      backgroundColor="#6600a1A9"
    >
      <Stack height="fit-content" alignItems="center" spacing="4">
        <Heading as="h2" size="lg" color="white">
          {question}
        </Heading>
        <HStack spacing="4" w="100%" justify="center">
          <Button
            variant="answer"
            _hover={{ pointerEvents: clickedAnswer ? false : true }}
            color={clickedAnswer === 'A' ? 'white' : 'green.600'}
            bg={clickedAnswer === 'A' ? getAssertColor('A') : 'white'}
            onClick={handleClick('A')}
          >
            {answerA}
          </Button>
          <Button
            variant="answer"
            _hover={{ pointerEvents: clickedAnswer ? false : true }}
            color={clickedAnswer === 'B' ? 'white' : 'green.600'}
            bg={clickedAnswer === 'B' ? getAssertColor('B') : 'white'}
            onClick={handleClick('B')}
          >
            {answerB}
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}

export default QuestionOverlay
