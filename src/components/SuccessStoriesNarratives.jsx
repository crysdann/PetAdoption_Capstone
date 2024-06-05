import React from "react";
import successstoriesnarrativesimg from "../assets/images/successstoriesnarratives.png";
import ss1 from "../assets/images/ss1.jpg";
import ss2 from "../assets/images/ss2.jpg";
import ss3 from "../assets/images/ss3.jpg";

const SuccessStoriesNarratives = () => {
  return (
    <div className="w-full pt-[12rem]">
      <div className="w-full h-full flex flex-col justify-center items-center pl-[3rem] pr-[3rem] sm:pl-[4rem] sm:pr-[4rem]">
        <h1 className="px-4 text-5xl sm:text-5xl md:text-6xl font-bold font-dancing-script text-[#5c4e51]">
          Russel
        </h1>
        <div className="md:h-[500px] md:w-[90%] ">
          <img
            src={successstoriesnarrativesimg}
            alt="successstoriesnarratives"
            className="h-[100%] mt-[2rem] w-full object-cover border-2 p-[10px]"></img>
        </div>
        <h3 className="px-4 pt-[3rem] text-[18px] pb-[3rem] text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </h3>
      </div>
      <div className="flex bg-primary-white  flex-col justify-center items-center p-[4rem]">
        <h2 className="text-[#5c4e51]">Related stories</h2>
        <div className="flex flex-col gap-6 mt-[3rem] sm:flex-row">
          <div className="shadow-lg transition transition-transform duration-300 hover:scale-105">
            <div className="bg-white flex flex-col justify-center items-center">
              <img src={ss1} alt="relatedarticle1" />
              <p className="p-6 font-dancing-script text-[#5c4e51] text-4xl">
                Cheddar
              </p>
            </div>
          </div>
          <div className="shadow-lg transition transition-transform duration-300 hover:scale-105">
            <div className="bg-white flex flex-col justify-center items-center">
              <img src={ss2} alt="relatedarticle2" />
              <p className="p-6 font-dancing-script text-[#5c4e51] text-4xl">
                Whiskers
              </p>
            </div>
          </div>
          <div className="shadow-lg transition transition-transform duration-300 hover:scale-105">
            <div className="bg-white flex flex-col justify-center items-center">
              <img src={ss3} alt="relatedarticle3" />
              <p className="p-6 font-dancing-script text-[#5c4e51] text-4xl">
                Buttercup
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesNarratives;
