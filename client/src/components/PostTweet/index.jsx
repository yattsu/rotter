import { useState, useEffect } from 'react'
import { postTweet } from '../../api'
import { Flex, Box, Avatar, Input, Button } from '@chakra-ui/react'

const PostTweet = ({ user, onUpdate }) => {
  const [inputContent, setInputContent] = useState('')

  const handleInputChange = (e) => {
    setInputContent(e.target.value)
  }

  const handlePostClick = async () => {
    setInputContent('')
    onUpdate()
    const response = await postTweet(inputContent, 0, user)
    console.log(response)
  }

  return(
    <Flex
      py='3'
      px='4'
      w='full'
      gap='3'
    >
      <Box>
        <Avatar
          src={user?.avatar_url}
        />
      </Box>
      <Flex
        w='full'
        direction='column'
      >
        <Input
          onChange={handleInputChange}
          value={inputContent}
          border='none'
          placeholder="What's happening?"
          fontSize='xl'
          minW='full'
          mt='3'
          p='0'
        />
        <Flex
          justify='space-between'
          alignItems='center'
        >
          image gif poll emoji date location
          <Button
            onClick={handlePostClick}
            rounded='full'
            py='2'
            px='5'
            disabled={inputContent.length == 0 ? true : ''}
            colorScheme='twitter'
            h='fit-content'
          >
            Post
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PostTweet
