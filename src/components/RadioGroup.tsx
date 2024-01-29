import { FC, useState, ChangeEvent } from "react";

interface RadioGroupProps {
  onChange: (value: boolean) => void;
}

const RadioGroup: FC<RadioGroupProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState(true);

  const handleOptionChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const newValue = ev.target.value === "true";
    setSelectedOption(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex mx-auto gap-10 my-4">
      <label className="font-medium">
        <input
          type="radio"
          name="visibility"
          value="true"
          className="w-6 h-6 mr-2 top-1 relative"
          defaultChecked={true}
          checked={selectedOption}
          onChange={handleOptionChange}
        />
        Public
      </label>
      <label>
        <input
          type="radio"
          name="visibility"
          value="false"
          className="w-6 h-6 mr-2 top-1 relative"
          checked={!selectedOption}
          onChange={handleOptionChange}
        />
        Private
      </label>
    </div>
  );
};

export default RadioGroup;
