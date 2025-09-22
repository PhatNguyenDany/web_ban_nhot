import { Request } from 'express';

export interface JwtPayload {
  sub: number;
  username: string;
  role: string;
}

export interface JwtRequest extends Request {
  user: JwtPayload;
}