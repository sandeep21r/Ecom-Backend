declare namespace Express {
  export interface Request {
    user?: {
      _id: string;
      phone?: string;
      googleId?: string;
    };
  }
}
