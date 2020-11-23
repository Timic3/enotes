import Router from '@koa/router';
import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import db from '../models';

const router = new Router({ prefix: '/notes' });

router.post('/get', async (ctx) => {
    const body = ctx.request.body;

    const notes = await db.Note.findAll({
        where: {
            userId: body.userid
        },
        include:[
            {
              model: db.User,
              attributes: []
            }
        ],
        attributes: ['id','title', 'text', 'type'],
        raw: true
    });

    console.log(notes);
    ctx.body = {
        array: notes
    };
    return
});

router.post('/gettodo', async (ctx) => {
  const body = ctx.request.body;

  const todos = await db.Todo.findAll({
      where: {
          noteId: body.noteid
      },
      attributes: ['title', 'text'],
      raw: true
  });

  console.log(todos);
  ctx.body = {
      array: todos
  };
  return
});

router.post('/create', async (ctx) => {
    const body = ctx.request.body;
    console.log(body);
    if( body.type == "Normal"){
      await db.Note.create({
        title: body.title,
        text: body.text,
        userId: body.userid,
        type: "Normal"
      })
    }
    else{
      const note = await db.Note.create({
        title: body.title,
        text: body.text,
        userId: body.userid,
        type: "Todo"
      })
      body.todo.forEach(async element =>{
        const td = await db.Todo.create({
          title: element,
          text: null,
          checked: false,
          noteId: note.id
        });
        console.log(td);
      });
    }

    ctx.body = {
      message: "something works"
    };
  return
});

export default router;