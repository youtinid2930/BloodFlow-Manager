// src/auth/interfaces/auth.interface.ts
import { Request } from 'express';
import { JwtPayload } from './jwt-payload.interface'; 

declare module 'express' {
  export interface Request {
    user: JwtPayload; 
  }
}
