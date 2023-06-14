import { Request, Response } from 'express';
import { TValidatePayload } from '../middleware/validateDTO.middlware';
import { IUserDTO, TCreateUserDTO } from '../dto/user.dto';
import { generateTokens } from '../../config/passport.config';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.SECRET_JWT || 'secret';

export const signupUser = async (req: TValidatePayload<TCreateUserDTO>, res: Response) => {
  const validationPayload = req.validatedPayload;
  res.send(validationPayload);
};

export const loginUser = async (req: TValidatePayload<IUserDTO>, res: Response) => {
  const validationPayload = req.validatedPayload;
  console.log(validationPayload);
  const tokens = generateTokens({ username: 'max' });
  return res.json(tokens);
  // res.send(validationPayload);
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  // Проверка и валидация Refresh токена
  try {
    const decoded = jwt.verify(refreshToken, jwtSecret) as any;
    console.log(decoded);

    const username = decoded.username;
    const user = { username }; // В данном примере предполагается, что userId верен
    const tokens = generateTokens(user);
    return res.json(tokens);
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Неверный Refresh токен' });
  }
};
