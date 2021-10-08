import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'
import queryClient from './utils/queryClient'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './utils/theme'
import App from './App'
import { QuestionAppProvider } from './Providers/QuestionProvider'

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <QuestionAppProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </QuestionAppProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
