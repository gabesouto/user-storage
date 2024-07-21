'use client'

import { useState } from 'react'
import {
  validateEmail,
  validatePassword,
  validateAge,
  validateFullName,
} from '../input-validations'
import { SignupController } from '../controller/signup.controller'
import { useRouter } from 'next/navigation'

export default function SignupForm() {
  const { push } = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullname] = useState('')
  const [age, setAge] = useState('')

  const [buttonClicked, setButtonClicked] = useState(false)

  const handleSignUpBtn = async () => {
    if (email === '' || password === '' || fullName === '' || age === '') {
      return window.alert('Please fill in all fields')
    }

    const request = {
      payload: {
        email,
        password,
        fullName,
        age,
        role: 'member',
      },
      onError: () => {
        console.log('Erro no signup')
      },
      onSuccess: () => {
        push('/login')
      },
    }
    SignupController.post(request)
    setButtonClicked(true)
  }

  return (
    <div className="flex flex-col bg-white shadow-lg py-6 px-4 rounded-lg font-lato w-11/12 max-w-md overflow-hidden">
      <div className="  sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold text-gray-900 my-2">
          Create Your Account:
        </h2>
      </div>
      <form
        onSubmit={function handleSignupSubmit(e) {
          e.preventDefault()
        }}
      >
        <div className=" text-slate-950 flex  flex-col  gap-2 ">
          <label className="block text-sm font-bold" htmlFor="fullName">
            Full Name:
          </label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="fullName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          {buttonClicked && !validateFullName(fullName) && (
            <span className="text-rose-500 text-xs italic">
              Your fullName must be at least 4 characters long
            </span>
          )}

          <label className="block text-gray-700 text-sm font-bold ">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="email shadow appearance-none border rounded w-full py-2 px-3 text-stone-800 leading-tight focus:outline-none focus:shadow-outline "
            placeholder="example@email.com"
          />
          {buttonClicked && !validateEmail(email) && (
            <span className="text-rose-500 text-xs italic">
              Your email must be in this format: example@example.com.
            </span>
          )}

          <label className="block text-stone-800 text-sm font-bold">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="strongPassword"
            className="password shadow appearance-none border rounded w-full py-2 px-3 text-stone-800  leading-tight focus:outline-none focus:shadow-outline"
          />
          {buttonClicked && !validatePassword(password) && (
            <p className="text-rose-500 text-xs italic">
              Your password must be 6 characters long.
            </p>
          )}

          <label className="block text-stone-800 text-sm font-bold">Age:</label>
          <input
            type="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="25"
            className="password shadow appearance-none border rounded w-full py-2 px-3 text-stone-800  leading-tight focus:outline-none focus:shadow-outline"
          />
          {buttonClicked && !validateAge(age) && (
            <p className="text-rose-500 text-xs italic">
              Your age must be a number between 0 and 120.
            </p>
          )}

          <div className="flex flex-col items-center justify-between py-3 ">
            <button
              type={buttonClicked ? 'submit' : 'button'}
              onClick={handleSignUpBtn}
              className="signup w-80 mt-4 content-center flex items-center justify-center bg-yellow border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
