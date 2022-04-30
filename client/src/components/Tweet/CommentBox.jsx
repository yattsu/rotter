import { useState } from 'react'
import { postTweet } from '../../api'
import { Input, Flex, Button } from '@chakra-ui/react'

export const CommentBox = ({ user, tweetId, onUpdate, handlePostComment }) => {
  const [content, setContent] = useState('')

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  const handlePostClick = async () => {
    handlePostComment()
    //onUpdate()
    const response = await postTweet(content, 1, tweetId, user)
  }

  return(
    <Flex
      gap='2'
    >
      <Input
        onChange={handleChange}
        value={content}
        rounded='full'
        border='none'
        bg='fade'
      />
      <Button
        onClick={handlePostClick}
        disabled={content !== '' ? false : true}
        rounded='full'
        colorScheme='twitter'
      >
        Tweet
      </Button>
    </Flex>
  )
}
