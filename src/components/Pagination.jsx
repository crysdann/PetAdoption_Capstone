import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

function Items({ currentItems }) {
  console.log(`Fetched stories in pagination ${JSON.stringify(currentItems)}`);
  // console.log(`PetName: ${JSON.stringify(currentItems[petName])}`);
  return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
          <div
            className="rounded-xl relative h-[130px] md:h-[155px]  lg:custom-grid-item  lg:h-[200px]"
            key={index}>
            <div className="bg-white shadow-md text-[#5e5e5b] grid grid-cols-4 cursor-pointer transform transition-transform duration-300 hover:scale-105 h-[100%]">
              <div className="col-span-1 md:col-span-1 flex overflow-hidden">
                <img
                  src={item.petPhotoUrl}
                  alt="adoptedPets"
                  className="w-full object-cover"
                />
              </div>
              <div className="col-span-3 md:col-span-3 flex flex-col h-full overflow-hidden">
                <h2 className="flex justify-center mt-[1rem] mb-[1rem] text-primary-brown">
                  {item.petName}
                </h2>
                <p className="pl-[1rem] pr-[1rem] multi-line-ellipsis">
                  {item.description}
                </p>
                <Link
                  to={`/SuccessStoriesNarratives/${item.id}`}
                  className="flex justify-end text-primary-brown font-bold pt-[0.5rem] pr-[1rem] pb-[1rem] hover:text-rose-600">
                  view more...
                </Link>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ items, itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="pagination-ul"
        pageClassName="page-item-li"
        pageLinkClassName="page-link-a"
        previousClassName="page-item"
        nextClassName="page-item"
        breakClassName="page-item"
        activeClassName="selected"
        disabledClassName="disabled"
      />
    </>
  );
}

export default PaginatedItems;
