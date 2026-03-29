import React from 'react'

const Input = (props) => {
    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 bg-[#EDEEF0] rounded-full sm:rounded-full rounded">
            <input
                type="text"
                value = {props.value}
                onChange = {props.onChange}
                onKeyPress={props.onKeyPress}
                placeholder="add your task here"
                className="flex-1 px-4 sm:px-7 py-3 sm:py-4 bg-[#EDEEF0] rounded-full sm:rounded-full rounded focus:outline-none focus:ring-2 focus:ring-[#FF6B5B] placeholder-gray-400 text-sm sm:text-base" />
            <button
                onClick = {props.onClick}
                className="px-6 sm:px-12 cursor-pointer py-3 bg-[#FF6B5B] text-white rounded-full font-semibold hover:bg-[#FF5A47] transition text-sm sm:text-base" >
                Add
            </button>
        </div>
    )
}

export default Input