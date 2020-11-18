import Koa from 'koa';
import helmet from 'koa-helmet';
import bodyParser from 'koa-body';

import authentication from './routes/authentication';
import Router from '@koa/router';

const app = new Koa();
const router = new Router();
router.get('/health', async (ctx) => {
  ctx.body = {
    success: true
  }
});

app.use(helmet());
app.use(bodyParser());

app.use(authentication.routes(), authentication.allowedMethods());
app.use(router.routes(), router.allowedMethods());

app.listen(5000, console.log('Server started on port 5000.'));
