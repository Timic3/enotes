import Router from '@koa/router';

import db from '../models';

const router = new Router({ prefix: '/drawings' });

router.post('/get', async (ctx) => {
  const jwt = ctx.request.jwtPayload;

  const notes = await db.Drawing.findAll({
    where: {
      userId: jwt.id
    },
    include: [
      {
        model: db.User,
        attributes: []
      }
    ],
    attributes: ['id', 'clientX', 'clientY', 'imageURL'],
    raw: true
  });

  ctx.body = {
    array: notes
  };
});

router.post('/create', async (ctx) => {
  const body = ctx.request.body;
  const jwt = ctx.request.jwtPayload;
  await db.Drawing.create({
    clientX: body.clientX,
    clientY: body.clientY,
    imageURL: body.imageURL,
    userId: jwt.id,
  })
});

export default router;