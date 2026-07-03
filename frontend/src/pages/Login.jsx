import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        if (!email || !password) {

            alert("Please enter email and password.");

            return;

        }

        try {

            setLoading(true);

            const res = await axios.post(

                "http://localhost:5000/api/users/login",

                {

                    email,

                    password

                }

            );

            localStorage.setItem(

                "token",

                res.data.token

            );

            localStorage.setItem(

                "user",

                JSON.stringify(res.data.user)

            );

            alert("Login Successful!");

            navigate("/dashboard");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Login Failed"

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

                <p>

                    Welcome Back! Login to continue.

                </p>

                <div className="login-group">

                    <label>Email</label>

                    <input

                        type="email"

                        placeholder="Enter your registered email"

                        value={email}

                        onChange={(e) =>

                            setEmail(e.target.value)

                        }

                    />

                </div>

                <div className="login-group">

                    <label>Password</label>

                    <input

                        type="password"

                        placeholder="Enter your account password"

                        value={password}

                        onChange={(e) =>

                            setPassword(e.target.value)

                        }

                    />

                </div>

                <button

                    className="login-btn"

                    onClick={handleLogin}

                    disabled={loading}

                >

                    {

                        loading

                            ? "Logging In..."

                            : "Login"

                    }

                </button>

                <div className="login-footer">

                    <p>

                        Don't have an account?{" "}

                        <Link to="/signup">

                            Sign Up

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;