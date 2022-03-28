import { token } from '../../utils/test';

export const logIn = async (req, res, ctx) =>
  res(
    ctx.json({
      message: 'Login success',
      data: token,
    }),
  );
export const register = async (req, res, ctx) =>
  res(ctx.json({ message: 'Register success' }));
