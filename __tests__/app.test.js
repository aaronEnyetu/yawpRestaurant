const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  username: 'mock2', 
  password: '123456',
  email: 'test2@example.com'
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
    console.log(res.body);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      user: {
        id: expect.any(String),
        email: 'test2@example.com',
        username: 'mock2'
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

 

});
