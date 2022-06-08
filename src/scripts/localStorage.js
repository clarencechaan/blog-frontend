function getMe() {
  return JSON.parse(localStorage.getItem("me"));
}

function getJWT() {
  return localStorage.getItem("jwt");
}

function setMe(user) {
  localStorage.setItem("me", JSON.stringify(user));
}

function setJWT(jwt) {
  localStorage.setItem("jwt", jwt);
}

function isLoggedIn() {
  return !!localStorage.getItem("me");
}

function logOut() {
  localStorage.clear();
}

export { getMe, getJWT, setMe, setJWT, isLoggedIn, logOut };
