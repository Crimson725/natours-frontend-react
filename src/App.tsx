import Header from "./components/ui/LayoutUI/Header.tsx";
import User from "./contexts/UserContext.tsx";
import LoginSignUp from "./pages/LoginSignUp.tsx";
import Main from "./components/ui/Main.tsx";
import Footer from "./components/ui/LayoutUI/Footer.tsx";
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
