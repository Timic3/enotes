import Router from '@koa/router';

const router = new Router({ prefix: '/authentication' });

router.post('/login', async (ctx) => {
  ctx.body = {
    message: "Hello world!"
  }
});

router.post('/register', async (ctx) => {
  ctx.body = {
    message: "Hello world!"
  }
});

export default router;
