import { Outlet } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

const MainContent = () => {
  return(
    <Flex
      position='relative'
      flex='1'
      minW='xl'
      maxW='600'
      left='0'
      top='0'
      color='secondary'
      justify='center'
      borderX='1px solid'
      borderColor='shade'
    >
      <Outlet />
    </Flex>
  )
}

export default MainContent
