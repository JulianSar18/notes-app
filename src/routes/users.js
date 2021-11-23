const router = require("express").Router();
router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});
router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});
router.post("/users/signup", (req, res) => {
  const {nombre, email, password, confirmPassword} = req.body;
  const error= [];
  if(password != confirmPassword || password.length < 4 || nombre.length <=0 ){
    error.push({text: 'La contraseña no coincide o contiene menos de 4 digitos o un campo esta vacio'})
  }if(error.length > 0){
    res.render('users/signup', { error, nombre, email, password, confirmPassword  })
  }else{
      res.send("ok");
  }
});
module.exports = router;
