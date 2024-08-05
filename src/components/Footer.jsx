import React from "react";
import petconnect from "../assets/images/petconnectlogo.png";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import catfooter from "../assets/images/cat_footer.jpg";
import { useForm } from "react-hook-form";

const Footer = () => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data) => {
    console.log("Form submitted");
    document.getElementById("contactForm").submit();
  };
  return (
    <div>
      <div className="w-full min-h-[150px] bg-primary-dark text-white  sm:flex-row justify-center items-center">
        <h1 className="text-xl sm:text-2xl md:text-4xl flex justify-center items-center p-8">
          Helpline
        </h1>
        <div className="w-full min-h-[150px] bg-primary-dark text-white flex flex-row sm:flex-col justify-center items-center text-1xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
            <div className="text-xl sm:text-2xl md:text-4xl flex flex-col space-y-4 sm:p-6 items-center sm:items-start">
              <div className="flex items-center">
                <IoLocationOutline className="mr-2 w-6 h-6" />
                <h2 className="text-[15px] sm:text-xl">
                  PetConnect, Waterloo, Ontario, Canada
                </h2>
              </div>
              <div className="flex items-center">
                <LuPhone className="mr-2 w-6 h-6" />
                <h2 className="text-[15px] sm:text-xl">+1 999-999-9999</h2>
              </div>
              <div className="flex items-center">
                <MdOutlineMail className="mr-2 w-6 h-6" />
                <h2 className="text-[15px] sm:text-xl">
                  petconnectcs@gmail.com
                </h2>
              </div>
            </div>
            <div className="flex flex-row space-y-4 pb-16 text-dark text-center justify-center md:flex-col">
              <form
                id="contactForm"
                action="https://getform.io/f/paygddna"
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
                className="w-full pl-12 pr-12 sm:flex flex-col space-y-4"
                noValidate>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-1 rounded"
                  name="name"
                  {...register("name", {
                    required: { value: true, message: "Name is required" },
                  })}
                />
                <p className="text-red-500">{errors.name?.message}</p>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-1 rounded"
                  name="email"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  })}
                />
                <p className="text-red-500">{errors.email?.message}</p>
                <textarea
                  placeholder="Message"
                  className="w-full p-1 rounded"
                  name="usermessage"
                  {...register("usermessage", {
                    required: { value: true, message: "Message is required" },
                  })}></textarea>
                <p className="text-red-500">{errors.usermessage?.message}</p>
                {/* <button className="w-full bg-primary-light-brown p-2 rounded font-bold text-xl hover:bg-primary-brown hover:border-[#866552] hover:text-white transition duration-200">
                  Submit
                </button> */}
                <button className="w-full p-1 sm:p-2">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[100px] bg-[#fffcfb] flex flex-col sm:flex-row justify-between items-center">
        <div className="flex justify-start">
          <img src={catfooter} alt="footercat" className="w-[20rem]"></img>
        </div>
        <div>
          <Link to="/">
            <img src={petconnect} alt="logo" className="w-40 pl-50"></img>
            {/* Image by Chiemsee2024 from Pixabay 
            https://pixabay.com/photos/cat-kitten-pet-striped-young-1192026/*/}
          </Link>
        </div>
        <div className="mr-0 sm:mr-[10%]">
          <ul className="font-bold text-center">
            <li className="p-2 text-lg">
              <Link to="/" className="hover:text-primary-brown">
                Home
              </Link>
            </li>
            <li className="p-2 text-lg">
              <Link to="/adopt" className="hover:text-primary-brown">
                Adopt
              </Link>
            </li>
            <li className="p-2 text-lg">
              <Link to="/lostpets" className="hover:text-primary-brown">
                Lost pets
              </Link>
            </li>
            <li className="p-2 text-lg">
              <Link to="/successstories" className="hover:text-primary-brown">
                Success Stories
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
