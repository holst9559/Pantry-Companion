"use client";
import {
  FC,
  useState,
  useEffect,
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";
import { getNewIngredients, postNewIngredient } from "@/services/api";
import { Ingredient } from "@/utils/types";

type NewIngredientModalProps = {
  setShowModal: Dispatch<SetStateAction<Boolean>>;
  setNewIngredient: Dispatch<SetStateAction<Ingredient>>;
};

const NewIngredientModal: FC<NewIngredientModalProps> = ({
  setShowModal,
  setNewIngredient,
}) => {
  const [newIngredients, setNewIngredients] = useState<Ingredient[]>([]);
  const [newIngredientImport, setNewIngredientImport] = useState<string>();
  const [ingredientSearch, setIngredientSearch] = useState<string>();

  const newIngredientsFetch = async () => {
    if (ingredientSearch != null) {
      const data: Ingredient[] = await getNewIngredients(ingredientSearch);
      setNewIngredients(data);
    }
  };

  const handleIngredientRegister = async () => {
    const rightIngredient: Ingredient[] = newIngredients.filter(
      (ingredient) => ingredient.name == newIngredientImport
    );
    const data = await postNewIngredient(rightIngredient[0]);
    setNewIngredient(data);
    setIngredientSearch("");
    setNewIngredientImport("");

    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-container rounded-lg p-8 max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-6">Add new ingredient</h2>
        <div className="mb-6">
          <label
            htmlFor="search"
            className="block text-gray-700 font-medium mb-2">
            Ingredient
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search for ingredient"
            value={ingredientSearch}
            onChange={(ev: FormEvent<HTMLInputElement>) => {
              setIngredientSearch(ev.currentTarget.value);
            }}
            className="w-full px-4 py-2 bg-slate-200
            rounded-lg focus:outline-none"
          />
        </div>
        <button
          onClick={() => newIngredientsFetch()}
          type="button"
          className="w-full bg-selected text-white py-2 px-4 rounded-lg font-medium">
          Search
        </button>
        <div className="mb-6 mt-6">
          <label
            htmlFor="ingredient"
            className="block text-gray-700 font-medium mb-2">
            Ingredient
          </label>
          <input
            type="text"
            id="ingredient"
            list="newIngredients"
            placeholder="Select ingredient"
            value={newIngredientImport}
            onChange={(ev: FormEvent<HTMLInputElement>) => {
              setNewIngredientImport(ev.currentTarget.value);
            }}
            className="w-full px-4 py-2 bg-slate-200
            rounded-lg focus:outline-none"
          />

          <datalist id="newIngredients">
            {newIngredients.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
        </div>
        <button
          onClick={() => handleIngredientRegister()}
          type="button"
          className="w-full bg-selected text-white py-2 px-4 rounded-lg font-medium">
          Add
        </button>
        <div className="text-center mt-4">
          <button
            onClick={() => setShowModal(false)}
            className="bg-transparent border border-primary text-primary py-2 px-4 rounded-lg font-medium">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewIngredientModal;
