import { useState, useEffect } from 'react'
import { Flex, useToast } from '@chakra-ui/react'
import { FaRegCommentAlt, FaRetweet, FaRegHeart, FaHeart, FaRegShareSquare } from 'react-icons/fa'
import { ActionButton } from './ActionButton'
import { likeTweet, getCommentCount } from '../../api'
import { CommentBox } from './CommentBox'

export const Actionbar = ({ data, user, handleUpdate }) => {
  const [liked, setLiked] = useState(false)
  const [commentCount, setCommentCount] = useState(0)
  const [showCommentBox, setShowCommentBox] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if(!user) {
      return
    }

    if(data.liked_by.includes(user._id)) {
      setLiked(true)
    }
  }, [user])

  useEffect(() => {
    (async function() {
      setCommentCount(await getCommentCount(data._id))
    })()
  }, [])

  const handleLike = async () => {
    if(!user) {
      toast({
        title:'Error',
        status:'error',
        description:'You must be logged in to do that.'
      })
      return
    }

    await likeTweet(data._id, user)
    setLiked(liked => !liked)
    handleUpdate()
  }

  const handleComment = () => {
    setShowCommentBox(!showCommentBox)
  }

  const handlePostComment = () => {
    setShowCommentBox(false)
  }

  return(
    <Flex
      direction='column'
    >
      <Flex
        pt='1'
        gap='20'
        fontSize='md'
        color='fade'
        alignItems='center'
      >
        <ActionButton handleClick={handleComment} icon={FaRegCommentAlt} text={commentCount > 0 ? commentCount : null} />
        <ActionButton icon={FaRetweet} text={data.retweets > 0 ? data.retweets : null} />
        <ActionButton handleClick={handleLike} icon={liked ? FaHeart : FaRegHeart} liked={liked} text={data.likes > 0 ? data.likes : null} />
        <ActionButton icon={FaRegShareSquare} />
      </Flex>
      {
      showCommentBox
        ?
          <CommentBox handlePostComment={handlePostComment} user={user} tweetId={data._id} />
        :
          null
      }
    </Flex>
  )
}
