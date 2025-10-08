import Cookies from "js-cookie";

export const isLoggedIn = () => {
  const token = Cookies.get("bx_auth_token");
  return token;
};
