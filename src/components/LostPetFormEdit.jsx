import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import graphQLFetch from "../graphQLFetch";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const LostPetFormEdit = () => {
    const navigate = useNavigate();
    const { petId } = useParams(); // Get petId from URL parameters
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm();

    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        if (petId) {
            const fetchPetDetails = async () => {
                const query = `
                    query GetLostPetDetails($petId: ID!) {
                        getLostPetDetails(petId: $petId) {
                            _id
                            pet_name
                            pet_type
                            pet_breed
                            last_seen_location
                            last_seen_date
                            contact_name
                            contact_phone
                            contact_email
                            additional_info
                            pet_image
                        }
                    }
                `;

                const variables = { petId };

                try {
                    const response = await graphQLFetch(query, variables);
                    if (response && response.getLostPetDetails) {
                        setInitialData(response.getLostPetDetails);
                        Object.keys(response.getLostPetDetails).forEach((key) => {
                            setValue(`floating_${key}`, response.getLostPetDetails[key] || '');
                        });
                    }
                } catch (error) {
                    console.error("Error fetching pet details:", error);
                    alert("Failed to fetch pet details.");
                }
            };

            fetchPetDetails();
        }
    }, [petId, setValue]);

    const onSubmit = async (data) => {
        try {
            // Prepare the GraphQL mutation for updating pet details
            const query = `
                mutation UpdateLostPet($id: ID!, $input: LostPetUpdateInput!) {
                    updateLostPet(id: $id, input: $input) {
                        _id
                        pet_name
                        pet_type
                        pet_breed
                        last_seen_location
                        last_seen_date
                        contact_name
                        contact_phone
                        contact_email
                        additional_info
                        pet_image
                    }
                }
            `;

            const variables = {
                id: petId,
                input: {
                    pet_name: data.floating_pet_name,
                    pet_type: data.floating_pet_type,
                    pet_breed: data.floating_pet_breed,
                    last_seen_location: data.floating_last_seen_location,
                    last_seen_date: data.floating_last_seen_date,
                    contact_name: data.floating_contact_name,
                    contact_phone: data.floating_contact_phone,
                    contact_email: data.floating_contact_email,
                    additional_info: data.floating_additional_info,
                },
            };

            // Execute the GraphQL mutation
            const response = await graphQLFetch(query, variables);

            if (!response || !response.updateLostPet) {
                throw new Error("Failed to update lost pet.");
            }

            alert("Lost pet details successfully updated.");
            navigate("/UserProfile");
        } catch (error) {
            console.error("Error updating pet details:", error);
            alert("Failed to update pet details.");
        }
    };


    if (!initialData) return <div className="pt-[12rem] pb-[2rem] mx-9 sm:mx-15">Loading...</div>;

    return (
        <div className="pt-[12rem] pb-[2rem] mx-9 sm:mx-15">
            <h1 className="flex justify-center pt-4 pb-2 text-[2rem] sm:text-[3rem] font-bold text-[#644b3c]">
                Edit Lost Pet Details
            </h1>
            <div className="max-w-3xl mx-auto">
                <p className="text-lg text-primary-dark mb-2">
                    Here you can manage your lost pet details. Please make sure to review the information before making any updates.
                </p>
            </div>
            <br />
            <form
                className="max-w-3xl mx-auto bg-white shadow-md rounded px-8 pt-8 pb-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="floating_pet_name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Pet Name
                        </label>
                        <input
                            type="text"
                            id="floating_pet_name"
                            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.floating_pet_name ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Pet name"
                            {...register("floating_pet_name", {
                                required: "Pet name is required",
                            })}
                        />
                        {errors.floating_pet_name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.floating_pet_name.message}
                            </p>
                        )}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="floating_pet_type"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Pet Type
                        </label>
                        <select
                            id="floating_pet_type"
                            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.floating_pet_type ? "border-red-500" : ""}`}
                            {...register("floating_pet_type", {
                                required: "Pet type is required",
                            })}
                        >
                            <option value="">Select Pet type</option>
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
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="floating_pet_breed"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Pet Breed
                        </label>
                        <input
                            type="text"
                            id="floating_pet_breed"
                            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.floating_pet_breed ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Pet breed"
                            {...register("floating_pet_breed", {
                                required: "Pet breed is required",
                            })}
                        />
                        {errors.floating_pet_breed && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.floating_pet_breed.message}
                            </p>
                        )}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="floating_last_seen_location"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Last Seen Location
                        </label>
                        <input
                            type="text"
                            id="floating_last_seen_location"
                            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.floating_last_seen_location ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Last seen location"
                            {...register("floating_last_seen_location", {
                                required: "Last seen location is required",
                            })}
                        />
                        {errors.floating_last_seen_location && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.floating_last_seen_location.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="floating_last_seen_date"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Last Seen Date
                        </label>
                        <input
                            type="date"
                            id="floating_last_seen_date"
                            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.floating_last_seen_date ? "border-red-500" : "border-gray-300"}`}
                            {...register("floating_last_seen_date", {
                                required: "Last seen date is required",
                            })}
                        />
                        {errors.floating_last_seen_date && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.floating_last_seen_date.message}
                            </p>
                        )}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="floating_contact_name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contact Name
                        </label>
                        <input
                            type="text"
                            id="floating_contact_name"
                            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.floating_contact_name ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Contact name"
                            {...register("floating_contact_name", {
                                required: "Contact name is required",
                            })}
                        />
                        {errors.floating_contact_name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.floating_contact_name.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="floating_contact_phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contact Phone
                        </label>
                        <input
                            type="text"
                            id="floating_contact_phone"
                            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.floating_contact_phone ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Contact phone"
                            {...register("floating_contact_phone", {
                                required: "Contact phone is required",
                            })}
                        />
                        {errors.floating_contact_phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.floating_contact_phone.message}
                            </p>
                        )}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="floating_contact_email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contact Email
                        </label>
                        <input
                            type="email"
                            id="floating_contact_email"
                            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.floating_contact_email ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Contact email"
                            {...register("floating_contact_email", {
                                required: "Contact email is required",
                            })}
                        />
                        {errors.floating_contact_email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.floating_contact_email.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label
                        htmlFor="floating_additional_info"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Additional Info
                    </label>
                    <textarea
                        id="floating_additional_info"
                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.floating_additional_info ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Additional information"
                        rows="4"
                        {...register("floating_additional_info")}
                    />
                    {errors.floating_additional_info && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.floating_additional_info.message}
                        </p>
                    )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label
                        htmlFor="floating_pet_image"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Pet Image
                    </label>
                    <input
                        type="file"
                        id="floating_pet_image"
                        className="w-full mt-2"
                        {...register("floating_pet_image")}
                        multiple
                    />
                </div>
                <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border bg-primary-brown px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500"
                >
                    Update LostPet
                </button>
                <Link
                    to={`/UserProfile`}
                    className="inline-block shrink-0 rounded-md border bg-primary-light-brown mx-2 px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500"
                >
                    Cancel
                </Link>


            </form>
        </div>
    );
};

export default LostPetFormEdit;
