const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, userOneId, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
  const response =  await request(app).post('/users').send({
        name: 'Asia Awan',
        email: 'asia.awan@example.com',
        password: '123123123',
        phone: '233-234-4545',
        age: 28,
        position: 'Teacher',
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Asserion about the response
        //expect(response.body.user.name).toBe('Asia Awan')
        expect(response.body).toMatchObject({
            user: {
                name: 'Asia Awan',
                email: 'asia.awan@example.com',
                phone: '233-234-4545',
                age: 28,
                position: 'Teacher',
            },
            token: user.tokens[0].token
        })
        expect(user.password).not.toBe('123123123')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(user).not.toBeNull()
        expect(response.body.token).toBe(user.tokens[1].token)

})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(400)
})

test('Should get profile for user', async () => {

    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
   const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

      
    //const user = await User.findById(userOneId) 
    //expect(user).toBeNull();

    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401)
})


test('Should not delete account for unauthenticate user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})


test('Should upload avatar image', async() => {
    const avatar = './fixtures/philly,jpg'
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/philly.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid user fields', async() => {
    const changeUser = await request(app)
                .patch('/users/me')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send({'email':'changed-email@hotmail.com'})
                .expect(200)

    const changedUser = User.findById(userOneId)

    expect(changedUser.name).toBe(changeUser.name)

})

test('should not update invalid user fields', async() => {
    const changeUser = await request(app)
                .patch('/users/me')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send({'location':'Heaven'})
                .expect(400)

})


// .toBe()   uses ====
// 1 === 1 (true)

// {} === {}  (false)