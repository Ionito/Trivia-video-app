import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  components: {
    Button: {
      variants: {
        outline: () => ({
          border: '2px',
          borderColor: 'gray.300',
          borderRadius: '4',
          color: 'gray.600',
          w: 'fit-content',
        }),
      },
    },
  },
})
