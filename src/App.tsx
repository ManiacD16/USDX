import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import MainContent from "./Components/MainContent"; 
import Team from "./Components/Team"; 
import Stake from "./Components/Stake"; 
import Income from "./Components/Income";
import Rewards from "./Components/Rewards";
import Register from "./Components/Register";
import Login from "./Components/Login";

function App() {
  return (
    <AuthProvider> {/* Wrap the application in AuthProvider */}
      <Router>
        <div className="min-h-screen">
          {/* Routes for main sections */}
          <Routes>
            {/* User Panel Routes */}
            <Route path="/user" element={<MainContent />} />
            <Route path="/team" element={<Team />} />
            <Route path="/stake" element={<Stake />} />
            <Route path="/income" element={<Income />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="" element={<Navigate to="/user" />} /> {/* Redirect to user by default */}

            <Route path="*" element={<Navigate to="/user" />} /> {/* Redirect to user for unknown paths */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
