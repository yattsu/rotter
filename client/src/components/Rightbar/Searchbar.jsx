import { InputGroup, Input, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export const Searchbar = () => {
  return(
    <InputGroup>
      <InputLeftElement
        children={<SearchIcon />}
        color='primary'
      />
      <Input
        placeholder='Search'
        rounded='full'
        shadow='md'
        border='none'
        bg='shade'
        maxW='lg'
        color='secondary'
      />
    </InputGroup>
  )
}
