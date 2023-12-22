import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

import { mode } from '@chakra-ui/theme-tools'
import { BrowserRouter } from 'react-router-dom'

// const styles = {
// 	global: (props) => ({
// 		body: {
//       //Ligth > Dark
// 			bg: mode("gray.100", "#000")(props),
// 			color: mode("gray.800", "whiteAlpha.900")(props),
// 		},
// 	}),
// };

const config = {
  initialColorMode: 'light',
  //initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: { //colorScheme
    primary: {
      100: "#83b271",
      // ...
      900: "#689c54",
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
