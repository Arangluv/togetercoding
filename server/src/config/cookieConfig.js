export const cookiesConfig = () => {
  const expireTime = new Date();
  expireTime.setHours(expireTime.getHours() + 24 * 7);
  return {
    expires: expireTime,
    // sameSite: "none",
    // httpOnly: true,
    // secure: true,
  };
};
