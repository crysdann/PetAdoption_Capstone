import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Registerimg from "../assets/images/register.jpg";
import Pawprint from "../assets/images/pawprintsignup.png";
import graphQLFetch from "../graphQLFetch";
import "../style.css";

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const allFields = watch();

  const onSubmit = async (data) => {
    console.log("Form submitted", data);
    try {
      const query = `mutation {
        createUser(user: {
          first_name: "${data.first_name}",
          last_name: "${data.last_name}",
          email: "${data.email}",
          phone: "${data.phone}",
          password: "${data.password}"
        }) {
          _id
          user_id
          first_name
          last_name
          email
          phone
        }
      }`;

      const result = await graphQLFetch(query);
      console.log('Data inserted', result);

      // Clear the form fields
      reset();

      // Show success message
      setSuccessMessage('Registration successful!');
    } catch (error) {
      console.log('Error adding user:', error);
    }
  };

  return (
    <div className="pt-[10rem] ml-3 pb-[1rem] shadow-2xl block border-black">
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex items-end bg-gray-900 lg:col-span-12 lg:h-full xl:col-span-6">
            <img alt="registration image" src={Registerimg} className="absolute inset-0 h-full w-full object-cover opacity-80" />
            <div className="hidden lg:relative lg:block lg:p-12 ">
              <img src={Pawprint} alt="welcome icon" className="h-10 sm:h-12" />
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">Welcome to Pet Connect</h2>
              <p className="mt-4 leading-relaxed text-white md:text-1xl">
                Discover the joys of welcoming a new pet companion into your life. Embrace unconditional love, endless tail wags, and a loyal friend forever.
              </p>
            </div>
          </section>
          <main className="flex items-center justify-center sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="w-11/12 lg:max-w-3xl">
              {successMessage && <div className="mb-4 text-primary-brown">{successMessage}</div>}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-16 grid grid-cols-6 gap-5" name="createUser"
                noValidate 
              >
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm input-white-focus text-gray-700 shadow-sm ${errors.first_name ? 'border-red-500' : ''}`}
                    {...register("first_name", {
                      required: "First Name is required",
                      minLength: { value: 2, message: "First Name must be at least 2 characters" }
                    })}
                  />
                  <p className="text-red-500">{errors.first_name?.message}</p>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 input-white-focus shadow-sm ${errors.last_name ? 'border-red-500' : ''}`}
                    {...register("last_name", {
                      required: "Last Name is required",
                      minLength: { value: 2, message: "Last Name must be at least 2 characters" }
                    })}
                  />
                  <p className="text-red-500">{errors.last_name?.message}</p>
                </div>
                <div className="col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 input-white-focus shadow-sm ${errors.email ? 'border-red-500' : ''}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                      }
                    })}
                  />
                  <p className="text-red-500">{errors.email?.message}</p>
                </div>
                <div className="col-span-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 input-white-focus shadow-sm ${errors.phone ? 'border-red-500' : ''}`}
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be 10 digits"
                      }
                    })}
                  />
                  <p className="text-red-500">{errors.phone?.message}</p>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm  input-white-focus text-gray-700 shadow-sm ${errors.password ? 'border-red-500' : ''}`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" }
                    })}
                  />
                  <p className="text-red-500">{errors.password?.message}</p>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Password Confirmation</label>
                  <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 input-white-focus shadow-sm ${errors.password_confirmation ? 'border-red-500' : ''}`}
                    {...register("password_confirmation", {
                      required: "Password confirmation is required",
                      validate: value => value === allFields.password || "Passwords must match"
                    })}
                  />
                  <p className="text-red-500">{errors.password_confirmation?.message}</p>
                </div>
                <div className="col-span-6">
                  <button type="submit" className="inline-block shrink-0 rounded-md border bg-primary-brown px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500">
                    Create an account
                  </button>
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?&nbsp;&nbsp;
                    <a href="Login" className="text-gray-700 underline">Log in</a>
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Signup;
