import React from "react";

const RadioGroup = ({ label, name, options, onChange, value, required }) => {
	return (
		<div className="mb-4 flex flex-col items-start w-full bg-gray-100 p-3 rounded-md border border-gray-300">
			<label className="block text-gray-800 text-sm font-bold mb-2">
				{label}
				{required && <span className="text-red-500">*</span>}
			</label>
			{options.map((option) => (
				<label key={option.value} className="block text-gray-700 font-medium">
					<input
						type="radio"
						name={name}
						value={option.value} // Set value to the option's value
						checked={value === option.value} // Check if this option is selected
						required={required}
						onChange={onChange}
						className="mr-2 leading-tight"
					/>
					{option.label}
				</label>
			))}
		</div>
	);
};

export default RadioGroup;
