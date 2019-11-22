const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')


const userOneId = new mongoose.Types.ObjectId()
const userTwoId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: 'First User',
    email: 'uer-01-test@example.com',
    password: '123123123',
    phone: '233-234-4545',
    age: 28,
    position: 'Teacher',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}
const userTwo = {
    _id: userTwoId,
    name: 'Second User',
    email: 'uer-02-test@example.com',
    password: '123123123',
    phone: '233-234-4545',
    age: 28,
    position: 'assistant',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}
const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    completed: true,
    description: 'task one',
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    completed: false,
    description: 'task two',
    owner:  userOne._id
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    completed: false,
    description: 'task three',
    owner:  userOne._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    //await User.findOneAndDelete({email: 'task-uer-test@example.com'})
    await new User(userOne).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()

    await new User(userTwo).save()
}

module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}