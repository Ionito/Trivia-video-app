import React from 'react'
import { Text, Input, Flex, Stack, Box, Radio, Center } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

interface Props {
  answer: string
  isCorrect: boolean
  editMode: boolean
  label: 'A' | 'B'
}

const AnswerItem: React.FC<Props> = ({
  answer,
  isCorrect,
  editMode,
  label,
}) => {
  const handleOnChange = (e: React.ChangeEvent) => {
    console.log(e)
  }
  const handleCorrectAnswer = () => {}

  return (
    <>
      {editMode ? (
        <Flex>
          <Stack w="full">
            <Text color="gray.400">{`Answer ${label}:`}</Text>
            <Input value={answer} onChange={handleOnChange} />
          </Stack>

          <Box
            w="60px"
            name="answer"
            onChange={handleCorrectAnswer}
            value={isCorrect ? label : undefined}
          >
            <Stack>
              <Text color="gray.400" pb="3" h={9}>
                {label === 'A' ? 'Correct' : null}
              </Text>
              <Flex justify="center">
                <Radio value={label} />
              </Flex>
            </Stack>
          </Box>
        </Flex>
      ) : (
        <Stack direction="row" justify="space-between">
          <Text>{answer}</Text>
          {isCorrect && <CheckIcon color="green.400" />}
        </Stack>
      )}
    </>
  )
}

export default AnswerItem
