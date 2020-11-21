import Router from '@koa/router';
import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//secret key: 6LeecOcZAAAAAPH1iHj3m7BoCk1hDxGwvnPHq_yL

import db from '../models';

const router = new Router({ prefix: '/authentication' });

router.post('/login', async (ctx) => {
  const body = ctx.request.body;
  if (!body.username || !body.password) {
    ctx.body = {
      success: false,
      message: 'Fields are missing!'
    };
    return;
  }

  // We can't check, because we have both email and username here
  /*
  if (body.username.length < 3 || body.username.length > 20) {
    ctx.body = {
      success: false,
      message: 'Username length can only be between 3 and 20!'
    };
    return;
  }
  */

  if (body.password.length < 8 || body.password.length > 125) {
    ctx.body = {
      success: false,
      message: 'Password length can only be between 8 and 125!'
    };
    return;
  }

  const user = await db.User.findOne({
    where: Sequelize.or({ username: body.username }, { email: body.username }),
    attributes: ['id', 'username', 'password']
  });

  // TODO: Add verified check
  if (user && await bcrypt.compare(body.password, user.password)) {
    // TODO: Use private key instead of secret string
    const token = jwt.sign({
      id: user.id,
      username: body.username
    }, 'PrivateKeysAreOverrated?');

    ctx.body = {
      success: true,
      message: `Welcome back, ${user.username}!`,
      token
    };
  } else {
    ctx.body = {
      success: false,
      message: 'Wrong username or password!'
    };
  }
});

router.post('/register', async (ctx) => {
  const body = ctx.request.body;
  if (!body.username || !body.password || !body.email) {
    ctx.body = {
      success: false,
      message: 'Fields are missing!'
    };
    return;
  }

  if (body.username.length < 3 || body.username.length > 20) {
    ctx.body = {
      success: false,
      message: 'Username length can only be between 3 and 20!'
    };
    return;
  }

  if (body.password.length < 8 || body.password.length > 125) {
    ctx.body = {
      success: false,
      message: 'Password length can only be between 8 and 125!'
    };
    return;
  }

  if (body.email.length < 5 || body.email.length > 256) {
    ctx.body = {
      success: false,
      message: 'Email length can only be between 5 and 256!'
    };
    return;
  }

  const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  if (!mailRegex.test(body.email)) {
    ctx.body = {
      success: false,
      message: 'Email syntax validation failed!'
    };
    return;
  }

  // TODO: Unicode emails and usernames?
  // TODO: Add Google reCAPTCHA
  // TODO: Add email verification

  try {
    const user = await db.User.create({ username: body.username, email: body.email, password: body.password });
    ctx.body = {
      success: true,
      message: 'Registration successful, please verify your account!'
    };
  } catch (e) {
    ctx.body = {
      success: false,
      message: ''
    };
    if (e.fields.username) {
      ctx.body.message = 'Username already exists in our database!';
    } else if (e.fields.email) {
      ctx.body.message = 'Email already exists in our database!';
    }
  }
});

export default router;
