import React from "react";

const ChecklistGroup = ({
	label,
	name,
	options,
	required,
	formData,
	setFormData,
}) => {
	const handleCheckboxChange = (value, isChecked) => {
		const updatedList = isChecked
			? [...formData[name], value]
			: formData[name].filter((item) => item !== value);

		setFormData({ ...formData, [name]: updatedList });
	};

	return (
		<div className="mb-4 flex flex-col items-start w-full bg-gray-100 p-3 rounded-md border border-gray-300">
			<label className="block text-gray-800 text-sm font-bold mb-2">
				{label}
				{required && <span className="text-red-500">*</span>}
			</label>
			{options.map((option) => (
				<label key={option.value} className="block text-gray-700 font-medium">
					<input
						type="checkbox"
						name={name}
						value={option.value}
						required={required}
						className="mr-2 leading-tight"
						checked={formData[name].includes(option.value)}
						onChange={(e) =>
							handleCheckboxChange(e.target.value, e.target.checked)
						}
					/>
					{option.label}
				</label>
			))}
		</div>
	);
};

export default ChecklistGroup;
