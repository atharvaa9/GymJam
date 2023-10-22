const request = require('supertest');
const app = require('../app');

describe('POST route tests', () => {
	it('should return a 200 status code and valid response for POST route', async () => {
		const response = await request(app).post('/members').send({
            "name" : "atharva",
            "email" : "atharva@gmail.com",
            "phoneNumber" : "1234567890",
            "address" : "1 castle point ter hoboken"
		});
		expect(response.status).toBe(200);
	});

	it('should handle validation and return a 400 status code for invalid data', async () => {
		const response = await request(app).post('/members').send({
            "name" : "atharva",
            "email" : "atharva@gmail.com",
            "phoneNumber" : "1234567890"
		});
		expect(response.status).toBe(400);
	});
});
