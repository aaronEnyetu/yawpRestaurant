const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  username: 'mock5', 
  password: '123456',
  email: 'test5@example.com'
};


describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('#POST /user should create and sign in a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    // console.log(res.body);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      user: {
        id: expect.any(String),
        email: 'test5@example.com',
        username: 'mock5'
      },
      message: 'successfully signed in!',
   
    });
  });

  it('#POST /sign-in should sign in an existing user', async () => {
    const response = await request(app).post('/api/v1/users/sessions').send({
      username: 'mock1',
      email: 'test1@example.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'successfully signed in'
     
    });
  });

  it('#GET /users should return a list of all users if admin', async () => {

    const failure = await request(app).get('/api/v1/users/authUsers');
    expect(failure.status).toBe(401);
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send({      
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin1'
    });
    // console.log(user.user);
    const response = await agent.get('/api/v1/users/authUsers');
    // console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
    });
  });

});
