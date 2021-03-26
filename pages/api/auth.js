import nextConnect from 'next-connect';
import all from '../../middlewares/all';
import passport from '../../util/passport';
import { extractUser } from '../../util/api-helpers';

const handler = nextConnect();

handler.use(all);

handler.post(passport.authenticate('local'), (req, res) => {
  // return our user object
  res.json({ user: extractUser(req.user) });
});

handler.delete((req, res) => {
    req.logOut();
    res.status(204).end();
  });

export default handler;