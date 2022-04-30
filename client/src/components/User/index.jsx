import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heading, Avatar, Image, Flex, Text, Box } from '@chakra-ui/react'
import { getUserFromHandle } from '../../api'
import Tweets from '../Tweets'

const User = ({user, update}) => {
  const params = useParams()
  const userHandle = params.userHandle
  const [focusedUser, setFocusedUser] = useState()
  const [formattedDate, setFormattedDate] = useState()

  useEffect(() => {
    (async function() {
      setFocusedUser(await getUserFromHandle(userHandle))
    })()
  }, [])

  useEffect(() => {
    if(formattedDate || !focusedUser) return

    const dateObj = new Date(focusedUser.created)
    setFormattedDate(`${dateObj.toLocaleString('default', {month: 'long'})} ${dateObj.getFullYear()}`)
  }, [focusedUser])

  if(!focusedUser) {
    return(
      <Heading
        as='h2'
        size='md'
      >
        404
      </Heading>
    )
  }

  return(
    <Flex
      direction='column'
      w='full'
      gap='3'
      pb='3'
    >
      <Flex
        position='relative'
        w='full'
        h='56'
      >
        <Image
          position='absolute'
          w='full'
          h='full'
          src={focusedUser.cover_url}
          objectFit='cover'
        />
        <Avatar
          src={focusedUser.avatar_url}
          position='absolute'
          w='36'
          h='36'
          bottom='-16'
          ml='5'
          border='5px solid'
          borderColor='primary'
          bg='primary'
        />
      </Flex>
      <Flex
        direction='column'
        w='full'
        h='fit-content'
        mt='16'
        px='5'
        pb='5'
        gap='5'
        borderBottom='1px solid'
        borderColor='shade'
      >
        <Flex
          direction='column'
        >
          <Text
            fontSize='2xl'
            h='8'
          >
            {focusedUser.username}
          </Text>
          <Text
            fontSize='sm'
            h='5'
            color='fade'
          >
            @{focusedUser.handle}
          </Text>
        </Flex>
        <Text>
          {focusedUser.description}
        </Text>
        <Text
          color='fade'
        >
          Joined {formattedDate}
        </Text>
        <Flex
          gap='5'
          color='fade'
          fontSize='sm'
        >
          <Flex
            gap='1'
          >
            <Text
              color='secondary'
              fontWeight='bold'
            >
              {focusedUser.followers || 0}
            </Text>
            Followers
          </Flex>
          <Flex
            gap='1'
          >
            <Text
              color='secondary'
              fontWeight='bold'
            >
              {focusedUser.following || 0}
            </Text>
            Following
          </Flex>
        </Flex>
      </Flex>
      <Heading
        as='h3'
        size='lg'
        mb='2'
        px='5'
      >
        {focusedUser.username}'s tweets
      </Heading>
      <Tweets user={user} focusedUserId={focusedUser._id} update={update} />
    </Flex>
  )
}

export default User
