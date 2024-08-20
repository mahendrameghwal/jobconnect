import React from 'react'

const Errorboundrypage = ({ error, resetErrorBoundary }) => {


  const errorMessage = error ? error.message : 'An unknown error occurred';
  return (
  
    <div className="flex h-screen items-center justify-center bg-opacity-50 bg-blue-100">
    <div className="text-center">
      <div className="inline-flex rounded-full bg-yellow-100 p-4">
        <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
        <svg className="w-16 h-16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
      </div>
      <h1 className="mt-5 text-2xl font-bold text-gray-800">{errorMessage}</h1>
      <button onClick={resetErrorBoundary} className="mt-3 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
        Try Again
      </button>
      <p className="text-slate-600 mt-5 lg:text-lg">Something went wrong</p>
    </div>
  </div>
  )
}

export default Errorboundrypage