export interface JwtPayload {
    userId: string;
    email: string;
    [key: string]: any;
  }