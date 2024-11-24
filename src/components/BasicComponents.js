import React from "react";

export const Label = ({ text, name }) => {
    const _text = text;
    const _name = name;
    return (
        <label
            htmlFor={_name}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{_text}
        </label>
    );
}

export const Input = ({ type, placeholder, name, required=false, value, onChange }) => {
    const _type = type;
    const _placeholder = placeholder;
    const _name = name == null ? type : name;
    const _required = required;
    return (
        <input
            type={_type}
            placeholder={_placeholder}
            name={_name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required={_required}
            value={value}
            onChange={onChange}
        />
    );
}

export const CheckBox = ({name, value, required=false, onChange, htmlText}) => {
    return (
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input id="remember" name={name} type="checkbox" value={value} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" onChange={onChange} required={required}/>
            </div>
            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{htmlText}</label>
        </div>
    )
}
