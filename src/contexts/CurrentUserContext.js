import React from "react";

const CurrentUserContext = React.createContext({
  currentUser: {
    name: "",
    about: "",
    avatar: "",
  },
  handleUpdateUser: () => Promise.resolve(),
  handleUpdateAvatar: () => Promise.resolve(),
  handleCardLike: () => Promise.resolve(),
  handleCardDelete: () => Promise.resolve(),
  handleAddPlaceSubmit: () => Promise.resolve(),
  isLoggedIn: false,
});

export default CurrentUserContext;
