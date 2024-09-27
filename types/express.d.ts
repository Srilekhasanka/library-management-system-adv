declare global {
  namespace Express {
    interface Request2 {
      user?: any;
    }
  }
}
