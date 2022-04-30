const db = require('../db')
const ObjectId = require('mongodb').ObjectId

class API {
  constructor() {
    this.client = db.client
  }

  async connectDB() {
    this.client = await db.client.connect()
    console.log('Connected to database')
  }

  async getTweets(userId) {
    const filter = userId ? {'author._id': userId} : {}
    console.log(filter)
    const tweets = await this.client.db().collection('tweets').find(filter).sort({date: -1})
    let response = []

    await tweets.forEach(t => {response.push(t)})

    return response
  }

  async postTweet(data, user) {
    const authorId = data.author._id
    const authorSecret = data.author.secret

    if(!this.isRealUser(authorId, authorSecret)) {
      return false
    } else {
      const collection = await this.client.db().collection('tweets')
      await collection.insertOne(data)
    }
  }

  async isRealUser(userId, userSecret) {
    const allegedUser = await this.getUserFromSecret(userSecret)

    if(!allegedUser) {
      return false
    }

    if(allegedUser.secret !== userSecret || allegedUser._id.toString() !== userId) {
      return false
    }

    return true
  }

  async login(username, password) {
    if(username == '' || password == '') {
      return
    }

    const collection = await this.client.db().collection('users')
    const user = await collection.findOne({username, password})
    let response = false
    try {
      return response = user.secret
    } catch(e) {
      console.log(e)
    }
  }

  async getUserFromSecret(secret) {
    if(!secret || secret == '') {
      return
    }

    const collection = await this.client.db().collection('users')
    const user = await collection.findOne({secret})

    if(!user) {
      return user
    }
    const{password, ...userData} = user

    return userData
  }

  async getUserFromId(_id) {
    if(!_id || _id == '') {
      return
    }

    const collection = await this.client.db().collection('users')
    const user = await collection.findOne(ObjectId(_id))

    if(!user) {
      return user
    }
    const{password, ...userData} = user

    return userData
  }

  async getUserFromHandle(handle) {
    if(!handle || handle == '') return false

    const collection = await this.client.db().collection('users')
    const user = await collection.findOne({ handle })

    if(!user) {
      return user
    }
    const{password, ...userData} = user

    return userData
  }

  async likeTweet(tweetId, user) {
    const collection = await this.client.db().collection('tweets')
    const tweet = await collection.findOne({_id: ObjectId(tweetId)})
    const likedBy = tweet.liked_by
    console.log(user, likedBy)
    if(!likedBy.includes(user._id)) {
      await collection.updateOne({_id: ObjectId(tweetId)}, { $inc: { likes: 1 } })
      await collection.updateOne({_id: ObjectId(tweetId) }, { $set: { liked_by: [...likedBy, user._id] } })
    } else {
      await collection.updateOne({_id: ObjectId(tweetId) }, { $inc: { likes: -1 } })
      await collection.updateOne({_id: ObjectId(tweetId)}, { $set: { liked_by: likedBy.filter(id => id !== user._id) } })
    }
  }

  async getCommentCount(tweetId) {
    const collection = await this.client.db().collection('tweets')
    const tweets = await collection.find({forId: tweetId})
    let commentCount = 0

    await tweets.forEach(t => commentCount++)

    return commentCount
  }
}

exports.API = API
