import { Box, Center, Flex } from '@chakra-ui/react'
import ControlPanel from './Components/ControlPanel'

import VideoPlayer from './Components/VideoPlayer'

function App() {
  return (
    <Flex
      h={{ base: 'auto', md: '100vh' }}
      direction={{ base: 'column-reverse', md: 'row' }}
    >
      <Box w={{ base: 'full', md: '65vw' }} bg="gray.800" py={4} px={[0, 2, 8]}>
        <Center h="fit-content" minH="100%">
          <VideoPlayer />
        </Center>
      </Box>
      <Box
        overflowY="scroll"
        bg="#EAEAF3"
        h="full"
        w={{ base: 'full', md: '35vw' }}
        p={4}
      >
        <ControlPanel />
      </Box>
    </Flex>
  )
}

export default App
