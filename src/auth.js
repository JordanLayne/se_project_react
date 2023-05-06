import { baseUrl, processRes } from "./utils/Constants";

export async function registerUser(email, password, name, avatar) {
  const response = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  })
    .then((res) => processRes(res))
    .then((res) => res);
}

export function authenticateUser(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => processRes(res))
    .then((data) => {
      if (data) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
}

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => processRes(res))
    .then((data) => data);
};
