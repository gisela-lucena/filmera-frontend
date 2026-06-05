import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../utils/Api";
import { Button } from "../../components/ui/Button";

const ResetPassword = ({ setTooltip = () => {} }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid =
        token &&
        password.length >= 8 &&
        confirmPassword.length >= 8 &&
        password === confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setTooltip({
                isOpen: true,
                isSuccess: false,
                message: "Reset link is invalid.",
            });
            return;
        }

        if (password !== confirmPassword) {
            setTooltip({
                isOpen: true,
                isSuccess: false,
                message: "Passwords do not match.",
            });
            return;
        }

        try {
            setIsSubmitting(true);
            await api.resetPassword({ token, password });
            setTooltip({
                isOpen: true,
                isSuccess: true,
                message: "Password reset successfully.",
            });
            navigate("/", { state: { openLogin: true } });
        } catch (err) {
            setTooltip({
                isOpen: true,
                isSuccess: false,
                message: err.message || "Could not reset password.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="reset-password page">
            <section className="reset-password__panel">
                <Link to="/" className="reset-password__brand">FILM<span>ERA</span></Link>
                <h1 className="reset-password__title">Reset password</h1>
                <p className="reset-password__subtitle">Create a new password for your account.</p>
                <form className="modal__form" onSubmit={handleSubmit}>
                    <div className="modal__field">
                        <label className="modal__label" htmlFor="reset-password">New password</label>
                        <input
                            id="reset-password"
                            type="password"
                            className="modal__input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={8}
                            required
                        />
                    </div>
                    <div className="modal__field">
                        <label className="modal__label" htmlFor="reset-confirm-password">Confirm password</label>
                        <input
                            id="reset-confirm-password"
                            type="password"
                            className="modal__input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            minLength={8}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="hero"
                        size="md"
                        className="modal__submit"
                        disabled={!isFormValid || isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save new password"}
                    </Button>
                </form>
            </section>
        </main>
    );
};

export default ResetPassword;
