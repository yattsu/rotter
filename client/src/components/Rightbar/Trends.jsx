import { Flex, Heading, Text } from '@chakra-ui/react'

export const Trends = () => {
  return(
    <Flex
      p='4'
      bg='shade'
      rounded='2xl'
      w='full'
      direction='column'
      shadow='md'
      color='secondary'
      gap='5'
    >
      <Heading
        as='h2'
        size='md'
      >
        Trends
      </Heading>

      <Flex
        direction='column'
        gap='5'
      >
        <Flex
          direction='column'
          fontSize='xs'
          color='fade'
          gap='1'
        >
          <Text>1 - Trending</Text>
          <Heading
            as='h3'
            size='sm'
            color='secondary'
          >
            #SuperSoup
          </Heading>
          <Text>368k Tweets</Text>
        </Flex>
        <Flex
          direction='column'
          fontSize='xs'
          color='fade'
          gap='1'
        >
          <Text>2 - Trending</Text>
          <Heading
            as='h3'
            size='sm'
            color='secondary'
          >
            #mylegshurt
          </Heading>
          <Text>420k Tweets</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
