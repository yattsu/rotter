import { Flex } from '@chakra-ui/react'
import {
  FaHome,
  FaHashtag,
  FaBell,
  FaEnvelope,
  FaBookmark,
  FaListAlt,
  FaUser,
} from 'react-icons/fa'
import { CategoryButton } from './CategoryButton'

const Menu = () => {
  return(
    <Flex
      direction='column'
      gap='2.5'
    >
      <CategoryButton to='/' icon={FaHome} text='Home' />
      <CategoryButton to='/' icon={FaHashtag} text='Explore' />
      <CategoryButton to='/' icon={FaBell} text='Notifications' />
      <CategoryButton to='/' icon={FaEnvelope} text='Messages' />
      <CategoryButton to='/' icon={FaBookmark} text='Bookmarks' />
      <CategoryButton to='/' icon={FaListAlt} text='Lists' />
      <CategoryButton to='/' icon={FaUser} text='Profile' />
    </Flex>
  )
}

export default Menu
