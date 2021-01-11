import Koa from 'koa';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import jwt from 'jsonwebtoken';

import authentication from './routes/authentication';
import note from './routes/note';
import drawing from './routes/drawing';
import Router from '@koa/router';

import db from './models';

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '/home/enotes-deploy/.env' });
  console.log(process.env.NODE_ENV);
  console.log(process.env.D_PASSWORD);
}

db.sequelize.authenticate()
  .then(() => console.log('Connected to the database.'))
  .catch(console.error);

db.sequelize.sync(/*{ force: true }*/)
  .then(async () =>{
    console.log('Database synced.')
  })
  .catch(console.error);

const app = new Koa();
const router = new Router();

router.get('/health', async (ctx) => {
  ctx.body = {
    success: true
  }
});

app.use(helmet());
app.use(cors());
app.use(bodyParser());

app.use(router.routes(), router.allowedMethods());
app.use(authentication.routes(), authentication.allowedMethods());

// Authentication required below this
app.use(async (ctx, next) => {
  if (!ctx.header.authorization) ctx.throw(403, 'No token.');
  try {
    ctx.request.jwtPayload = jwt.verify(ctx.header.authorization.split(' ')[1], 'PrivateKeysAreOverrated?');
  } catch (err) {
    ctx.throw(err.status || 403, err.text);
  }
  await next();
});
app.use(note.routes(), note.allowedMethods());
app.use(drawing.routes(), drawing.allowedMethods());

app.listen(15000, console.log('Server started on port 15000.'));
