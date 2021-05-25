import njwt from 'njwt';
import dotenv from 'dotenv';

dotenv.config();

export default (minLevel) => {
  return async (req, res, next) => {
    if (!req.token) {
      res.status(401).json({
        error: true,
        message: 'Unauthorized',
      })
      return;
    }
  
    njwt.verify(req.token, process.env.SIGNING_KEY, (err, jwt) => {
      if (err) {
        return res.status(401).json({
          error: true,
          message: 'Unauthorized',
        });
      } else {
        // Token valid. Check user level.
        const user = jwt.body;
        if (user.apiLevel < minLevel) {
          return res.status(403).json({
            error: true,
            message: 'Forbidden',
          });
        } 
        next();
      }
    });
  }
} 