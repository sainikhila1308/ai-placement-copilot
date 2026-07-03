import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PlacementTracker from "./pages/PlacementTracker";
import AIAssistant from "./pages/AIAssistant";
import AISession from "./pages/AISession";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            {/* Public Routes */}

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/signup"
                element={<Signup />}
            />

            {/* Protected Routes */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/placement"
                element={
                    <ProtectedRoute>
                        <PlacementTracker />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/ai"
                element={
                    <ProtectedRoute>
                        <AIAssistant />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/ai/:id"
                element={
                    <ProtectedRoute>
                        <AISession />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default App;