import { useState } from "react";

export default function usePopup() {
  const [popup, setPopup] = useState(null);

  function openPopup(nextPopup) {
    setPopup(nextPopup);
  }

  function closePopup() {
    setPopup(null);
  }

  return {
    popup,
    openPopup,
    closePopup,
  };
}
