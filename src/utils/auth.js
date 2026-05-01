const BASE_URL =
  import.meta.env.VITE_AUTH_BASE_URL ||
  "https://se-register-api.en.tripleten-services.com/v1";

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return res.text().then((text) => {
    if (!text) {
      return Promise.reject(new Error(`Error: ${res.status}`));
    }

    try {
      const errorData = JSON.parse(text);
      const message =
        errorData?.message ||
        errorData?.error ||
        errorData?.data?.message ||
        `Error: ${res.status}`;

      return Promise.reject(new Error(message));
    } catch {
      return Promise.reject(new Error(text));
    }
  });
}

export function signup({ email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export function signin({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}
