const express = require('express');
require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.listen(port, () => {
    console.log('Server is up on port: ', port)
})



//USERS
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/users', async (req, res) => {
    try {

        const user = new User(req.body)
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})


app.get('/users/:id', async (req, res) => {
    try {

        const _id = req.params.id
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})


app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    console.log("updates", updates)
    const allowedUpdates = ['name','email', 'password','age']
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Inavlid updates!'})
    }
    try {

        const _id = req.params.id
        const user = await User.findByIdAndUpdate(_id,req.body, {new: true, runValidators: true})

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


app.delete('/users/:id', async (req, res) => {
    
    try {

        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})


//TASK
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async(req, res) => {
    try{
        const tasks = await Task.find({})
        console.log(tasks)
        res.send(tasks)
    }
    catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
})

app.get('/tasks/:id', async(req, res) => {
    try {

        const _id = req.params.id   
        const task = await Task.findById(_id)
            if (!task) {
                return res.status(404).send()
            }
            res.send(task)
        }
    catch(e)  {
        res.status(500).send(e)
    }
})


app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({error: 'Invalid updates'})
    }
    try {

        const _id = req.params.id
       
        const task = await Task.findByIdAndUpdate(_id,req.body, {new: true, runValidators: true})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/tasks/:id', async (req, res) => {
    
    try {

        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})



// app.use((req, res, next) => {
//     //next : is specific to registering middleware
//     console.log(req.method, req.path)
//     if(req.method ==='POST' || 'PATCH' || 'DELETE') {
//         res.send({error: 'You are not authorized to request POST | PATCH api call.' })
//         // throw new Error('You are not authorized to request!')
//     }
//     next()
// })


// app.use((req, res, next) => {
    
//     if(req.method) {
//         res.status(503).send({error: 'Site is under maintainance!' })
//     }
//     next()

// })

// const pet = {
//     name: 'Jal'
// }

// pet.toJSON = function () {
//     console.log(this)
//     return this
// }
// console.log(JSON.stringify(pet))



// const Task = require('./models/task')
// const User = require('./models/user')
//const main = async () => {

//     try {

//         const user = await User.findById('5dd312e3d738aa3f4493e672')
//         console.log(user.tasks)
//         await user.populate('tasks').execPopulate()
//             console.log(user.tasks)

//         // const task = await Task.findById('5dd30c64c9bbba044811ec97')
//         // await task.populate('owner').execPopulate()
//         // console.log(task.owner)

//     } catch(e) {
//         console.log(e)
//     }
// }

// main()