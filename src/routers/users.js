const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail} = require('../emails/account')

// ME
router.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/users/me', auth,  async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email', 'password','age']
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Inavlid updates!'})
    }
    try {

        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/users/me', auth, async (req, res) => {
    
    try {
        // can also use 'remove' method on mongoose doc just like 'save()'
        await req.user.remove()

        sendCancelationEmail(req.user.email, req.user.name)
        console.log('Sent email')
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})



//USERS


router.post('/users', async (req, res) => {
    try {

        const user = new User(req.body)
        await user.save()

        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()

        res.status(201).send({user, token})

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

router.post('/users/login', async (req, res) => {
    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        //res.send({ user: user.getPublicProfile(), token })
        res.send({user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send({error: e.message})
    }

})

router.post('/users/logout', auth, async(req, res) => {
    try {
        //removing the current being used token
        req.user.tokens = req.user.tokens.filter((token) =>  token.token !== req.token)
        console.log(req.user.tokens)
        await req.user.save()
        res.send()

    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        //removing the all being used token
        // req.user.tokens = req.user.tokens.filter((token) =>  token.token !== token.token)
        req.user.tokens = []
        console.log(req.user.tokens)
        await req.user.save()
        res.send()

    } catch(e) {
        res.status(500).send()
    }
})

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(400).send(e)
    }
})



router.get('/users/:id',  async (req, res) => {
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


router.patch('/users/:id',  async (req, res) => {
    const updates = Object.keys(req.body);
    console.log("updates", updates)
    const allowedUpdates = ['name','email', 'password','age']
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Inavlid updates!'})
    }
    try {

        const _id = req.params.id
        const user = await User.findById(_id)
        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        //const user = await User.findByIdAndUpdate(_id,req.body, {new: true, runValidators: true})

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/users/:id', async (req, res) => {
    
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


const upload = multer({
//   dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter (req, file, cb) {
        if(!file.originalname.match(/\.(jpg||jpeg||png)$/)){
            return cb(new Error('Only jpeg, jpg, and png allowed'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar',auth, upload.single('avatar'), async (req, res) => {
    //console.log("req.file: ", req.file)

    const resizedImage = await sharp(req.file.buffer)
                                        .resize({width:300, height:200})  //resize(300, 200)
                                        .toFormat('png')  //.png()
                                        .toBuffer()

    req.user.avatar = resizedImage

    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})

})

router.delete('/users/me/avatar', auth, async (req, res) => {

    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


router.get('/users/:id/avatar', async (req, res) => {
  
    try {

        const user = await User.findById(req.params.id)
        if(!user || !user.avatar) {
            throw new Error('user or users avatar do not exist')
        }

        res.set('Content-Type','image/png')  
        res.send(user.avatar)
    }
    catch (e) {
        res.status(404).send(e.message)
    }
})


module.exports = router

