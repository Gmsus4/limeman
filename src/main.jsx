import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

import { mode } from '@chakra-ui/theme-tools'
import { BrowserRouter } from 'react-router-dom'

const styles = {
  global: (props) => ({
    body: {
      fontFamily: 'body',
      bg: mode('white', 'gray.800')(props), //Background - El primero es el light y el segundo es el dark
      color: mode('gray.800', 'whiteAlpha.900')(props),
      lineHeight: 'base',
    }
  })
}

const config = {
  initialColorMode: 'light',
  //initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config, styles })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
