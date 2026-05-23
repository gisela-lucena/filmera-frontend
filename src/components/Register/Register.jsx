import { useState } from "react";
import Modal from "../Modal/Modal";
import { Button } from "../ui/Button";
import api from "../../utils/Api";

const Register = ({ open, onClose, onSwitchToLogin, setTooltip = () => {} }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isFormValid =
        email.trim() &&
        password.trim() &&
        password.length >= 8;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.signup({ name, email, password });
            setName("");
            setEmail("");
            setPassword("");
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
                    <input
                        id="register-password"
                        type="password"
                        className="modal__input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                    />
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
