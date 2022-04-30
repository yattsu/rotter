import { Flex } from '@chakra-ui/react'
import { Searchbar } from './Searchbar'
import { Trends } from './Trends'

const Rightbar = () => {
  return(
    <Flex
      position='sticky'
      flex='.6'
      direction='column'
      alignItems='center'
      gap='4'
      h='fit-content'
      top='0'
      px='10'
      py='1'
      maxW='400'
    >
      <Searchbar />
      <Trends />
    </Flex>
  )
}

export default Rightbar
