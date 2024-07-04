import React from "react";
import { useForm } from "react-hook-form";
import graphQLFetch from "../graphQLFetch";

const LostPetForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data); // Check if data is correctly logged
        try {
            const query = `
                mutation {
                    addLostPet(input: {
                        user_id: 1,
                        pet_name: "${data.floating_pet_name}",
                        pet_type: "${data.floating_pet_type}",
                        pet_breed: "${data.floating_Breed}",
                        last_seen_location: "${data.floating_lastseenLocation}",
                        last_seen_date: "${data.floating_lastSeenDate}",
                        contact_name: "${data.floating_contactName}",
                        contact_phone: "${data.floating_contactNumber}",
                        contact_email: "${data.floating_contactEmail}",
                        additional_info: "${data.floating_pet_description}"
                    }) {
                        _id
                        user_id
                        pet_name
                        pet_type
                        pet_breed
                        last_seen_location
                        last_seen_date
                        contact_name
                        contact_phone
                        contact_email
                        additional_info
                    }
                }
            `;

            const response = await graphQLFetch(query);

            if (!response || !response.addLostPet) {
                throw new Error("Failed to report lost pet.");
            }

            console.log("Lost pet successfully reported.");
            alert("Lost pet successfully reported.")
            reset(); // Reset form after successful submission
        } catch (error) {
            console.error("Error reporting lost pet:", error);
            alert("Failed to report lost pet.");
        }
    };

    return (
        <div className="pt-[12rem] pb-[2rem] mx-9 sm:mx-15">
            <h1 className="flex justify-center pt-4 pb-2 text-[2rem] sm:text-[3rem] font-bold text-[#644b3c] ">
                Report Lost Pet
            </h1>
            <p className="mt-4 text-xl text-dark text-center mb-5">
                Please fill out the form below to report your lost pet. We will assist you in finding them.
            </p>
            <form className="max-w-3xl mx-auto bg-white shadow-md rounded px-8 pt-8 pb-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="floating_pet_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer "
                            placeholder=" "
                            required
                            {...register("floating_pet_name", { required: "Pet Name is required", })}
                        />
                        <label
                            htmlFor="floating_pet_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Pet Name
                        </label>
                        {errors.floating_pet_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.floating_pet_name.message}</p>
                        )}

                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <select
                            {...register("floating_pet_type", { required: "Pet type is required" })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                            defaultValue="" // Set defaultValue to an empty string or the initial value you want
                            required
                        >
                            <option value="">Select Pet Species</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.floating_pet_type && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.floating_pet_type.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        {...register("floating_Breed", { required: false })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        placeholder=" "

                    />
                    <label
                        htmlFor="floating_Breed"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Breed
                    </label>
                </div>


                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        {...register("floating_lastseenLocation", { required: "Mention LastSeen Location" })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="floating_lastseenLocation"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        LastSeen Location
                    </label>
                    {errors.floating_lastseenLocation && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.floating_lastseenLocation.message}
                        </p>
                    )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="date"
                        {...register("floating_lastSeenDate", { required: "Mention the last seen date" })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="floating_lastSeenDate"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Last Seen Date
                    </label>
                    {errors.floating_lastSeenDate && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.floating_lastSeenDate.message}
                        </p>
                    )}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <textarea
                        {...register("floating_contactName", { required: "Provide your Name" })}
                        id="floating_contactName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        placeholder=" "
                        required
                    ></textarea>
                    <label
                        htmlFor="floating_contactName"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        ContactName
                    </label>
                    {errors.floating_contactName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.floating_contactName.message}
                        </p>
                    )}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <textarea
                        {...register("floating_contactNumber", {
                            required: "Provide your contact number",
                            pattern: { value: /^\d{10}$/, message: "Please enter a 10-digit number", },
                        })}
                        id="floating_contactNumber"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        placeholder=" "
                        required
                    ></textarea>
                    <label
                        htmlFor="floating_contactNumber"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Contact Number
                    </label>
                    {errors.floating_contactNumber && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.floating_contactNumber.message}
                        </p>
                    )}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <textarea
                        {...register("floating_contactEmail", {
                            required: "Provide your Email",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Please enter a valid email address",
                            },
                        })}
                        id="floating_contactEmail"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        placeholder=" "
                        required
                    ></textarea>
                    <label
                        htmlFor="floating_contactEmail"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Contact Email
                    </label>
                    {errors.floating_contactEmail && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.floating_contactEmail.message}
                        </p>
                    )}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <textarea
                        {...register("floating_pet_description", { required: "Provide a short description about pet" })}

                        id="floating_pet_description"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        placeholder=" "
                        required
                    ></textarea>
                    <label
                        htmlFor="floating_pet_description"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Pet description
                    </label>
                    {errors.floating_pet_description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.floating_pet_description.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border bg-primary-brown px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-red-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LostPetForm;
