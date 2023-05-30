const express = require('express');
const mainController = require('../controllers/main');
const path = require('path');
const guestMiddleware = require('../middlewares/guestMiddleware');
const sessionUser = require('../middlewares/sessionUser');

const registerValidations = require('../middlewares/registerValidations')
const loginValidations = require('../middlewares/loginValidations')

const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, '../../public/img'))
    },

    filename: (req, file, cb) => {
        const newFileName = 'bookCover-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName)
    }
})
const upload = multer({ storage })

router.get('/', mainController.home);
router.get('/books/detail/:id', mainController.bookDetail);
router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);
router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);
router.get('/users/register', guestMiddleware, mainController.register);
router.post('/users/register', registerValidations, mainController.processRegister);
router.get('/users/login', guestMiddleware, mainController.login);
router.post('/users/login', loginValidations, guestMiddleware, mainController.processLogin);
router.delete('/books/:id', sessionUser, mainController.deleteBook);
router.get('/books/edit/:id', sessionUser, mainController.edit);
router.put('/books/edit/:id', upload.single('cover'), mainController.processEdit);
router.get('/logout/', mainController.logout)
module.exports = router;
