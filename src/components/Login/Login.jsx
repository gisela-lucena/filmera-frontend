import { useState } from "react";
import Modal from "../Modal/Modal";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

const Login = ({ open, onClose, onSwitchToRegister, onLogin,
    onForgotPassword, redirectAfterLogin = "/room", setTooltip = () => {} }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isFormValid =
        email.trim() &&
        password.trim() &&
        password.length >= 8;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await onLogin({ email, password });

            if (user) {
                setEmail("");
                setPassword("");
                onClose();
                navigate(redirectAfterLogin);
            }
        } catch (err) {
            setTooltip({
                isOpen: true,
                isSuccess: false,
                message: err.message || "Something went wrong",
            });
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <h2 className="modal__title">Welcome back</h2>
            <p className="modal__subtitle">Log in to continue swiping.</p>
            <form className="modal__form" onSubmit={handleSubmit}>
                <div className="modal__field">
                    <label className="modal__label" htmlFor="login-email">Email</label>
                    <input
                        id="login-email"
                        type="email"
                        className="modal__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="modal__field">
                    <label className="modal__label" htmlFor="login-password">Password</label>
                    <input
                        id="login-password"
                        type="password"
                        className="modal__input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="modal__help">
                        <button
                            type="button"
                            className="modal__link modal__forgot"
                            onClick={() => {
                                if (typeof onForgotPassword === "function") {
                                    onForgotPassword();
                                    return;
                                }
                                setTooltip({
                                    isOpen: true,
                                    isSuccess: false,
                                    message: "Password reset is not available yet.",
                                });
                            }}
                        >
                            Forgot your password?
                        </button>
                    </div>
                </div>
                <Button type="submit" variant="hero" size="md" className="modal__submit" disabled={!isFormValid}>
                    Log in
                </Button>
            </form>
            <p className="modal__footer">
                Don't have an account?
                <button type="button" className="modal__link" onClick={onSwitchToRegister}>
                    Create one
                </button>
            </p>
        </Modal>
    );
};

export default Login;
