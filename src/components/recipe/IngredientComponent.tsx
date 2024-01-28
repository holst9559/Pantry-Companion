import { FC } from "react";

type IngredientProps = {
  ingredientId: number;
  ingredientName: string;
  onChange: (change: string) => void;
};

const IngredientComponent: FC<IngredientProps> = ({
  ingredientId,
  ingredientName,
  onChange,
}) => {
  return (
    <li
      className="bg-selected text-white font-semibold text-sm text-center p-2 rounded-full shadow-md shadow-gray-400"
      key={ingredientId}
      id={ingredientId.toString()}
      onClick={() => {
        onChange(ingredientId.toString());
      }}>
      <p>{ingredientName}</p>
    </li>
  );
};

export default IngredientComponent;
