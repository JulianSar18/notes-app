const router = require("express").Router();
const Users = require("../models/Users");
const user = require("../models/Users")
const passport = require('passport');
router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});
router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash: true
}));
router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});
router.post("/users/signup", async(req, res) => {
  const {name, email, password, confirmPassword} = req.body;
  const error= [];
  if(password != confirmPassword || password.length < 4 || name.length<= 0 ){
    error.push({text: 'La contraseña no coincide o contiene menos de 4 digitos o un campo esta vacio'})
  }if(error.length > 0){
    res.render('users/signup', { error, name, email, password, confirmPassword  })
  }else{
    const emailUser = await Users.findOne({email: email});
    if(emailUser){
      req.flash('error_msg', 'El email ya esta en uso');
      res.redirect('/users/signup');
    }
    const newUser = new Users({name, email, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'Se registro correctamente');
    res.redirect('/users/signin');
  }
});
module.exports = router;
