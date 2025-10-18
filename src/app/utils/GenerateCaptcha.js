export const generateCaptcha = () => {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let captcha = "";
  for (let i = 0; i < 5; i++) {
    captcha += chars[Math.floor(Math.random() * chars.length)];
  }
  return captcha;
};
