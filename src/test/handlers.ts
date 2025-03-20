import { rest } from 'msw';
import { SERVER_BASE_URL } from '../constants/constants';

const testUser = {
  _id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  photo: 'default.jpg',
  role: 'user' as const,
  active: true,
};

export const handlers = [
  // Login handler
  rest.post(`${SERVER_BASE_URL}/api/v1/users/login`, async (req, res, ctx) => {
    const { email, password } = await req.json();

    if (email === 'test@example.com' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({
          status: 'success',
          token: 'test-token',
          data: {
            user: testUser,
          },
        }),
      );
    }

    return res(
      ctx.status(401),
      ctx.json({
        status: 'fail',
        message: 'Incorrect email or password',
      }),
    );
  }),

  // Signup handler
  rest.post(`${SERVER_BASE_URL}/api/v1/users/signup`, async (req, res, ctx) => {
    const formData = await req.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    if (email && password && name) {
      return res(
        ctx.status(201),
        ctx.json({
          status: 'success',
          token: 'test-token',
          data: {
            user: {
              ...testUser,
              name: name.toString(),
              email: email.toString(),
            },
          },
        }),
      );
    }

    return res(
      ctx.status(400),
      ctx.json({
        status: 'fail',
        message: 'Please provide all required fields',
      }),
    );
  }),

  // Logout handler
  rest.get(`${SERVER_BASE_URL}/api/v1/users/logout`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'success',
      }),
    );
  }),
]; 