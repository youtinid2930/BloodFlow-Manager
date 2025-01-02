import { Request } from 'express';

export interface AuthenticatedRequest extends Partial<Request> {
  user?: any; // Adjust 'any' to your user type if you have a specific type for user
}