import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useColorMode, Flex, Image, Switch, Button } from '@chakra-ui/react'
import LogoImage from '../../media/logo.png'
import Menu from '../Navbar/Menu'
import LoginBox from '../LoginBox'

const Navbar = ({ isLoggedIn, handleSetUserSecret, onUpdate }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [loginVisible, setLoginVisible] = useState(false)

  const handleShowLogin = () => {
    setLoginVisible(loginVisible => !loginVisible)
  }

  return(
    <Flex
      position='sticky'
      direction='column'
      flex='.16'
      top='0'
      color='secondary'
      h='fit-content'
      gap='3'
      p='3'
      px='8'
      maxW='300'
    >
      <Flex
        alignItems='center'
        justify='space-between'
      >
        <Link
        to='/'
        >
          <Image src={LogoImage}
            w='10'
          />
        </Link>
        <Switch
          onChange={toggleColorMode}
          colorScheme='twitter'
        />
      </Flex>

      <Menu />

      {
        !isLoggedIn
          ?
            <>
              <Button
                onClick={handleShowLogin}
                rounded='full'
                colorScheme='twitter'
                p='6'
              >
                Login
              </Button>

              <LoginBox loginVisible={loginVisible} handleShowLogin={handleShowLogin} handleSetUserSecret={handleSetUserSecret} onUpdate={onUpdate} />
            </>
          :
            null
      }
    </Flex>
  )
}

export default Navbar
