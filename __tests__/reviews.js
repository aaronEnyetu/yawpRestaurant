const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  username: 'mock6', 
  password: '123456',
  email: 'test6@example.com'
};
  
describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
    
  afterAll(() => {
    pool.end();
  });

  it('#POST /users should be able to create a review', async () => {
    const agent = request.agent(app);
    const res = await agent.post('/api/v1/users').send(mockUser);

    expect(res.status).toBe(200);
    const review = await agent.post('/api/v1/restaurants/1/reviews').send({ stars: 5, detail: 'It was okay' });
    expect (review.status).toBe(200);
  });
});
