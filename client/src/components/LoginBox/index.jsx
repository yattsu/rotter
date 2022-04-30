import { useState } from 'react'
import { login } from '../../api'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Input, Button, Text, useDisclosure } from '@chakra-ui/react'

const LoginBox = ({ loginVisible, handleShowLogin, handleSetUserSecret, onUpdate}) => {
  const [usernameContent, setUsernameContent] = useState('')
  const [passwordContent, setPasswordContent] = useState('')
  const [invalidVisible, setInvalidVisible] = useState(false)
  const {isOpen, onOpen, onClose} = useDisclosure()

  const handleUsernameChange = (e) => {
    setUsernameContent(e.target.value)
  }
  
  const handlePasswordChange = (e) => {
    setPasswordContent(e.target.value)
  }

  const handleClickLogin = async () => {
    if(usernameContent == '' || passwordContent == '') {
      setInvalidVisible(true)
      return
    }

    const response = await login(usernameContent, passwordContent)
    if(!response.data) {
      return
    }

    const secret = response.data
    await handleSetUserSecret(secret)
    handleShowLogin()
    onUpdate()
  }

  return(
    <Modal isOpen={loginVisible} onClose={handleShowLogin}>
      <ModalOverlay>
        <ModalContent
          bg='primary'
          color='secondary'
          rounded='2xl'
          shadow='xl'
        >
          <ModalHeader>Login</ModalHeader>  
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction='column'
              gap='3'
            >
              <Input
                onChange={handleUsernameChange}
                borderColor={invalidVisible ? 'red' : 'transparent'}
                rounded='full'
                bg='shade'
                shadow='md'
                placeholder='Username'
              />
              <Input
                onChange={handlePasswordChange}
                borderColor={invalidVisible ? 'red' : 'transparent'}
                type='password'
                rounded='full'
                bg='shade'
                shadow='md'
                placeholder='Password'
              />
              <Button
                onClick={handleClickLogin}
                colorScheme='twitter'
                rounded='full'
                w='20'
                shadow='md'
              >
                Login
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default LoginBox
