"use client";
import { Ingredient } from "@/utils/types";
import { Dispatch, FC, SetStateAction } from "react";
import IngredientComponent from "./IngredientComponent";

type RecipeFilterProps = {
  ingredients: Ingredient[];
  selectedIngredients: Ingredient[];
  setSelectedIngredients: Dispatch<SetStateAction<Ingredient[]>>;
};

const RecipeFilter: FC<RecipeFilterProps> = ({
  ingredients,
  selectedIngredients,
  setSelectedIngredients,
}) => {
  const removeIngredient = (change: string): void => {
    setSelectedIngredients((prevSelectedIngredients) =>
      prevSelectedIngredients.filter(
        (ingredient) => ingredient.id.toString() !== change
      )
    );
  };

  const sortedItems = selectedIngredients
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <h2 className="ml-5 text-xl font-semibold">Select ingredients</h2>
      <div className="mb-4 mx-4 h-fill ">
        <section>
          <div>
            <input
              type="search"
              placeholder="Search ingredients"
              className="w-full h-10 rounded-lg my-2 shadow-md shadow-slate-300 bg-container p-2"></input>
          </div>

          <div className="bg-container w-full h-fill rounded-lg mx-auto shadow-md shadow-slate-400 p-4">
            <p className="font-bold text-l">Selected ingredients</p>
            <ul className="flex gap-3 mt-4 flex-row flex-wrap ">
              {sortedItems.map((ingredient) => {
                return (
                  <IngredientComponent
                    key={ingredient.id}
                    ingredientId={ingredient.id}
                    ingredientName={ingredient.name}
                    onChange={removeIngredient}
                    selectedIngredients={selectedIngredients}
                  />
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default RecipeFilter;
