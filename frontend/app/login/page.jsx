"use client"
import { handleError, handleSuccess } from '@/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'

const Loginpage = () => {

  // State for login form inputs
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const router = useRouter()

  // Function to handle input changes
  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    const copyLoginInfo = {...loginInfo};
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  // Function to handle form submission
  const handleLogin = async(e) => {
    e.preventDefault();
    const {email, password} = loginInfo;
    // Basic validation: checking if email and password are provided
    if(!email || !password) {
      return handleError("name, email and password are required")
    }
    try {
      const url = "http://localhost:3001/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })
      const result = await response.json();

      const {success, message, jwtToken, name, error} = result; //we extract success, message, error from result
      if(success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken); // Storing JWT token in localStorage
        localStorage.setItem('loggedInUser', name); // Storing user name in localStorage
        setTimeout(() => {
          router.push("/service"); // Navigating to "/service" route after successful login
        }, 1000)
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <>
    <section className="min-h-screen flex flex-col justify-center items-center">
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleLogin} class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input onChange={handleChange} value={loginInfo.email} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input onChange={handleChange} value={loginInfo.password} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          
          <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <Link href="/signup" class="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </section>

    </>
  )
}

export default Loginpage
