const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { ExpressValidator } = require('express-validator');
//const { where } = require('sequelize');
const Op = db.Sequelize.Op

const { validationResult } = require('express-validator')


const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: (req, res) => {
    db.Book.findByPk(req.params.id, {include: [{ association: 'authors' }]})
      .then((book)=> {
        res.render('bookDetail', {book: book});
      })
  },
  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: (req, res) => {
    db.Book.findAll({ where: {title: {[Op.like]: `%${req.body.title}%`}}})
    .then((books) => {res.render('search', {books: books})});
    },
  deleteBook: async(req, res) => {
    await db.Book.destroy({
      where: {
        id: req.params.id
      },
    })
    res.redirect('/')
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: (req, res) => {
    // Implement books by author
    db.Author.findByPk(req.params.id, {include: [{association: 'books'}]})
    .then((author) => {
        res.render('authorBooks', {author});
      })
  },
  register: (req, res) => {
    res.render('register');
  },
  processRegister: async (req, res) => {
    /*db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));*/
      let resultValidation = validationResult(req);
      try {
        let user = await db.User.findOne({
            where:{email: req.body.email}
        })
  
        if(!user){
          if (!resultValidation.errors.length > 0) {
            db.User.create({
              Name: req.body.name,
              Email: req.body.email,
              Country: req.body.country,
              Pass: bcryptjs.hashSync(req.body.password, 10),
              CategoryId: req.body.category
            })
            return res.redirect('/users/login');
          } else {
            return res.render('register',{
              errors: resultValidation.mapped()
            });
          }
        }else{
          return res.render('register',{
            errors: {
              email: {msg: 'El email ya existe, intente con uno nuevo'}
            }
          })
        }
    } catch (error) {
        console.log(error)
    }
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: async (req, res) => {
    let resultValidationLogin = validationResult(req);
    // Implement login process
    //try {
      let user = await db.User.findOne({
          where:{email: req.body.email}
      })

      if(user){
        if (!resultValidationLogin.errors.length > 0) {
          let passVerificada = bcryptjs.compareSync(req.body.password, user.Pass);
          if (passVerificada){
            delete user.Pass
            req.session.user = user;

            if (req.body.remember) {
              res.cookie('userEmail', req.body.email, {maxAge: (1000*60)*60})
            }

            return res.redirect('/');
          }
          return res.render('login',{
            errors: {
              password: {msg: 'La contraseña no es correcta'}
            }
          })
        } else{
          return res.render('login',{
            errors: resultValidationLogin.mapped()
          });
        }
      }else{
          return res.render('login',{
            errors: {
              email: {msg: 'El email no es correcto'}
            }
          })
      }
  /* } catch (error) {
      console.log(error)
  } */
  },
  edit: (req, res) => {
    // Implement edit book
    db.Book.findByPk(req.params.id)
      .then((book)=> {
        res.render('editBook', {book: book});
      })
  },
  processEdit: (req, res) => {
    // Implement edit book
    //let book = db.Book.findByPk(req.params.id);  
    db.Book.update(
      {
        title: req.body.title,
        cover: req.file.filename,
        description: req.body.description
      },
    {
      where: {
        id: req.params.id
      }
    }).then(()=>{
      return res.redirect('/');
    })
    
  }, 
  logout: (req, res) => {
    res.clearCookie('userEmail')
    req.session.destroy();
    return res.redirect('/');
  }
};

module.exports = mainController;
