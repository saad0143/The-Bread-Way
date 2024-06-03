import React from "react";

import { categoriesData } from "../../../static/data";
import styles from "../../../style/style";


const Categories = () => {


  return (
    <>
      <div className={`${styles.section} p-5 rounded-lg mb-12`} id="categories">
        <div className="py-6 mt-10">
          <h1 className="text-4xl font-bold text-gray-800 underline uppercase">
            Categories
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-5">
          {categoriesData &&
            categoriesData.map((category) => (
              <div
                className="w-auto h-[180px] flex flex-col items-center cursor-pointer border border-black/30 shadow-lg hover:shadow-lg"
                key={category.id}
               
              >
                <img src={category.image_Url} alt="" className="w-full h-32 object-cover" />
                <div className="flex items-center justify-center p-2">
                  <h5 className="text-xl font-semibold">{category.title}</h5>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
