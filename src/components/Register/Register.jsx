import { useState } from "react";
import Modal from "../Modal/Modal";
import { Button } from "../ui/Button";
import PasswordInput from "../ui/PasswordInput";
import api from "../../utils/Api";

const Register = ({ open, onClose, onSwitchToLogin, setTooltip = () => {} }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const hasPasswordConfirmation = confirmPassword.length > 0;
    const passwordsMatch = password === confirmPassword;

    const isFormValid =
        email.trim() &&
        password.trim() &&
        password.length >= 8 &&
        confirmPassword.length >= 8 &&
        passwordsMatch;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordsMatch) {
            setTooltip({
                isOpen: true,
                isSuccess: false,
                message: "Passwords do not match.",
            });
            return;
        }

        try {
            await api.signup({ name, email, password });
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            onSwitchToLogin();

            setTooltip({
                isOpen: true,
                isSuccess: true,
                message: "Account created successfully!",
            });
        } catch (err) {
            setTooltip({
                isOpen: true,
                isSuccess: false,
                message: err.message || "Failed to create account",
            });
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <h2 className="modal__title">Create your account</h2>
            <p className="modal__subtitle">Join FILMERA and start matching.</p>
            <form className="modal__form" onSubmit={handleSubmit}>
                <div className="modal__field">
                    <label className="modal__label" htmlFor="register-name">Name</label>
                    <input
                        id="register-name"
                        type="text"
                        className="modal__input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="modal__field">
                    <label className="modal__label" htmlFor="register-email">Email</label>
                    <input
                        id="register-email"
                        type="email"
                        className="modal__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="modal__field">
                    <label className="modal__label" htmlFor="register-password">Password</label>
                    <PasswordInput
                        id="register-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                        minLength={8}
                    />
                </div>
                <div className="modal__field">
                    <label className="modal__label" htmlFor="register-confirm-password">Confirm password</label>
                    <PasswordInput
                        id="register-confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        minLength={8}
                        required
                        aria-invalid={hasPasswordConfirmation && !passwordsMatch}
                        aria-describedby={hasPasswordConfirmation ? "register-password-match" : undefined}
                    />
                    {hasPasswordConfirmation && (
                        <p
                            id="register-password-match"
                            className={`modal__validation ${passwordsMatch ? "modal__validation--success" : "modal__validation--error"}`}
                            role="status"
                        >
                            {passwordsMatch ? "Passwords match." : "Passwords do not match."}
                        </p>
                    )}
                </div>
                <Button type="submit" variant="hero" size="md" className="modal__submit" disabled={!isFormValid}>
                    Create account
                </Button>
            </form>
            <p className="modal__footer">
                Already have an account?
                <button type="button" className="modal__link" onClick={onSwitchToLogin}>
                    Log in
                </button>
            </p>
        </Modal>
    );
};

export default Register;
