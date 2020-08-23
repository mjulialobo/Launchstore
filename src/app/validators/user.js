const User = require("../models/User");
const { compare } = require("bcryptjs");

function checkAllFields(body) {
  const keys = Object.keys(body);
  //validation
  for (key of keys) {
    //same as using req.body.avatar_url
    if (body[key] == "") {
      return {
        user: body,
        error: "Preencha todos os campos",
      };
    }
  }
}

async function show(req, res, next) {
  const { userId: id } = req.session;

  const user = await User.findOne({ where: { id } });

  if (!user)
    return res.render("user/register", {
      error: "Usuário não encontrado",
    });

  req.user = user;
  next();
}
async function post(req, res, next) {
  const fillAllFields = checkAllFields(req.body);
  if (fillAllFields) {
    return res.render("user/register", fillAllFields);
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
async function update(req, res, next) {
  const fillAllFields = checkAllFields(req.body);
  if (fillAllFields) {
    return res.render("user/index", fillAllFields);
  }

  const { id, password } = req.body;
  if (!password)
    return res.render("user/index", {
      user: req.body,
      error: "Insira sua senha para atualizar as informações",
    });

  const user = await User.findOne({ where: { id } });
  const passed = await compare(password, user.password);
  if (!passed)
    return res.render("user/index", {
      user: req.body,
      error: "Senha Incorreta.",
    });

  req.user = user;
  next();
}

module.exports = {
  post,
  show,
  update,
};
