import React from 'react';

const SpinnerLoader = () => {
  return (
    <div role="status" className="flex items-center justify-center">
      <svg
        aria-hidden="true"
        className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-900"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.59c0 27.61-22.39 50-50 50S0 78.2 0 50.59 22.39 0.59 50 0.59s50 22.39 50 50z"
          fill="currentColor"
        />
        <path
          d="M93.97 39.04c2.63-.7 4.17-3.42 3.31-6A49.99 49.99 0 0 0 50 0v10a40 40 0 0 1 37.55 27.04c.86 2.58 3.58 4.12 6.42 3z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;
