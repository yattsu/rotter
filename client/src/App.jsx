import { useState, useEffect } from 'react'
import { getUserFromSecret } from './api'
import { ChakraProvider, extendTheme, Flex } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MainContent from './components/MainContent'
import Rightbar from './components/Rightbar'
import Home from './components/Home'
import User from './components/User'

const theme = extendTheme({
  semanticTokens: {
    colors: {
      primary: {
        default: 'gray.900',
        _dark: 'gray.100'
      },
      secondary: {
        default: 'gray.300',
        _dark: 'gray.800'
      },
      shade: {
        default: 'gray.800',
        _dark: 'gray.300'
      },
      fade: {
        default: 'gray.500',
        _dark: 'gray.600'
      }
    }
  }
})

const App = () => {
  const [userSecret, setUserSecret] = useState(null)
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [update, setUpdate] = useState(false)

  const onUpdate = () => {
    setUpdate(update => !update)
  }

  useEffect(() => {
    (async function() {
      if(userSecret) {
        setIsLoggedIn(true)
        if(!user) {
          setUser(await getUserFromSecret(userSecret))
        }
      } else {
        setIsLoggedIn(false)
      }
    })()
  }, [userSecret])

  const handleSetUserSecret = (secret) => {
    setUserSecret(secret)
  }

  return(
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Flex
          direction='row'
          bg='primary'
          alignItems='top'
          justify='center'
        >
          <Navbar isLoggedIn={isLoggedIn} handleSetUserSecret={handleSetUserSecret} onUpdate={onUpdate} />
          <Routes>
            <Route path='/'>
              <Route path='/' element={<MainContent />}>
                <Route path='/' element={<Home onUpdate={onUpdate} update={update} user={user} />} />
                <Route path='/user/:userHandle' element={<User update={update} user={user} />} />
              </Route>
            </Route>
          </Routes>
          <Rightbar />
        </Flex>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
