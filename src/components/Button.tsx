import React from 'react';
import Loader from './Loader';

type ButtonProps = {
    type: 'primary', // add more types
    text: string;
    isLoading?: boolean,
    loadingText?: string,
    onClick: () => void
};

const Button = ({ type, isLoading, loadingText, onClick, text }: ButtonProps) => {
    let className = '';
    
    // can support more types here 
    if (type === 'primary') {
        className = '  bg-indigo-600  text-white hover:bg-indigo-500'
    }

    return (
        <button
            className={`inline-flex items-center pointer-events-auto rounded-md py-2 px-3 font-semibold ${className}`}
            onClick={onClick}
        >
            {isLoading && <Loader loadingText={loadingText}/>}
            {!isLoading && text}
        </button>
    );
};

export default Button;