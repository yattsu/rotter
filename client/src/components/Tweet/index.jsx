import { useState, useEffect } from 'react'
import { getUserFromId } from '../../api'
import { Link } from 'react-router-dom'
import { Flex, Box, Avatar, Text, Skeleton, Spinner } from '@chakra-ui/react'
import { Actionbar } from './Actionbar'

export const Tweet = ({ data, user, handleUpdate }) => {
  const [userData, setUserData] = useState(null)
  const [formattedDate, setFormattedDate] = useState(null)

  useEffect(() => {
    (async function () {
      setUserData(await getUserFromId(data.author._id))
    })()
  }, [])

  useEffect(() => {
    const dateObj = new Date(data.date)
    setFormattedDate(`${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`)
  }, [])


  return(
    <>
      {
      userData ? 
        <Flex
          p='4'
          pb='2'
          w='full'
          gap='3'
          fontSize='sm'
          bg='shade'
          rounded='2xl'
          shadow='md'
          alignItems='top'
          zIndex='10'
        >
          <Box>
            <Link
            to={`/user/${userData.handle}`}
            >
              <Avatar
                src={userData.avatar_url}
              />
            </Link>
          </Box>
          <Flex
            direction='column'
          >
            <Flex
              gap='1'
              color='fade'
            >
              <Text
                fontWeight='bold'
                color='secondary'
              >
                <Link
                to={`/user/${userData.handle}`}
                >
                  {userData.username}
                </Link>
              </Text>
              <Text>@{userData.handle}</Text>
              -
              <Text>2h</Text>
              -
              <Text>{formattedDate}</Text>
            </Flex>
            {data.content}

            <Actionbar data={data} user={user} handleUpdate={handleUpdate} />

          </Flex>
        </Flex>
      :
        <Skeleton
          pb='2'
          w='full'
          h='32'
          fontSize='sm'
          bg='shade'
          rounded='2xl'
          shadow='md'
          zIndex='10'
              >
        </Skeleton>
          }
        </>
  )
}

export default Tweet
