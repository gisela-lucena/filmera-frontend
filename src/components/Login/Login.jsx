import { useState } from "react";
import Modal from "../Modal/Modal";
import { Button } from "../ui/Button";
import api from "../../utils/Api";
import { useNavigate } from "react-router-dom";

const Login = ({ open, onClose, onSwitchToRegister, onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await api.signin({ email, password });
            localStorage.setItem("jwt", data.token);
            setEmail("");
            setPassword("");
            onClose();
            console.log("before navigate");
            navigate("/room");

            console.log("after navigate");
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

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
                </div>
                <Button type="submit" variant="hero" size="md" className="modal__submit">
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