import Koa from 'koa';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import bodyParser from 'koa-body';

import authentication from './routes/authentication';
import note from './routes/note';
import Router from '@koa/router';

import db from './models';
import Note from './models/Note';

db.sequelize.authenticate()
  .then(() => console.log('Connected to the database.'))
  .catch(console.error);

db.sequelize.sync(/*{ force: true }*/)
  .then(async () =>{
    console.log('Database synced.')
    await db.User.create({
        id: 1,
        username: "test1234",
        email: "test1234@test.test",
        password: "test1234",
        /*notes:[
          { id: 1, title:'test1', text: 'This text is test text.'},
          { id: 2, title:'test2', text: 'This text is test2 text.'}
        ]*/
      }, 
      /*{
        include:[{ association: db.Note, as: 'notes' }]
      }*/
      );

    await db.Note.create({
      id: 1, title:'test1', text: 'This text is test text.', type: 'Normal', userId: 1
    })
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
app.use(note.routes(), note.allowedMethods());

app.listen(5000, console.log('Server started on port 5000.'));
