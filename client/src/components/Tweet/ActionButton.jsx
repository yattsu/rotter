import { Flex, Icon } from '@chakra-ui/react'

export const ActionButton = ({ icon, text, liked, handleClick }) => {
  return(
    <Flex
      onClick={handleClick}
      _hover={{
        bg:'primary'
      }}
      fontSize='xs'
      alignItems='center'
      gap='2'
      color={liked ? 'pink.500' : ''}
      cursor='pointer'
      transition='.3s'
      rounded='full'
      p='2'
    >
      <Icon
        as={icon}
        fontSize='md'
      />
      {text}
    </Flex>
  )
}
