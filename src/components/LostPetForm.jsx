import React from "react";
import petImage from "../assets/images/lostforms.png";

const LostPetForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log("Form Data:", data);
    };

    return (
        <section className="relative flex flex-wrap items-center pt-20 lg:pt-40 px-4 sm:px-6 sm:pt-20 lg:px-8">
            <div className="w-full lg:w-1/2 mx-auto lg:mx-0 lg:pr-8">
                <div className="mx-auto max-w-lg text-center mt-20 lg:mt-0">
                    <h1 className="text-xl font-bold sm:text-3xl">Report Lost Pet</h1>
                    <p className="mt-4 text-xl text-dark">
                        Please fill out the form below to report your lost pet. We will assist you in finding them.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mx-20 mt-10 max-w-lg space-y-3">
                    <div>
                        <label htmlFor="petName" className="sr-only">Pet Name</label>
                        <div className="mb-5">
                            <input
                                type="text"
                                name="petName"
                                className="w-full rounded-lg border-gray-200 p-2 text-xl shadow-sm"
                                placeholder="Pet Name"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="species" className="sr-only">Species</label>
                        <div className="mb-5">
                            <select
                                name="species"
                                required
                                className="w-full rounded-lg border-gray-200 p-2 text-xl shadow-sm"
                                defaultValue=""
                            >
                                <option value="">Select Species</option>
                                <option value="cat">Cat</option>
                                <option value="dog">Dog</option>
                                <option value="other">Other Pets</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="breed" className="sr-only">Breed</label>
                        <div className="mb-5">
                            <input
                                type="text"
                                name="breed"
                                className="w-full rounded-lg border-gray-200 p-2 text-xl shadow-sm"
                                placeholder="Breed"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="lastSeenLocation" className="sr-only">Last Seen Location</label>
                        <div className="mb-5">
                            <input
                                type="text"
                                name="lastSeenLocation"
                                className="w-full rounded-lg border-gray-200 p-2 text-xl shadow-sm"
                                placeholder="Last Seen Location"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="lastSeenDate" className="sr-only">Last Seen Date</label>
                        <div className="mb-5">
                            <input
                                type="date"
                                name="lastSeenDate"
                                className="w-full rounded-lg border-gray-200 p-2 text-xl shadow-sm"
                                placeholder="Last Seen Date"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="contactName" className="sr-only">ContactName</label>
                        <div className="mb-5">
                            <input
                                type="text"
                                name="contactName"
                                required
                                className="w-full rounded-lg border-gray-200 p-2 text-xl shadow-sm"
                                placeholder="ContactName"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="contactPhone" className="sr-only">ContactPhone</label>
                        <div className="mb-5">
                            <input
                                type="text"
                                name="contactPhone"
                                required
                                className="w-full rounded-lg border-gray-200 p-2 text-xl shadow-sm"
                                placeholder="ContactPhone"
                            />

                        </div>
                    </div>
                    <div>
                        <label htmlFor="contactEmail" className="sr-only">ContactEmail</label>
                        <div className="mb-5">
                            <input
                                type="text"
                                name="contactEmail"
                                className="w-full rounded-lg border-gray-200 p-2 text-xl shadow-sm"
                                placeholder="ContactEmail"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="additionalInfo" className="sr-only">Description</label>
                        <div className="mb-5">
                            <textarea
                                name="additionalInfo"
                                className="w-full rounded-lg border-gray-200 p-2 text-xl shadow-sm"
                                placeholder="Description"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="block rounded text-xl bg-primary-light-brown border-[#d2c8bc] py-3 font-medium text-primary-brown shadow hover:bg-primary-brown hover:border-[#866552] hover:text-white focus:outline-none focus:ring transition duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>


            <div className="relative h-auto w-full sm:h-64 lg:h-auto lg:w-1/2 mb-8 ">

                <img
                    alt="Lost Pet"
                    src={petImage}
                    className="absolute inset-0 h-full w-full object-cover lg:static lg:h-auto lg:w-auto"
                />
            </div>
        </section>
    );
};

export default LostPetForm;
