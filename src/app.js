const express = require('express');
const mainRouter = require('./routes/main');
const session = require('express-session');
const cookie = require('cookie-parser');

const usuario = require('./middlewares/session')

const app = express();

const methodOverride = require('method-override');

app.use(express.static('public'));
app.use(session({
  secret: "Secreto",
  resave: true,
  saveUninitialized: true
}));
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookie())

app.use(usuario)


app.set('view engine', 'ejs');
app.set('views', 'src/views');


app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});

app.use('/', mainRouter);

