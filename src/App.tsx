import Header from "./components/ui/LayoutUI/Header";
import User from "./contexts/UserContext";
import LoginSignUp from "./pages/LoginSignUp";
import Main from "./components/ui/Main";
import Footer from "./components/ui/LayoutUI/Footer";
import "./App.css";
const App = () => {
  const { isUserLoggedIn } = User();

  return (
    <>
      <Header />
      {isUserLoggedIn === true ? <Main /> : <LoginSignUp />}
      <Footer />
    </>
  );
};
export default App;
