import React from "react";

const TextAreaField = ({
	label,
	id,
	name,
	rows,
	value,
	onChange,
	required,
}) => {
	return (
		<div className="mb-4 flex flex-col items-start">
			<label htmlFor={id} className="block text-gray-800 text-sm font-bold mb-2">
				{label}
				{required && <span className="text-red-500">*</span>}
			</label>
			<textarea
				id={id}
				name={name}
				rows={rows}
				required={required}
				value={value}
				onChange={onChange}
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			/>
		</div>
	);
};

export default TextAreaField;
