import { Ingredient } from "@/utils/types";
import { FC } from "react";

type IngredientProps = {
  ingredientId: number;
  ingredientName: string;
  onChange: (change: string) => void;
  selectedIngredients: Ingredient[];
};

const IngredientComponent: FC<IngredientProps> = ({
  ingredientId,
  ingredientName,
  onChange,
}) => {
  return (
    <li
      className="bg-selected text-black font-semibold p-1 rounded-full"
      key={ingredientId}
      id={ingredientId.toString()}>
      <p
        className="text-center"
        onClick={(e) => {
          onChange((e.target as HTMLInputElement).id);
        }}>
        {ingredientName}
      </p>
    </li>
  );
};

export default IngredientComponent;
