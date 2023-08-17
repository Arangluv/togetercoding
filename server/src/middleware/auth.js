export const notAllowLogined = (req, res, next) => {
  try {
    if (req.session && req.session.user) {
      console.log("미들웨어 동작");
      return res.status(200).redirect("http://localhost:3000");
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).send();
  }
};
