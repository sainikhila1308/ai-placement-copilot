import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

function Signup() {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [otp, setOtp] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [timer, setTimer] = useState(0);

    useEffect(() => {

        if (timer <= 0) return;

        const interval = setInterval(() => {

            setTimer((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);

    const handleSendOTP = async () => {

        if (!name || !email) {

            alert("Please enter your name and email.");

            return;

        }

        try {

            await axios.post(

                "http://localhost:5000/api/users/send-otp",

                {

                    email

                }

            );

            setTimer(30);

            setStep(2);

            alert("OTP sent successfully.");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Failed to send OTP."

            );

        }

    };

    const handleVerifyOTP = async () => {

        if (!otp) {

            alert("Please enter OTP.");

            return;

        }

        try {

            await axios.post(

                "http://localhost:5000/api/users/verify-otp",

                {

                    email,
                    otp

                }

            );

            alert("OTP Verified Successfully!");

            setStep(3);

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Invalid OTP."

            );

        }

    };

    const handleSignup = async () => {

        if (!password || !confirmPassword) {

            alert("Please fill all fields.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            await axios.post(

                "http://localhost:5000/api/users/signup",

                {

                    name,
                    email,
                    password

                }

            );

            alert("Account created successfully.");

            navigate("/");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Signup Failed"

            );

        }

        finally {

            setLoading(false);

        }

    };
    return (

        <div className="login-page">

            <div className="login-card">

                <h1>🤖 AI Placement Copilot</h1>

                <p>Create your account to get started.</p>

                {/* STEP 1 */}

                {step === 1 && (

                    <>

                        <div className="login-group">

                            <label>Full Name</label>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                        </div>

                        <div className="login-group">

                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>

                        <button
                            className="login-btn"
                            onClick={handleSendOTP}
                        >

                            Send Verification Code

                        </button>

                    </>

                )}

                {/* STEP 2 */}

                {step === 2 && (

                    <>

                        <h3>Email Verification</h3>

                        <p>

                            We sent a verification code to

                            <br />

                            <b>{email}</b>

                        </p>

                        <div className="login-group">

                            <label>Verification Code</label>

                            <input
                                type="text"
                                autoFocus
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) =>
                                    setOtp(
                                        e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 6)
                                    )
                                }
                            />

                        </div>

                        <button
                            className="login-btn"
                            onClick={handleVerifyOTP}
                        >

                            Verify OTP

                        </button>

                        <button
                            className="login-btn"
                            style={{ marginTop: "10px" }}
                            disabled={timer > 0}
                            onClick={handleSendOTP}
                        >

                            {

                                timer > 0

                                    ? `Resend OTP in ${timer}s`

                                    : "Resend OTP"

                            }

                        </button>

                    </>

                )}

                {/* STEP 3 */}

                {step === 3 && (

                    <>

                        <div className="login-group">

                            <label>Password</label>

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Create Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                            <small
                                style={{
                                    color: "#666",
                                    display: "block",
                                    marginTop: "8px",
                                    fontSize: "13px"
                                }}
                            >

                                Password must contain:
                                <br />
                                • At least 8 characters
                                <br />
                                • One uppercase letter
                                <br />
                                • One lowercase letter
                                <br />
                                • One number
                                <br />
                                • One special character

                            </small>

                        </div>

                        <div className="login-group">

                            <label>Confirm Password</label>

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <label>

                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            />

                            {" "}Show Password

                        </label>

                        <button
                            className="login-btn"
                            onClick={handleSignup}
                            disabled={loading}
                        >

                            {

                                loading

                                    ? "Creating Account..."

                                    : "Create Account"

                            }

                        </button>

                    </>

                )}

                <div className="login-footer">

                    <p>

                        Already have an account?{" "}

                        <Link to="/">

                            Login

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Signup;