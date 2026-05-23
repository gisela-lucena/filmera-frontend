import { useEffect } from "react";
import { X } from "lucide-react";
import Modal from "../Modal/Modal";

export default function InfoToolTip({
    isOpen,
    isSuccess,
    message,
    onClose,
}) {
    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        function handleEscClose(event) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleEscClose);

        return () => {
            document.removeEventListener("keydown", handleEscClose);
        };
    }, [isOpen, onClose]);

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className={`info-tooltip ${isSuccess ?
                "info-tooltip_success" : "info-tooltip_error"}`}
                role="alertdialog"
                aria-live="assertive"
            >
                <div className="info-tooltip__icon">
                    {isSuccess ? "✓" : "✗"}
                </div>
                <p className="info-tooltip__message">{message}</p>
            </div>
        </Modal>
    );
}
