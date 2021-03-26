import nextconnect from 'next-connect';
import all from '../../middlewares/all';
import { extractUser } from '../../util/api-helpers';

const handler = nextconnect();
handler.use(all);
handler.get(async (req, res) => {
    console.log(extractUser(req));

     res.json({ user: extractUser(req) })
});

export default handler;