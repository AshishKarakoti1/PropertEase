import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 mt-12 mb-0">
            <div className="relative max-w-lg mx-auto bg-white bg-opacity-80 rounded-lg">
                <div className="absolute inset-0 bg-white rounded-lg"></div>
                <div className="relative z-10 p-6">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Welcome Back</h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Discover your dream home or sell your property with ease.
                    </p>

                    <form action="#" className="mb-0 mt-4 space-y-4 rounded-lg shadow-lg sm:p-4 lg:p-6">
                        <p className="text-center text-lg font-medium">Sign in to your account</p>

                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>

                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-lg border-2 border-gray-200 p-3 pe-12 text-sm shadow-md"
                                    placeholder="Enter email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>

                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full rounded-lg border-2 border-gray-200 p-3 pe-12 text-sm shadow-md"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
                        >
                            Sign in
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            No account?
                            <Link to={'/signup'} className='no-underline'> Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
