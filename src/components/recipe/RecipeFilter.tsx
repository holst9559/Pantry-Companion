"use client";
import { Ingredient } from "@/utils/types";
import { Dispatch, FC, SetStateAction, useState } from "react";
import IngredientComponent from "./IngredientComponent";
import { ChangeEvent, FormEvent } from "react";
import add_icon from "../../../public/add_icon.svg";
import Image from "next/image";

interface RecipeFilterProps {
  ingredients: Ingredient[];
  selectedIngredients: Ingredient[];
  setSelectedIngredients: Dispatch<SetStateAction<Ingredient[]>>;
}

const RecipeFilter: FC<RecipeFilterProps> = ({
  ingredients,
  selectedIngredients,
  setSelectedIngredients,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputValueTrimmed = inputValue.trim().toLowerCase();

    if (
      inputValueTrimmed !== "" &&
      !selectedIngredients.some(
        (ingredient) => ingredient.name.toLowerCase() === inputValueTrimmed
      )
    ) {
      const matchingIngredient = ingredients.find(
        (ingredient) => ingredient.name.toLowerCase() === inputValueTrimmed
      );

      if (matchingIngredient) {
        setSelectedIngredients((prevIngredients) => [
          ...prevIngredients,
          matchingIngredient,
        ]);
        setInputValue("");
      }
    }
  };

  const removeIngredient = (change: string): void => {
    setSelectedIngredients((prevSelectedIngredients) => {
      const newIngredients = prevSelectedIngredients.filter(
        (ingredient) => ingredient.id.toString() !== change
      );
      return newIngredients;
    });
  };

  const sortedItems = selectedIngredients
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <h2 className="ml-5 text-xl font-semibold">Select ingredients</h2>
      <div className="mb-4 mx-4 h-fill ">
        <section>
          <form onSubmit={handleAddClick}>
            <div className="flex">
              <input
                type="text"
                placeholder="Search ingredients"
                onChange={handleInputChange}
                value={inputValue}
                list="ingredients"
                className="w-full h-10 rounded-lg my-2 mr-4 shadow-md shadow-slate-400 bg-container p-2"
              />
              <datalist id="ingredients">
                {ingredients.map((item, index) => (
                  <option key={index} value={item.name} />
                ))}
              </datalist>
              <button type="submit">
                <Image
                  src={add_icon}
                  width={48}
                  height={48}
                  alt="Submit button"
                  className="w-8 mr-2 shadow-md shadow-slate-400 rounded-2xl"
                />
              </button>
            </div>
          </form>

          <div className="bg-container w-full h-fill rounded-lg mx-auto shadow-md shadow-slate-400 p-4">
            <p className="font-bold text-l">Selected ingredients</p>
            <ul className="flex gap-3 mt-4 flex-row flex-wrap ">
              {sortedItems.map((ingredient) => (
                <IngredientComponent
                  key={ingredient.id}
                  ingredientId={ingredient.id}
                  ingredientName={ingredient.name}
                  onChange={removeIngredient}
                />
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default RecipeFilter;
