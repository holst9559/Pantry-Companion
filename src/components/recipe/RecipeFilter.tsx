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
              {sortedItems.map((ingredient) => {
                return (
                  <IngredientComponent
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
