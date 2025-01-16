import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./contexts/userContext";
const App = () => {
  const { isUserLoggedIn } = User();

  return (
    <Router>
      <Routes>
        <Route path="/" element={isUserLoggedIn ? <Home /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
