import { FC } from "react";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="p-4 text-2xl font-semibold text-center mx-auto">
      <Link href="/">Pantry Companion</Link>
    </header>
  );
};

export default Header;
