import { FC } from "react";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="flex p-4 text-2xl font-semibold">
      <Link href="/">Pantry Companion</Link>
    </header>
  );
};

export default Header;
