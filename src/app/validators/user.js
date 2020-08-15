const User = require("../models/User");
async function post(req, res, next) {
  const keys = Object.keys(req.body);
  //validation
  for (key of keys) {
    //same as using req.body.avatar_url
    if (req.body[key] == "") {
      return res.render("user/register", {
        user: req.body,
        error: "Preencha todos os campos",
      });
    }
  }
  //check if user exists[email, cpf or cnpj unique]//
  let { email, cpf_cnpj, password, passwordRepeat } = req.body;

  cpf_cnpj = cpf_cnpj.replace(/\D/g, "");

  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj },
  });
  if (user)
    return res.render("user/register", {
      user: req.body,
      error: "Usuário já existe",
    });
  if (password != passwordRepeat)
    return res.render("user/register", {
      user: req.body,
      error: "As senhas estão diferentes",
    });

  next();
}

module.exports = {
  post,
};
