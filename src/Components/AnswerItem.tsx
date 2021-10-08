import React from 'react'
import { Text, Input, Flex, Stack, Box, Radio } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useField } from 'formik'

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
  const [field] = useField(`answer${label}`)
  const [radioField, _, radioHelpers] = useField(`correctAnswer`)

  const handleChange = () => {
    radioHelpers.setValue(label)
  }

  return (
    <>
      {editMode ? (
        <Flex>
          <Stack w="full">
            <Text color="gray.400">{`Answer ${label}:`}</Text>
            <Input type="text" {...field} />
          </Stack>

          <Box w="60px" name="answer" value={isCorrect ? label : undefined}>
            <Stack>
              <Text color="gray.400" pb="3" h={9}>
                {label === 'A' ? 'Correct' : null}
              </Text>
              <Flex justify="center">
                <Radio
                  onChange={handleChange}
                  isChecked={radioField.value === label}
                />
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
