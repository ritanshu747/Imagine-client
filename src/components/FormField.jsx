import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  value,
  placeholder,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900 mb-1">
        {labelName}
      </label>
      <div className="flex items-center gap-2">
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
          className="bg-gray-50 border-gray-300 border text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
        {isSurpriseMe && (
          <button
            type="button"
            className="font-semibold text-sm bg-gray-200 py-1 px-3 rounded-lg text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
            onClick={handleSurpriseMe}
          >
            Surprise Me!
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField;
