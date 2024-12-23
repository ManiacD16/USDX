import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useReducer, createContext } from "react";
// import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import MainContent from "./Components/MainContent";
import Team from "./Components/Team";
import Stake from "./Components/Stake";
import Income from "./Components/Income";
import Ranks from "./Components/Ranks";
import Register from "./Components/Register";
// import Login from "./Components/Login";
// import Admin from "./Admin/admin";
// import Alogin from "./Admin/login"
// import Asignup from "./Admin/signup"
import { initialState, reducer } from "./reducer/UseReducer";

// Create a context API
export const UserContext = createContext<{ state: any; dispatch: any }>({
  state: null,
  dispatch: null,
});

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <div className="min-h-screen">
          {/* Routes for main sections */}
          <Routes>
            {/* User Panel Routes */}
            <Route path="/user" element={<MainContent />} />
            <Route path="/team" element={<Team />} />{" "}
            <Route path="/stake" element={<Stake />} />
            <Route path="/income" element={<Income />} />
            <Route path="/ranks" element={<Ranks />} />
            <Route path="/" element={<Register />} />
            {/* <Route path="/" element={<Login />} /> */}
            {/* <Route path="/admin" element={<Admin />} /> */}
            {/* <Route path="/admin/login" element={<Alogin />} /> */}
            {/* <Route path="/admin/signup" element={<Asignup />} /> */}
            <Route path="" element={<Navigate to="/" />} />{" "}
            {/* Redirect to user by default */}
            <Route path="*" element={<Navigate to="/" />} />{" "}
            {/* Redirect to user for unknown paths */}
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
