import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ id, className = "", ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const visibilityLabel = isVisible ? "Hide password" : "Show password";

    return (
        <div className="password-input">
            <input
                {...props}
                id={id}
                type={isVisible ? "text" : "password"}
                className={`modal__input password-input__field ${className}`.trim()}
            />
            <button
                type="button"
                className="password-input__toggle"
                onClick={() => setIsVisible((visible) => !visible)}
                aria-label={visibilityLabel}
                title={visibilityLabel}
                aria-controls={id}
                aria-pressed={isVisible}
            >
                {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
};

export default PasswordInput;
