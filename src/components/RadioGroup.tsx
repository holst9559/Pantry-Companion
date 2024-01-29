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
    <div>
      <label>
        <input
          type="radio"
          name="visibility"
          value="true"
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
          checked={!selectedOption}
          onChange={handleOptionChange}
        />
        Private
      </label>
    </div>
  );
};

export default RadioGroup;
