import { useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import PostTweet from '../PostTweet'
import Tweets from '../Tweets'

const Home = ({ user, update, onUpdate }) => {
  return(
    <Flex
      direction='column'
      w='full'
    >
      {
      user
        ?
          <PostTweet user={user} onUpdate={onUpdate} />
        :
          null
      }

      <Heading
        as='h3'
        size='lg'
        mb='2'
      >
        Latest tweets
      </Heading>

      <Tweets user={user} update={update} />
    </Flex>
  )
}

export default Home
