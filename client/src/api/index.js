import axios from 'axios'

export const getTweets = async (userId) => {
  const endpoint = '/api/getTweets'

  const result = await axios.post(endpoint, {userId})

  return result.data
}

export const login = async (username, password) => {
  const endpoint = '/api/login'

  const result = await axios.post(endpoint, {username, password})

  return result
}

export const getUserFromSecret = async (secret) => {
  const endpoint = '/api/getUserFromSecret'

  const result = await axios.post(endpoint, {secret})

  return result.data
}

export const getUserFromId = async (_id) => {
  const endpoint = '/api/getUserFromId'

  const result = await axios.post(endpoint, {_id})

  return result.data
}

export const getUserFromHandle = async (handle) => {
  const endpoint = '/api/getUserFromHandle'

  const result = await axios.post(endpoint, {userHandle: handle})

  return result.data
}

export const postTweet = async (content, type, forId, user) => {
  await axios.post('/api/post', {content, type, forId, user})
}

export const likeTweet = async (tweetId, user) => {
  await axios.post('/api/likeTweet', {tweetId, user})
}

export const getCommentCount = async (tweetId) => {
  const result = await axios.post('/api/getCommentCount', {tweetId})

  return result.data
}
