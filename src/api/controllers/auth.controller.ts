import { Request, Response } from 'express';

export const signupUser = async (req: Request, res: Response) => {
  res.send('signup');
};

export const loginUser = async (req: Request, res: Response) => {
  res.send('login');
};
