import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { saleLogo } from "../../assets/images";
import { Sale as SaleService } from "../../services/Sale.service";
import { Book } from "../../services/Book.service";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Sale() {
  const [saleCategories, setSaleCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookLoading, setIsBookLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    SaleService.getCurrentSale().then((response) => {
      if (response.length > 0) {
        if (response[0].category.subCategory.length == 0) {
          setSaleCategories([response[0].category]);
          setCurrentCategory(response[0].category);
        } else {
          const updatedData = response[0].category.subCategory.map(
            ({ category: { name, image, deletedAt, subCategory, id } }) => ({
              id,
              name,
              image,
              deletedAt,
              subCategory,
            })
          );
          setSaleCategories(updatedData);
          setCurrentCategory(updatedData[0]);
        }
      }
    });
  }, []);

  useEffect(() => {
    setIsBookLoading(true);
    if (currentCategory) {
      Book.getBookByCategoryId(currentCategory.id).then((res) => {
        setCurrentBooks(res.content);
        setIsLoading(false);
        setIsBookLoading(false);
      });
    } else {
      setIsLoading(false);
      setIsBookLoading(false);
    }
  }, [currentCategory]);

  return (
    <div className="my-6 rounded-md bg-white">
      {isLoading ? (
        <div className="opacity-30 flex justify-center items-center my-4">
          <Spinner className="h-16 w-16 " />
        </div>
      ) : (
        <>
          <div className="flex items-center p-4 bg-pink-300">
            <img src={saleLogo} alt="" className="w-8 mr-4" />
            <h1 className="uppercase font-bold text-lg">Saling Books</h1>
          </div>
          {currentCategory === null ? (
            <div className="w-full flex justify-center items-center my-4">
              <span className="mb-4 text-red-700 italic  font-semibold">
                Sorry! There is no product in sale now
              </span>
            </div>
          ) : (
            <>
              <div className="px-6 py-2 border-b-gray-300 border-b">
                {saleCategories.map((saleCategory) => {
                  return (
                    <button
                      key={saleCategory.name}
                      className={
                        `px-4 py-2 rounded-md mr-4 font-semibold ` +
                        (saleCategory.name === currentCategory.name &&
                          `text-orange-400 border border-orange-400`)
                      }
                      onClick={() => {
                        setCurrentCategory(saleCategory);
                      }}
                    >
                      {saleCategory.name}
                    </button>
                  );
                })}
              </div>
              {isBookLoading ? (
                <div className="opacity-30 w-full flex justify-center items-center my-4">
                  <Spinner className="h-16 w-16 " />
                </div>
              ) : (
                <>
                  <div className="px-6 py-2 grid grid-cols-5 gap-y-12">
                    {currentBooks.slice(0, 10).map((book) => {
                      return <Card book={book}></Card>;
                    })}
                  </div>
                </>
              )}
              <div className="w-full flex justify-center py-6">
                <button
                  className="px-20 py-2 rounded-md border border-red-500 text-red-600 font-semibold"
                  onClick={() => {
                    navigate("/category/" + currentCategory.id);
                  }}
                >
                  More...
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Sale;
