import axios from 'axios';

// Replace this with the actual URL of your server
const baseUrl = 'http://localhost:3000';

test('GET /members should return a 200 status code', async () => {
  const response = await axios.get(`${baseUrl}/members`);
  expect(response.status).toBe(200);
});


