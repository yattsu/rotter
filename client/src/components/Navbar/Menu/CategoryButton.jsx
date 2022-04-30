import { Link } from 'react-router-dom'
import { Flex, Heading, Icon } from '@chakra-ui/react'

export const CategoryButton = ({ to, icon, text }) => {
  return(
    <Link to={to}>
      <Flex
        _hover={{
          bg:'shade'
        }}
        cursor='pointer'
        direction='row'
        color='secondary'
        p='3'
        pr='8'
        rounded='full'
        transition='.2s'
        w='fit-content'
        gap='4'
      >
        <Icon
          as={icon}
          fontSize='20'
        />
        <Heading
          as='h2'
          size='md'
          fontWeight='normal'
        >
          {text}
        </Heading>
      </Flex>
    </Link>
  )
}
