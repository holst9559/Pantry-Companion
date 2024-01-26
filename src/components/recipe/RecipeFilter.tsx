"use client";
import { Ingredient, IngredientObject } from "@/utils/types";
import { Dispatch, FC, useState, useEffect, SetStateAction } from "react";
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
  const [ingredientsFilter, setIngredientsFilter] =
    useState<Ingredient[]>(ingredients);

  const addIngredient = (change: string): void => {
    const foundIngredient = ingredientsFilter.find(
      (ingredient) => ingredient.id.toString() === change
    );

    if (foundIngredient && !selectedIngredients.includes(foundIngredient)) {
      setSelectedIngredients((prevSelectedIngredients) => [
        ...prevSelectedIngredients,
        foundIngredient,
      ]);
      setIngredientsFilter((prevIngredientsFilter) =>
        prevIngredientsFilter.filter(
          (ingredient) => ingredient.id.toString() !== change
        )
      );
    }
  };

  const removeIngredient = (change: string): void => {
    const foundIngredient = selectedIngredients.find(
      (ingredient) => ingredient.id.toString() === change
    );

    if (foundIngredient && !ingredientsFilter.includes(foundIngredient)) {
      setIngredientsFilter((prevIngredientsFilter) => [
        ...prevIngredientsFilter,
        foundIngredient,
      ]);
      setSelectedIngredients((prevSelectedIngredients) =>
        prevSelectedIngredients.filter(
          (ingredient) => ingredient.id.toString() !== change
        )
      );
    }
  };

  return (
    <>
      <h2 className="ml-4">Select ingredients</h2>
      <div className="mb-4 mx-4 h-fill ">
        <section>
          <div>
            <input
              type="search"
              placeholder="Search ingredients"
              className="w-full h-10 rounded-lg my-2 shadow-xl bg-container p-2"></input>
          </div>

          <div className="bg-container w-full h-fill rounded-lg mx-auto shadow-xl p-2">
            <p className="font-bold text-sm">Filters</p>
            <ul className="flex gap-3 mt-4">
              {selectedIngredients?.map((ingredient) => {
                return (
                  <IngredientComponent
                    state="selected"
                    ingredientId={ingredient.id}
                    ingredientName={ingredient.name}
                    onChange={removeIngredient}
                    selectedIngredients={selectedIngredients}
                  />
                );
              })}
            </ul>

            <ul className="flex gap-3 mt-4">
              {ingredientsFilter.map((ingredient) => {
                return (
                  <li
                    className="bg-available text-black font-semibold p-2 rounded-full"
                    key={ingredient.id}
                    id={ingredient.id.toString()}
                    onClick={(e) => {
                      console.log((e.target as HTMLInputElement).id);
                      addIngredient((e.target as HTMLInputElement).id);
                    }}>
                    {ingredient.name}
                  </li>
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
