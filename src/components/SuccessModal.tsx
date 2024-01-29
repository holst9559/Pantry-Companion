import { FC } from "react";
import { Recipe } from "@/utils/types";

type SuccessModalProps = {
  createResponse: Recipe;
};

const SuccessModal: FC<SuccessModalProps> = ({ createResponse }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-container rounded-lg p-8 max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Recipe was added
        </h2>
        <div className="text-center mt-4">
          <a
            href={`/recipes/${createResponse.id}`}
            type="button"
            className="bg-transparent border border-primary text-primary py-2 px-4 rounded-lg font-medium">
            Close
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
