import passport from 'passport';

export function authenticateAccess(req: any, res: any, next: any) {
  passport.authenticate('access', { session: false }, (err: any, user: any) => {
    console.log(err, user);
    if (err || !user) {
      return res.status(401).json({ error: 'Неверный Access токен' });
    }
    req.user = user;
    return next();
  })(req, res, next);
}
