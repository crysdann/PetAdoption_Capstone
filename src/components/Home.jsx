import React from "react";
import Homeimage from "../assets/images/test.jpg"
import Homeasideimg from "../assets/images/home_main.jpg"
import Homeimages from "../assets/images/home_images.jpg"

const Home = () => {
  return (
    <div className="w-full pt-[146px] pb-[2rem]">
      <section style={{ backgroundImage: `url(${Homeimage})` }}
        className="relative bg-cover bg-center bg-no-repeat object-cover grayscale" >
        <div className="absolute inset-0 sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l" ></div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-white text-shadows">
              ADOPT YOUR NEW FRIEND</h1>
            <p className="mt-4 max-w-lg sm:text-xl/relaxed text-white text-shadows">
              Adopting one pet won't change the world, but for that pet, the world will change
            </p>
          </div>
        </div>
        <div>
        </div>
      </section>
      <div>

      {/* <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit
            </h2>

            <p className="hidden text-gray-500 md:mt-4 md:block">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam
              sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
              quisque ut interdum tincidunt duis.
            </p>

            <div className="mt-4 md:mt-8">
              <a
                href="#"
                className="inline-block rounded bg-primary-brown px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </div>

        <img alt="" src={Homeasideimg} className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
        />
      </section> */}

<section className="overflow-hidden bg-gray-50 q">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <img
          alt=""
          src={Homeasideimg}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="lg:py-24">
        <h1 className="text-3xl font-bold sm:text-4xl">OUR MISSION</h1>
        <p className="mt-4 max-w-lg  sm:text-xl/relaxed">
          "We believe every pet deserves a loving home and every person deserves the joy of companionship.
          To provide loving homes for every companion animal in need, promoting responsible pet ownership,
           and advocating for the well-being of all animals." </p>
        {/* <p>  
         Explore our site to find your perfect furry friend and start creating beautiful memories today.
        </p> */}

        <a href="#" className="mt-8 inline-block rounded bg-primary-brown px-12 py-3 text-sm font-medium text-white focus:outline-none focus:ring">
          Get Started Today
        </a>
      </div>
    </div>
  </div>
</section>
      <h3 className="font-bold flex justify-center items-center p-8 sm:text-4xl">HOW IT WORKS</h3>
      <div className="container mt-8 flex justify-center w-full">
        <div className="flex flex-wrap justify-center w-full gap-7 sm:w-11/12"> 
          <div className="w-full sm:w-1/2 md:w-1/4 p-2 block p-8 border-solid border-2 border-brown-50 shadow-lg font-dancing-script">
            <p className="mt-1 font-bold text-3xl pl-8">Find Your Pet</p>  
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 p-2 block p-8 border-solid border-2 border-brown-50 shadow-lg font-dancing-script">
            <p className="mt-1 font-bold text-3xl pl-8">Know Your Pet</p>  
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 p-2 block p-8 border-solid border-2 border-brown-50 shadow-lg font-dancing-script">
            <p className="mt-1 font-bold text-3xl pl-8">Take Your Pet</p>  
          </div>
        </div>
      </div>

      <section>
  <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
      <div className="relative z-10 lg:py-16">
        <div className="relative h-64 sm:h-80 lg:h-full">
          <img alt="home image man with pet"
            src={Homeimages} className="absolute inset-0 h-full w-full object-cover"/>
        </div>
      </div>

      <div className="relative flex items-center bg-gray-100">
        <span
          className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"
        ></span>

        <div className="p-8 sm:p-16 lg:p-24">
          <h1 className="text-3xl font-bold sm:text-4xl">
            OUR VISION
          </h1>

          <p className="mt-4 max-w-lg  sm:text-xl/relaxed">
          A world where every pet has a safe and loving home, where shelters are empty, and where every community 
          values and respects the bond between humans and animals. Through education, outreach, and compassionate care,
          we strive to create a future where no animal is left behind and where every heart finds its perfect furry 
          companion.
          </p>

          <a href="#"
            className="mt-8 inline-block rounded border bg-primary-brown px-12 py-3 text-sm font-medium text-white focus:outline-none focus:ring active:text-indigo-500">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
    </div>
  );
};

export default Home;
