import Router from '@koa/router';

import db from '../models';

const router = new Router({ prefix: '/notes' });

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
    attributes: ['id','title', 'text', 'type', 'color', 'imageURL'],
    raw: true
  });

  ctx.body = {
    array: notes
  };
});

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

router.post('/create', async (ctx) => {
  const body = ctx.request.body;
  const jwt = ctx.request.jwtPayload;
  if (body.type == "Normal") {
    await db.Note.create({
      title: body.title,
      text: body.text,
      color: body.color,
      imageURL: body.imageURL,
      userId: jwt.id,
      type: "Normal"
    })
  } else {
    const note = await db.Note.create({
      title: body.title,
      text: body.text,
      color: body.color,
      imageURL: body.imageURL,
      userId: jwt.id,
      type: "Todo"
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
    message: "something works"
  };
});

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
    message: "removed"
  };
});

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
    message: "updated"
  };
});

export default router;