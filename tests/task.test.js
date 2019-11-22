const request = require('supertest')

const app = require('../src/app')
const Task = require('../src/models/task')
const { userOne, userOneId, userTwo, userTwoId,taskOne, taskTwo, taskThree, setupDatabase} = require('./fixtures/db')



beforeEach(setupDatabase)

test('Shoud create task for user', async() => {
  const response =  await request(app)
                .post('/tasks')
                .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
                .send({
                    description: "Task New",
                    completed: true
                })
                .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
})

test('list all tasks from user 1', async() => {
    const response =  await request(app)
                  .get('/tasks')
                  .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                  .expect(200)
                  
    expect(response.body.length).toEqual(3)
      const tasks = await Task.find(response.body.owner)
      //console.log(tasks)
      expect(tasks).toMatchObject([taskOne, taskTwo,taskThree])
  })


  test('user2 should not be able to delete tasks of user1', async() => {
    const response =  await request(app)
                  .delete(`/tasks/${taskOne._id}`)
                  .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
                  .send()
                  .expect(404)

      const tasks = await Task.findById(taskOne._id)
      //console.log(tasks)
      expect(tasks).toMatchObject(taskOne)
  })

test('should fetch only completed task', async() => {
    const response = await request(app)
        .get('/tasks?completed=true')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toEqual(1)
})
