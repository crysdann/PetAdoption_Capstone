import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Sign_in1 from "../assets/images/signin_img.jpg";
import graphQLFetch from "../graphQLFetch";
import "../style.css";
import { Link } from "react-router-dom";


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Get navigate function from useNavigate
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  useEffect(() => {
    function createSnowflake() {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.style.left = Math.random() * window.innerWidth + 'px';
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
      snowflake.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 5000);
    }

    const interval = setInterval(createSnowflake, 100);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data) => {
    console.log("Form submitted", data);
    setErrorMessage('');

    try {
      const query = `
        mutation {
          loginUser(email: "${data.email}", password: "${data.password}") {
            _id   
            user_type 
          }
        }
      `;

      const result = await graphQLFetch(query);
      console.log("result", result);

      if (result) {
        // Redirect or perform actions upon successful login
        localStorage.setItem('user_id', result.loginUser._id);
        localStorage.setItem('user_type', result.loginUser.user_type);
        navigate('/');
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.log('Login error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className='login-body'>
      <section className="relative flex flex-wrap lg:h-98 lg:items-center border border-gray-300 mx-auto max-w-5xl mt-20 mb-10 ml-30 mr-30 font-josefin form-container">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-12 lg:w-1/2 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold primary-brown sm:text-3xl">Log In Now</h1>
          </div>
          {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <input
                  type="email"
                  className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm custom-input input-white-focus ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format"
                    }
                  })}
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </span>
              </div>
              <p className="text-red-500">{errors.email?.message}</p>
            </div>
            {/* <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm custom-input input-white-focus ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
              </div>
              <p className="text-red-500">{errors.password?.message}</p>
            </div> */}

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm custom-input input-white-focus ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                />
                <span
                  className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A9 9 0 1121 12h-3M7.29 12.71a9 9 0 0111.94 0" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15V12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </span>
              </div>
              <p className="text-red-500">{errors.password?.message}</p>
            </div>
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-full text-center mb-2 sm:mb-0 sm:w-auto">
                <button type="submit" className="inline-block rounded-lg bg-primary-brown px-5 py-3 text-sm font-medium text-white">
                  Sign in
                </button>
              </div>
              <div className="w-full text-center sm:w-auto">
                <p className="text-sm text-gray-500">No account?&nbsp;
                  <Link
                    to="/signup"
                    className="underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className="relative w-full sm:h-96 lg:w-1/2">
          <img src={Sign_in1} alt="login" className="h-full w-full object-cover" />
        </div>
      </section>
    </div>
  );
};

export default Login;
