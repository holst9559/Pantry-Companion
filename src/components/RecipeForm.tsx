"use client";
import { FC, useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  addNewRecipe,
  fetchRecipeParams,
  getAllIngredients,
} from "@/services/api";
import {
  Category,
  Diet,
  Dish,
  Ingredient,
  IngredientDto,
  Instruction,
  InstructionDto,
  RecipeDto,
  RecipeIngredientDto,
} from "@/utils/types";
import Image from "next/image";
import add_icon from "../../public/add_icon.svg";
import edit_icon from "../../public/edit_icon.svg";
import delete_icon from "../../public/delete_icon.svg";
import NewIngredientModal from "./recipe/NewIngredientModal";
import RadioGroup from "./RadioGroup";

const RecipeForm: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [showModal, setShowModal] = useState<Boolean>(false);

  const [amountToAdd, setAmountToAdd] = useState<number>();
  const [unitToAdd, setUnitToAdd] = useState<string>();
  const [ingredientToAdd, setIngredientToAdd] = useState<Ingredient>();
  const [newIngredient, setNewIngredient] = useState<Ingredient>();

  const [newInstruction, setNewInstruction] = useState<
    InstructionDto | undefined
  >();

  const [formData, setFormData] = useState<RecipeDto>();
  const [formTitle, setFormTitle] = useState<string>();
  const [formDish, setFormDish] = useState<Dish>();
  const [formCategory, setFormCategory] = useState<Category>();
  const [formServings, setFormServings] = useState<number>();
  const [formPrepTime, setFormPrepTime] = useState<number>();
  const [formCookTime, setFormCookTime] = useState<number>();
  const [formVisible, setFormVisible] = useState<boolean>(true);
  const [formDiet, setFormDiet] = useState<Diet>();
  const [formDescription, setFormDescription] = useState<string>();
  const [recipeIngredients, setRecipeIngredients] = useState<
    RecipeIngredientDto[]
  >([]);
  const [instructions, setInstructions] = useState<InstructionDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { categories, diets, dishes } = await fetchRecipeParams();
      const ingredientFetch = await getAllIngredients();
      setCategories(categories);
      setDiets(diets);
      setDishes(dishes);
      setIngredients(ingredientFetch);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (newIngredient) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);

      setNewIngredient(undefined);
    }
  }, [newIngredient]);

  const handleNewIngredient = () => {
    if (
      amountToAdd != null &&
      unitToAdd != null &&
      ingredientToAdd != null &&
      amountToAdd != 0 &&
      unitToAdd != "" &&
      ingredientToAdd.name != ""
    ) {
      setRecipeIngredients((prevRecipeIngredients) => [
        ...prevRecipeIngredients,
        { ingredient: ingredientToAdd, unit: unitToAdd, amount: amountToAdd },
      ]);

      setAmountToAdd(0);
      setUnitToAdd("");
      setIngredientToAdd(undefined);
    } else {
      setAmountToAdd(0);
      setUnitToAdd("");
      setIngredientToAdd(undefined);
    }
  };

  const removeIngredient = (indexToRemove: number) => {
    setRecipeIngredients((prevRecipeIngredients) => {
      return prevRecipeIngredients.filter(
        (_, index) => index !== indexToRemove
      );
    });
  };

  const removeStep = (indexToRemove: number) => {
    setInstructions((prevInstructions) => {
      return prevInstructions.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(formVisible);
    setAmountToAdd(event.target.valueAsNumber);
  };
  const handleUnitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUnitToAdd(event.target.value);
  };
  const handleIngredientToAddChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientToAdd({
      id: ingredients.find((e) => e.name === event.target.value)?.id,
      name: event.target.value,
    });
  };
  const handleVisibilityChange = (value: boolean) => {
    setFormVisible(value);
  };

  const handleInstructionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(instructions.length);
    setNewInstruction({
      step:
        instructions !== undefined && instructions.length
          ? (instructions.length + 1).toString()
          : "1",
      description: event.target.value,
    });
  };

  const handleNewStep = () => {
    if (newInstruction) {
      setInstructions((prevInstructions) => [
        ...prevInstructions,
        newInstruction,
      ]);
      setNewInstruction({ step: newInstruction.step, description: "" });
    }
  };

  const handleFormSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (
      formTitle &&
      formDish &&
      formCategory &&
      formDescription &&
      formPrepTime &&
      formCookTime &&
      formServings &&
      formDiet
    ) {
      setFormData({
        title: formTitle,
        dish: formDish,
        category: formCategory,
        description: formDescription,
        prepTime: formPrepTime,
        cookTime: formCookTime,
        servings: formServings,
        visible: formVisible,
        instructions: instructions,
        recipeIngredients: recipeIngredients,
        imgUrl: "",
        diet: formDiet,
      });
    }

    if (formData) {
      const payload = await addNewRecipe(formData);
      console.log(payload);

      setFormData(undefined);
    }
  };

  return (
    <div className="">
      <form className="w-11/12 mx-4 mb-36" onSubmit={handleFormSubmit}>
        <section>
          <div>
            <label htmlFor="title">Title</label>
            <input
              className="w-full h-10 flex px-4 py-2 bg-slate-200 rounded-lg focus:outline-none shadow-md shadow-slate-300"
              id="title"
              name="title"
              onChange={(ev: FormEvent<HTMLInputElement>) => {
                setFormTitle(ev.currentTarget.value);
              }}
              required
              placeholder="Title"
              type="text"></input>
          </div>
          <div>
            <label>Dish</label>
            <input
              className="w-full h-10 flex px-4 py-2 bg-slate-200 rounded-lg focus:outline-none shadow-md shadow-slate-300"
              id="dish"
              name="dish"
              onChange={(ev: FormEvent<HTMLInputElement>) => {
                const selectedOption = dishes.find(
                  (item) => item.name === ev.currentTarget.value
                );
                setFormDish(selectedOption);
              }}
              required
              placeholder="Dish"
              list="dishes"
              type="text"></input>
            <datalist id="dishes">
              {dishes.map((item, index) => (
                <option key={index} value={item.name} id={item.id.toString()} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Category</label>
            <input
              className="w-full h-10 flex px-4 py-2 bg-slate-200 rounded-lg focus:outline-none shadow-md shadow-slate-300"
              id="category"
              name="category"
              onChange={(ev: FormEvent<HTMLInputElement>) => {
                const selectedOption = categories.find(
                  (item) => item.name === ev.currentTarget.value
                );
                setFormCategory(selectedOption);
              }}
              required
              placeholder="Category"
              list="categories"
              type="text"></input>
            <datalist id="categories">
              {categories.map((item, index) => (
                <option key={index} value={item.name} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Servings</label>
            <input
              className="w-full h-10 flex px-4 py-2 bg-slate-200 rounded-lg focus:outline-none shadow-md shadow-slate-300"
              id="servings"
              name="servings"
              onChange={(ev: FormEvent<HTMLInputElement>) => {
                setFormServings(parseInt(ev.currentTarget.value));
              }}
              required
              placeholder="Servings"
              type="number"></input>
          </div>
          <div>
            <label>Prep Time (min)</label>
            <input
              className="w-full h-10 flex px-4 py-2 bg-slate-200 rounded-lg focus:outline-none shadow-md shadow-slate-300"
              id="prep"
              name="prepTime"
              onChange={(ev: FormEvent<HTMLInputElement>) => {
                setFormPrepTime(parseInt(ev.currentTarget.value));
              }}
              required
              placeholder="Preperation time"
              type="number"></input>
          </div>
          <div>
            <label>Cook Time (min)</label>
            <input
              className="w-full h-10 flex px-4 py-2 bg-slate-200 rounded-lg focus:outline-none shadow-md shadow-slate-300"
              id="cook"
              name="cookTime"
              onChange={(ev: FormEvent<HTMLInputElement>) => {
                setFormCookTime(parseInt(ev.currentTarget.value));
              }}
              required
              placeholder="Coooking time"
              type="number"></input>
          </div>
          <div>
            <label>Diet</label>
            <input
              className="w-full h-10 flex px-4 py-2 bg-slate-200 rounded-lg focus:outline-none shadow-md shadow-slate-300"
              id="diet"
              name="diet"
              onChange={(ev: FormEvent<HTMLInputElement>) => {
                const selectedOption = diets.find(
                  (item) => item.name === ev.currentTarget.value
                );
                setFormDiet(selectedOption);
              }}
              required
              placeholder="Diet"
              list="diets"
              type="text"></input>
            <datalist id="diets">
              {diets.map((item, index) => (
                <option key={index} value={item.name} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Description</label>
            <textarea
              className="w-full h-24 flex px-4 py-2 bg-slate-200 rounded-lg focus:outline-none shadow-md shadow-slate-300"
              id="description"
              name="description"
              onChange={(ev: FormEvent<HTMLTextAreaElement>) => {
                setFormDescription(ev.currentTarget.value);
              }}
              required
              placeholder="Write a short description about your amazing recipe..."></textarea>
          </div>
        </section>

        <section className="mt-4">
          <div>
            <h2>Ingredients</h2>
            <div className="flex gap-8 mt-2 border-b border-selected">
              <p className="flex w-1/4 font-bold text-selected">Amount</p>
              <p className="flex w-1/4 mr-4 font-bold text-selected">Unit</p>
              <p className="flex w-2/4 mr-24 font-bold text-selected">Name</p>
            </div>

            <div>
              <ul>
                {recipeIngredients?.map((recipeIngredient) => (
                  <li
                    className="flex flex-row h-12 border-selected border-b border-opacity-60"
                    key={recipeIngredients.indexOf(recipeIngredient)}>
                    <p className="flex w-1/4 font-bold mt-2">
                      {recipeIngredient.amount}
                    </p>
                    <p className="flex w-1/4 font-bold mt-2">
                      {recipeIngredient.unit}
                    </p>
                    <p className="flex w-2/4 font-bold mt-2 ml-4">
                      {recipeIngredient.ingredient.name}
                    </p>
                    <button
                      className="flex w-8 mt-2 mr-3"
                      type="button"
                      onClick={() => {
                        removeIngredient(
                          recipeIngredients.indexOf(recipeIngredient)
                        );
                      }}>
                      <Image
                        src={delete_icon}
                        width={40}
                        height={40}
                        alt="Delete"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-row flex-nowrap gap-4 h-10 mt-2">
              <input
                className="flex p-1 w-1/4"
                placeholder="Amount"
                type="number"
                id="amount"
                onChange={handleAmountChange}
                value={amountToAdd}></input>
              <input
                className="flex p-1 w-1/4"
                placeholder="Unit"
                type="text"
                onChange={handleUnitChange}
                value={unitToAdd}></input>
              <input
                className="flex p-1 w-2/4"
                placeholder="Ingredient"
                list="ingredients"
                type="text"
                onChange={handleIngredientToAddChange}
                value={ingredientToAdd?.name}></input>
              <datalist id="ingredients">
                {ingredients.map((item, index) => (
                  <option key={index} value={item.name} />
                ))}
              </datalist>

              <button
                className="flex"
                onClick={() => handleNewIngredient()}
                type="button">
                <Image
                  src={add_icon}
                  height={40}
                  width={40}
                  alt="Add button"
                  className="w-12 justify-end mr-2 shadow-md shadow-slate-400 rounded-3xl"
                />
              </button>
            </div>
          </div>
        </section>
        <section className="border-b border-selected">
          <h3 className="flex mx-auto justify-center font-medium mt-4">
            Can't find ingredient?
          </h3>
          <button
            className="flex my-4 mx-auto py-2 px-4 rounded-xl bg-selected text-white shadow-md shadow-gray-400"
            onClick={() => setShowModal(true)}
            type="button">
            New ingredient
          </button>
        </section>

        <section className="mt-2">
          <label>Instructions</label>
          {instructions.map((item) => (
            <div className="flex flex-row mb-3">
              <p className="px-3 py-1 mr-2 h-8 mt-2 font-bold bg-selected text-white justify-center rounded-md">
                {item.step}
              </p>
              <textarea
                className="w-full flex px-4 py-2 mr-2 bg-slate-200 rounded-lg opacity-80 shadow-md shadow-slate-300"
                rows={6}
                disabled>
                {item.description}
              </textarea>
              <button
                className="flex mr-3 mt-14"
                onClick={() => {
                  removeStep(instructions.indexOf(item));
                }}
                type="button">
                <Image
                  src={delete_icon}
                  width={40}
                  height={40}
                  alt="Delete"
                  className=" shadow-md"
                />
              </button>
            </div>
          ))}

          <div className="flex flex-row">
            <p className="px-3 py-1 mr-2 h-8 mt-2 font-bold bg-selected text-white justify-center rounded-md shadow-slate-400">
              {instructions?.length
                ? (instructions.length + 1).toString()
                : "1"}
            </p>
            <textarea
              className="w-full flex px-4 py-2 mr-2 bg-slate-200 rounded-lg shadow-md shadow-slate-300"
              id="instruction"
              value={newInstruction?.description}
              onChange={handleInstructionChange}
              rows={6}
              placeholder="Write all the steps in your recipe..."></textarea>
            <button
              className="flex"
              onClick={() => handleNewStep()}
              type="button">
              <Image
                src={add_icon}
                height={40}
                width={40}
                alt="Add button"
                className="w-12 justify-end mr-2 mt-14  shadow-md shadow-slate-400 rounded-3xl"
              />
            </button>
          </div>
        </section>
        {showModal && (
          <NewIngredientModal
            setShowModal={setShowModal}
            setNewIngredient={setNewIngredient}
          />
        )}
        <div className="flex flex-col mt-4">
          <label className="flex justify-center text-lg font-medium">
            Visibility
          </label>
          <RadioGroup onChange={handleVisibilityChange} />
        </div>

        <button
          className="flex my-4 mx-auto py-2 px-4 rounded-xl bg-selected text-white shadow-md shadow-gray-400"
          type="submit">
          Add recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
