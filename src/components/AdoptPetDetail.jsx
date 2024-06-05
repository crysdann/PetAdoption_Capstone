import petimage from "../assets/images/pet2.jpg";
import pet3 from "../assets/images/dog1.jpg";
import pet2 from "../assets/images/dog2.jpg";
import genderImg from "../assets/images/gender.png";
import heartImg from "../assets/images/heart.png";
import calendarImg from "../assets/images/calendar.png";
import pawImg from "../assets/images/pawprint.png";
import locationImg from "../assets/images/location.png";
import vaccinationImg from "../assets/images/vaccine.png";

export function PetCarousel() {
  return (
    <div className="carousel  carousel-center rounded-box  h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[30rem] max-w-screen-lg">
      <div className="carousel-item">
        <img src={petimage} alt="petImg" />
      </div>
      <div className="carousel-item">
        <img src={pet2} alt="petImg" />
      </div>
      <div className="carousel-item">
        <img src={pet3} alt="petImg" />
      </div>
      <div className="carousel-item">
        <img src={pet2} alt="petImg" />
      </div>
      <div className="carousel-item">
        <img src={petimage} alt="petImg" />
      </div>
    </div>
  );
}

export function PetInfo() {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
          <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
            <h2 className="text-3xl font-bold sm:text-4xl">Jagger</h2>

            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vero
              aliquid sint distinctio iure ipsum cupiditate? Quis, odit
              assumenda? Deleniti quasi inventore, libero reiciendis minima
              aliquid tempora. Obcaecati, autem. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Aut vero aliquid sint distinctio
              iure ipsum cupiditate? Quis, odit assumenda? Deleniti quasi
              inventore, libero reiciendis minima aliquid tempora. Obcaecati,
              autem.
            </p>

            <p className="mt-4 text-gray-600">
              <span className="text-md font-bold sm:text-lg text-black">
                Health:{" "}
              </span>{" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vero
              aliquid sint distinctio iure ipsum cupiditate? Quis, odit
              assumenda? Deleniti quasi inventore, libero reiciendis minima
              aliquid tempora. Obcaecati, autem.
            </p>

            <p className="mt-4 text-gray-600">
              <span className="text-md font-bold sm:text-lg text-black">
                Behaviour:{" "}
              </span>{" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vero
              aliquid sint distinctio iure ipsum cupiditate? Quis, odit
              assumenda? Deleniti quasi inventore, libero reiciendis minima
              aliquid tempora. Obcaecati, autem.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <img className="h-6 w-6" src={heartImg} alt="icon_image"></img>
              </span>

              <h3 className="mt-2 font-bold ">Pet type</h3>

              <p className="sm:mt-1 sm:block sm:text-md sm:text-gray-600">
                Dog
              </p>
            </div>

            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <img className="h-6 w-6" src={genderImg} alt="icon_image"></img>
              </span>

              <h3 className="mt-2 font-bold ">Gender</h3>

              <p className="sm:mt-1 sm:block sm:text-md sm:text-gray-600">
                Male
              </p>
            </div>

            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <img className="h-6 w-6" src={calendarImg} alt="icon_image"></img>
              </span>

              <h3 className="mt-2 font-bold ">Age</h3>

              <p className="sm:mt-1 sm:block sm:text-md sm:text-gray-600">
                3 years old
              </p>
            </div>

            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <img className="h-6 w-6" src={pawImg} alt="icon_image"></img>
              </span>

              <h3 className="mt-2 font-bold ">Breed</h3>

              <p className="sm:mt-1 sm:block sm:text-md sm:text-gray-600">
                American Cocker Spaniel
              </p>
            </div>

            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <img className="h-6 w-6" src={locationImg} alt="icon_image"></img>
              </span>

              <h3 className="mt-2 font-bold ">Location</h3>

              <p className="sm:mt-1 sm:block sm:text-md sm:text-gray-600">
                Waterloo
              </p>
            </div>

            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <img className="h-6 w-6" src={vaccinationImg} alt="icon_image"></img>
              </span>

              <h3 className="mt-2 font-bold ">Vaccination</h3>

              <p className="sm:mt-1 sm:block sm:text-md sm:text-gray-600">
                Up to date
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PetDetails = () => {
  return (
    <div className="pt-[12rem] pb-[2rem] mx-9 sm:mx-15 flex flex-col items-center">
      <PetCarousel />
      <PetInfo />
    </div>
  );
};

export default PetDetails;
