import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import home_icon from "../../public/home_icon.svg";
import recipes_icon from "../../public/recipes_icon.svg";
import add_icon from "../../public/add_icon.svg";
import user_icon from "../../public/user_icon.svg";
import settings_icon from "../../public/settings_icon.svg";

const Footer: FC = () => {
  return (
    <footer className="fixed bottom-0 w-screen bg-container border-t border-selected ">
      <nav>
        <ul className="flex justify-between items-center gap-4 container mx-auto px-4 my-2 max-w-6xl border-b-2 border-white border-opacity-10">
          <li>
            <Link href="/home">
              <Image
                src={home_icon}
                width={48}
                height={48}
                alt="Navigate to homepage"
                className="shadow-md shadow-slate-400"
              />
            </Link>
          </li>
          <li>
            <Link href="/recipes">
              <Image
                src={recipes_icon}
                width={48}
                height={48}
                alt="Navigate to recipes"
                className="shadow-md shadow-slate-400"
              />
            </Link>
          </li>
          <li>
            <Link href="/recipes/new">
              <Image
                src={add_icon}
                width={48}
                height={48}
                alt="Navigate to create new recipe"
                className="shadow-md shadow-slate-500 rounded-3xl"
              />
            </Link>
          </li>
          <li>
            <Link href="/pantry">
              <Image
                src={user_icon}
                width={48}
                height={48}
                alt="Navigate to pantry"
                className="shadow-md shadow-slate-400"
              />
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <Image
                src={settings_icon}
                width={48}
                height={48}
                alt="Navigate to settings"
                className="shadow-md shadow-slate-400"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
