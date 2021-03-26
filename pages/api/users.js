import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import bcrypt from 'bcryptjs';
import all from '../../middlewares/all';
import { extractUser } from '../../util/api-helpers';

const handler = nextConnect();

handler.use(all); // see how we're reusing our middleware

// POST /api/users
handler.post(async (req, res) => {
  const { name, password } = req.body;
  const email = normalizeEmail(req.body.email); // this is to handle things like jane.doe@gmail.com and janedoe@gmail.com being the same
  if (!isEmail(email)) {
    res.status(400).send('The email you entered is invalid.');
    return;
  }
  if (!password || !name) {
    res.status(400).send('Missing field(s)');
    return;
  }
  // check if email existed
  if ((await req.db.collection('users').countDocuments({ email })) > 0) {
    res.status(403).send('The email has already been used.');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await req.db
    .collection('users')
    .insertOne({ email, password: hashedPassword, name, lists: [{name: "Watched" , mediaList : [], idList: []}], ignore: [] })
    .then(({ ops }) => ops[0]);
console.log(user)
  if(user) {
      res.status(201).send('Account Created');
  } else {
    res.status(402).send('Problem Creating account');
  }
  console.log(user)
//   await req.login(user, (err) => {
//     if (err) throw err;
//     // when we finally log in, return the (filtered) user object
//     res.status(201).json({
//       user: extractUser(req),
//     });
//   });
});

export default handler;