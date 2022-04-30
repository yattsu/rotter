const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const { API } = require('./api')

async function main() {
  const app = express()
  const port = 5000
  const api = new API()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.listen(port)
  console.log(`listening on port ${port}`)

  await api.connectDB()

  // SERVE STATIC BUILD IN PRODUCTION
  // ALSO DISABLE PROXY TO PORT 5000
  //app.use('/', express.static(path.join(__dirname, 'client/build')))

  app.post('/api/getTweets', async (req, res) => {
    const userId = req.body.userId
    const response = await api.getTweets(userId)

    await res.json(response)
  })

  app.post('/api/post', async (req, res) => {
    const user = req.body.user
    if(!user) {
      return
    }

    const data = {
      author: {
        _id: req.body.user._id,
        secret: req.body.user.secret
      },
      forId: req.body.forId,
      type: req.body.type,
      date: Date.now(),
      content: req.body.content,
      comments: [],
      likes: 0,
      retweets: 0,
      liked_by: []
    }

    await api.postTweet(data, user)
  })

  app.post('/api/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const response = await api.login(username, password)

    await res.send(response)
  })

  app.post('/api/getUserFromSecret', async (req, res) => {
    const secret = req.body.secret
    const response = await api.getUserFromSecret(secret)

    await res.json(response)
  })

  app.post('/api/getUserFromId', async (req, res) => {
    const _id = req.body._id
    const response = await api.getUserFromId(_id)

    await res.json(response)
  })

  app.post('/api/getUserFromHandle', async (req, res) => {
    const userHandle = req.body.userHandle
    const response = await api.getUserFromHandle(userHandle)

    await res.json(response)
  })

  app.post('/api/likeTweet', async (req, res) => {
    const user = req.body.user
    const tweetId = req.body.tweetId
    const response = await api.likeTweet(tweetId, user)

    await res.json(response)
  })
  
  app.post('/api/getCommentCount', async (req, res) => {
    const tweetId = req.body.tweetId
    const response = await api.getCommentCount(tweetId)

    await res.json(response)
  })
}

main()
