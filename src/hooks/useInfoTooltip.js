import { useState } from "react";

const INITIAL_TOOLTIP_STATE = {
  isOpen: false,
  isSuccess: false,
  message: "",
};

export default function useInfoTooltip() {
  const [tooltip, setTooltip] = useState(INITIAL_TOOLTIP_STATE);

  function openInfoTooltip(isSuccess, message) {
    setTooltip({
      isOpen: true,
      isSuccess,
      message,
    });
  }

  function closeInfoTooltip() {
    setTooltip((prevTooltip) => ({
      ...prevTooltip,
      isOpen: false,
    }));
  }

  return {
    tooltip,
    openInfoTooltip,
    closeInfoTooltip,
  };
}
