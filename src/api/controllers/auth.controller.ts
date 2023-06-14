import { Response } from 'express';
import { TValidatePayload } from '../middleware/validateDTO.middlware';
import { IUserDTO, TCreateUserDTO } from '../dto/user.dto';
import { generateTokens } from '../../config/passport.config';

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
