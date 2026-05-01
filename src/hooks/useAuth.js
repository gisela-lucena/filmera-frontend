import { useEffect, useEffectEvent, useState } from "react";
import * as auth from "../utils/auth.js";
import { getToken, removeToken, setToken } from "../utils/token.js";

function getAuthUser(response) {
  return response?.data || response;
}

export default function useAuth({ navigate, location, onAuthError }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const handleAuthError = useEffectEvent(() => {
    onAuthError();
  });

  function clearSessionState() {
    removeToken();
    setIsLoggedIn(false);
    setUserEmail("");
  }

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setIsCheckingAuth(false);
      return;
    }

    auth
      .checkToken(token)
      .then((response) => {
        const userData = getAuthUser(response);
        setIsLoggedIn(true);
        setUserEmail(userData?.email || "");
      })
      .catch((error) => {
        console.error(error);
        clearSessionState();
        handleAuthError();
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });
  }, []);

  async function handleRegistration(data, onSuccess, onFailure) {
    try {
      await auth.signup(data);
      onSuccess("Cadastro realizado com sucesso!");
      navigate("/signin");
    } catch (error) {
      console.error(error);
      onFailure("Ops, algo deu errado. Por favor, tente novamente.");
    }
  }

  async function handleLogin(data, onFailure) {
    try {
      const response = await auth.signin(data);
      const jwt = response.token || response.jwt;

      if (!jwt) {
        throw new Error("Ops, algo deu errado. Por favor, tente novamente.");
      }

      setToken(jwt);

      const authResponse = await auth.checkToken(jwt);
      const userData = getAuthUser(authResponse);

      if (!userData) {
        throw new Error("Usuário não encontrado após autenticação.");
      }

      setIsLoggedIn(true);
      setUserEmail(userData.email || "");

      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error(error);
      clearSessionState();
      onFailure("Não foi possível entrar. Verifique email e senha.");
    }
  }

  function handleSignOut() {
    clearSessionState();
    navigate("/signin", { replace: true });
  }

  return {
    isLoggedIn,
    isCheckingAuth,
    userEmail,
    clearSessionState,
    handleRegistration,
    handleLogin,
    handleSignOut,
  };
}
