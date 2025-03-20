import Header from "./components/ui/LayoutUI/Header";
import User from "./contexts/userContext";
import "./App.css";
const App = () => {
  const { isUserLoggedIn } = User();

  return (
    <>
      <Header />
    </>
  );
};
export default App;
