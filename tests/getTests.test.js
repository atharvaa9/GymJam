const request = require('supertest');
const app = require('../app');

let server;

beforeAll((done) => {
  server = app.listen(3000, () => {
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    done();
  });
});

describe('GET route tests', () => {
	it('should return a 200 status code and valid response for GET /members route', async () => {
		const response = await request(app).get('/members');
		expect(response.status).toBe(200);
	});

	it('should handle errors and return a 404 status code for an invalid route', async () => {
		const response = await request(app).get('/doctors');
		expect(response.status).toBe(404);
	});

  it('should return a 200 status code and valid response for GET /members/:id route', async () => {
		const response = await request(app).get('/members/53911619');
		expect(response.status).toBe(200);
	});

	it('should handle errors and return a 404 status code for an GET /members/:id invalid id', async () => {
		const response = await request(app).get('/members/5391161');
		expect(response.status).toBe(404);
	});

});
