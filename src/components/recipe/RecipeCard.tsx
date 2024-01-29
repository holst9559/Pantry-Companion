import { FC } from "react";
import { Recipe } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link
      href={"/recipes/" + recipe.id}
      className="bg-container rounded-lg overflow-hidden shadow-md shadow-slate-400 relative transition-all hover:-translate-y-1 hover:bg-white hover:bg-opacity-10 w-2/5">
      <li>
        {recipe.imgUrl && (
          <Image
            src={recipe.imgUrl}
            alt={recipe.title}
            width={400}
            height={300}
            className="w-full h-28 object-cover"
          />
        )}

        <div>
          <h2 className="text-center font-medium">{recipe.title}</h2>
          <p className="text-center">{recipe.prepTime + recipe.cookTime} min</p>
        </div>
      </li>
    </Link>
  );
};

export default RecipeCard;
