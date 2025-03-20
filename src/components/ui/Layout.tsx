import { ReactNode } from "react";
import Header from "./LayoutUI/Header.tsx";
import Footer from "./LayoutUI/Footer.tsx";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
