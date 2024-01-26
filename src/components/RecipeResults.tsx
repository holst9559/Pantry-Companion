import { FC } from "react";
import { Session } from "@/utils/types";
import { SignOutButton } from "./SignOutButton";
type RecipeResultsProps = {
  session: Session;
};

const RecipeResults: FC<Session> = (session) => {
  return (
    <div>
      <section>
        <h2>Select ingredients</h2>
        <SignOutButton />
      </section>
    </div>
  );
};

export default RecipeResults;
