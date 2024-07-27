import React from 'react';

const RadioGroup = ({ label, name, options, required }) => {
  return (
    <div className="mb-4 flex flex-col items-start w-full bg-gray-700 p-3 rounded-md">
      <label className="block text-white text-sm font-bold mb-2">{label}</label>
      {options.map((option) => (
        <label key={option.value} className="block text-gray-400">
          <input
            type="radio"
            name={name}
            value={option.value}
            required={required}
            className="mr-2 leading-tight"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;