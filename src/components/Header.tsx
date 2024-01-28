import { FC } from "react";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="p-4  mx-auto text-center">
      <Link className="text-2xl font-semibold " href="/">
        Pantry Companion
      </Link>
    </header>
  );
};

export default Header;
