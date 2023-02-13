import '../styles/globals.css'
import { ChakraProvider, VStack } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <VStack paddingX='10vw'>
        <Component {...pageProps} />
      </VStack>
    </ChakraProvider>
  )
}

export default MyApp
