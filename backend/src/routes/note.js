import Router from '@koa/router';

import db from '../models';

const router = new Router({ prefix: '/notes' });

/**
 * @api {POST} /notes/get Get notes
 * @apiSampleRequest https://api-enotes.westeurope.cloudapp.azure.com/
 * @apiName Get notes
 * @apiGroup Notes
 * 
 * @apiHeader  {String} Authorization  JWT token passed with 'Bearer'
 * 
 * @apiSuccess {Object[]} array              All notes
 * @apiSuccess {Number}   array.id           ID
 * @apiSuccess {String}   array.title        Title
 * @apiSuccess {String}   array.text         Text
 * @apiSuccess {String}   array.type         Type (Todo, Normal)
 * @apiSuccess {String}   array.color        Color (R, G, B, A)
 * @apiSuccess {Number}   array.clientX      Position X
 * @apiSuccess {Number}   array.clientY      Position Y
 * @apiSuccess {String}   array.imageURL     Image URL
 * @apiSuccess {Date}     array.reminderDate Reminder date
 * 
 * @apiError (Error 403) Unauthorized If invalid token was specified
 */
router.post('/get', async (ctx) => {
  const jwt = ctx.request.jwtPayload;

  const notes = await db.Note.findAll({
    where: {
      userId: jwt.id
    },
    include: [
      {
        model: db.User,
        attributes: []
      }
    ],
    attributes: ['id','title', 'text', 'type', 'color', 'clientX', 'clientY', 'imageURL', 'reminderDate'],
    raw: true
  });

  ctx.body = {
    array: notes
  };
});

/**
 * @api {POST} /notes/gettodo Get todos
 * @apiSampleRequest https://api-enotes.westeurope.cloudapp.azure.com/
 * @apiName Get todos
 * @apiGroup Notes
 * 
 * @apiHeader  {String} Authorization  JWT token passed with 'Bearer'
 * 
 * @apiParam   (Body)    {Number}  noteid  Note ID
 * 
 * @apiSuccess {Object[]} array         All todos
 * @apiSuccess {Number}   array.id      ID
 * @apiSuccess {String}   array.title   Title
 * @apiSuccess {String}   array.text    Text
 * @apiSuccess {Boolean}  array.checked Is todo checked?
 * 
 * @apiError (Error 403) Unauthorized If invalid token was specified
 */
router.post('/gettodo', async (ctx) => {
  const body = ctx.request.body;
  const jwt = ctx.request.jwtPayload;

  // TODO: Authority check
  const todos = await db.Todo.findAll({
    order: [
      ['id', 'ASC'],
    ],
    where: {
      noteId: body.noteid
    },
    attributes: ['id', 'title', 'text', 'checked'],
    raw: true
  });

  ctx.body = {
    array: todos
  };
});

/**
 * @api {POST} /notes/create Add note
 * @apiSampleRequest https://api-enotes.westeurope.cloudapp.azure.com/
 * @apiName Add note
 * @apiGroup Notes
 * 
 * @apiHeader  {String} Authorization  JWT token passed with 'Bearer'
 * 
 * @apiParam   (Body) {String}  type          Note type (Normal, Todo)
 * @apiParam   (Body) {String}  title         Title
 * @apiParam   (Body) {String}  text          Text
 * @apiParam   (Body) {String}  Color         Color (R, G, B, A)
 * @apiParam   (Body) {Number}  clientX       Position X
 * @apiParam   (Body) {Number}  clientY       Position Y
 * @apiParam   (Body) {String}  imageURL      Image URL
 * @apiParam   (Body) {String}  reminderDate  Reminder date
 * 
 * @apiSuccess {Boolean} success  Status of request
 * 
 * @apiError (Error 403) Unauthorized If invalid token was specified
 */
router.post('/create', async (ctx) => {
  const body = ctx.request.body;
  const jwt = ctx.request.jwtPayload;
  if (body.type == "Normal") {
    await db.Note.create({
      title: body.title,
      text: body.text,
      color: body.color,
      clientX: body.clientX,
      clientY: body.clientY,
      imageURL: body.imageURL,
      userId: jwt.id,
      type: "Normal",
      reminderDate: body.reminderDate
    })
  } else {
    const note = await db.Note.create({
      title: body.title,
      text: body.text,
      color: body.color,
      clientX: body.clientX,
      clientY: body.clientY,
      imageURL: body.imageURL,
      userId: jwt.id,
      type: "Todo",
      reminderDate: body.reminderDate
    })
    // TODO: Use of transactions
    body.todo.forEach(async element => {
      const td = await db.Todo.create({
        title: element,
        text: null,
        checked: false,
        noteId: note.id
      });
    });
  }

  ctx.body = {
    success: true
  };
});

/**
 * @api {POST} /notes/removenote Remove note
 * @apiSampleRequest https://api-enotes.westeurope.cloudapp.azure.com/
 * @apiName Remove note
 * @apiGroup Notes
 * 
 * @apiHeader  {String} Authorization  JWT token passed with 'Bearer'
 * 
 * @apiParam   (Body) {Number} noteid  Note ID
 * 
 * @apiSuccess {Boolean} success  Status of request
 * 
 * @apiError (Error 403) Unauthorized If invalid token was specified
 */
router.post('/removenote', async (ctx) => {
  const body = ctx.request.body;
  const jwt = ctx.request.jwtPayload;

  await db.Note.destroy({
    where: {
      id: body.noteid,
      userId: jwt.id
    }
  }).catch((err) => {
    console.log(err)
  });

  ctx.body = {
    success: true
  };
});

/**
 * @api {POST} /notes/updatetodo Update todo
 * @apiSampleRequest https://api-enotes.westeurope.cloudapp.azure.com/
 * @apiName Update todo
 * @apiGroup Notes
 * 
 * @apiHeader  {String} Authorization  JWT token passed with 'Bearer'
 * 
 * @apiParam   (Body) {Number}  todoid   Todo ID
 * @apiParam   (Body) {Boolean} checked  Is todo checked?
 * 
 * @apiSuccess {Boolean} success  Status of request
 * 
 * @apiError (Error 403) Unauthorized If invalid token was specified
 */
router.post('/updatetodo', async (ctx) => {
  const body = ctx.request.body;
  const jwt = ctx.request.jwtPayload;

  // TODO: Authority check
  await db.Todo.update({
    checked: body.checked
  }, {
    where: {
      id: body.todoid
    }
  });

  ctx.body = {
    success: true
  };
});

/**
 * @api {POST} /notes/updateNotePos Update note position
 * @apiSampleRequest https://api-enotes.westeurope.cloudapp.azure.com/
 * @apiName Update note position
 * @apiGroup Notes
 * 
 * @apiHeader  {String} Authorization  JWT token passed with 'Bearer'
 * 
 * @apiParam   (Body) {Number} noteid   Note ID
 * @apiParam   (Body) {Number} clientX  Position X
 * @apiParam   (Body) {Number} clientY  Position Y
 * 
 * @apiSuccess {Boolean} success  Status of request
 * 
 * @apiError (Error 403) Unauthorized If invalid token was specified
 */
router.post('/updateNotePos', async (ctx) =>{
  const body = ctx.request.body;
  const jwt = ctx.request.jwtPayload;

  await db.Note.update({
    clientX: body.clientX,
    clientY: body.clientY
  }, {
    where: {
      id: body.noteid
    }
  });

  ctx.body = {
    success: true
  };
});

export default router;