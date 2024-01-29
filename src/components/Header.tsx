"use client";
import { FC } from "react";
import Link from "next/link";
import goback_icon from "../../public/goback_icon.svg";
import edit_icon from "../../public/edit_icon.svg";
import Image from "next/image";

type HeaderProps = {
  title: string;
};

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header className="sticky pt-1 top-0 bg-container h-20 border-b-2 border-selected">
      <div className="flex justify-between items-center gap-4 container mx-auto px-4 my-4 max-w-6xl border-b-2 border-white border-opacity-10 bg-transparent">
        <Link href="#" onClick={() => history.go(-1)}>
          <Image
            src={goback_icon}
            height={40}
            width={40}
            alt="Go back"
            className="hover:brightness-110"
          />
        </Link>
        <h1 className="text-2xl font-semibold text-selected">{title}</h1>

        <button>
          <Image
            src={edit_icon}
            height={40}
            width={40}
            alt="Edit recipe"
            className=""
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
