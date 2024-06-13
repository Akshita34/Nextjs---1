import Logo from "@/Components/Logo";
import NavBar from "./NavBar";

function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <NavBar />
      </div>
    </header>
  );
}

export default Header;
