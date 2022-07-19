const ACCESS_TOKEN = "accessToken";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}
export function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN, token);
}
export function removeAccessToken() {
  return localStorage.removeItem(ACCESS_TOKEN);
}
