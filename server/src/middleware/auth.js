import Purchase from "../models/Purchase";

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
export const onlyLoginAccess = (req, res, next) => {
  if (!req.session?.user || !req.session) {
    console.log("로그인 후 이용해주세요");
    return res.status(403).send();
  }
  next();
};
export const isPurchase = async (req, res, next) => {
  try {
    // req.querys =  { name: 'html-css-basic' }
    const { name: urlName } = req.query;
    const { id: stdId } = req.session.user;
    const purchase = await Purchase.findOne({ buyer: stdId }).populate({
      path: "course",
      match: { urlName }, // 조건을 지정
    });
    if (!purchase || !purchase?.course) {
      return res.status(403).send();
    }
    // req.session이 있으면
    // user: { id: '6513c4b82fd8fec73d015d93', name: '류현수', authorized: true }
    // 없으면 -> undifined
    next();
  } catch (error) {
    console.log(error);
    console.log("유효하지않은 사용자입니다.");
    return res.status(403).send();
  }
};
