import { useState, useEffect } from 'react'
import { getTweets } from '../../api'
import { Flex, Box, Heading, Spinner } from '@chakra-ui/react'
import Tweet from '../Tweet'

const Tweets = ({ user, update, focusedUserId }) => {
  const [tweets, setTweets] = useState(null)

  useEffect(() => {
    handleUpdate()
  }, [update])

  const handleUpdate = async () => {
    setTweets(await getTweets(focusedUserId))
  }

  if(!tweets) {
    return(
      <Flex
        justify='center'
      >
        <Spinner />
      </Flex>
    ) 
  }

  return(
    <Flex
      position='relative'
      direction='column'
      gap='4'
      p='4'
    >
      {tweets && tweets.length > 0
        ?
          tweets.map(t => (
            <Tweet key={t._id} data={t} user={user} handleUpdate={handleUpdate} />
          ))
        :
          <Heading
            as='h2'
            fontSize='lg'
            color='fade'
            textAlign='center'
            mt='5'
          >
            No tweets :(
          </Heading>
      }
    </Flex>
  )
}

export default Tweets
