import Router from '@koa/router';

import db from '../models';

const router = new Router({ prefix: '/drawings' });

/**
 * @api {POST} /drawings/get Get drawings
 * @apiSampleRequest https://api-enotes.westeurope.cloudapp.azure.com/
 * @apiName Get drawings
 * @apiGroup Drawings
 * 
 * @apiHeader  {String} Authorization  JWT token passed with 'Bearer'
 * 
 * @apiSuccess {Object[]} array              All drawings
 * @apiSuccess {Number}   array.id           ID
 * @apiSuccess {Number}   array.clientX      Position X
 * @apiSuccess {Number}   array.clientY      Position Y
 * @apiSuccess {String}   array.imageURL     Image URL
 * 
 * @apiError (Error 403) Unauthorized If invalid token was specified
 */
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

/**
 * @api {POST} /drawings/create Create drawings
 * @apiSampleRequest https://api-enotes.westeurope.cloudapp.azure.com/
 * @apiName Create drawings
 * @apiGroup Drawings
 * 
 * @apiHeader  {String} Authorization  JWT token passed with 'Bearer'
 * 
 * @apiParam   (Body) {Number} clientX  Position X
 * @apiParam   (Body) {Number} clientY  Position Y
 * @apiParam   (Body) {String} imageURL Image URL
 * 
 * @apiSuccess {Boolean} success  Status of request
 * 
 * @apiError (Error 403) Unauthorized If invalid token was specified
 */
router.post('/create', async (ctx) => {
  const body = ctx.request.body;
  const jwt = ctx.request.jwtPayload;
  await db.Drawing.create({
    clientX: body.clientX,
    clientY: body.clientY,
    imageURL: body.imageURL,
    userId: jwt.id,
  });
  ctx.body = {
    success: true
  }
});

export default router;