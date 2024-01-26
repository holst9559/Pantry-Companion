import { Ingredient } from "@/utils/types";
import { FC } from "react";

type IngredientProps = {
  state: string;
  ingredientId: number;
  ingredientName: string;
  onChange: (change: string) => void;
  selectedIngredients: Ingredient[];
};

const IngredientComponent: FC<IngredientProps> = ({
  state,
  ingredientId,
  ingredientName,
  onChange,
}) => {
  return (
    <li
      className={`bg-${state.toString()} text-black font-semibold p-2 rounded-full`}
      key={ingredientId}
      id={ingredientId.toString()}
      onClick={(e) => {
        onChange((e.target as HTMLInputElement).id);
      }}>
      {ingredientName}
    </li>
  );
};

export default IngredientComponent;
