import { Suspense, lazy } from "react";
import Header from "./components/ui/LayoutUI/Header.tsx";
import User from "./contexts/UserContext.tsx";
import "./App.css";

// Lazy load components
const LoginSignUp = lazy(() => import("./pages/LoginSignUp.tsx"));
const Main = lazy(() => import("./components/ui/Main.tsx"));
const Footer = lazy(() => import("./components/ui/LayoutUI/Footer.tsx"));

// Loading fallback component
const LoadingFallback = () => <div className="loading">Loading...</div>;

const App = () => {
  const { isUserLoggedIn } = User();

  return (
    <>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        {isUserLoggedIn === true ? <Main /> : <LoginSignUp />}
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </>
  );
};
export default App;
