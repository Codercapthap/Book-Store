import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Book } from "../services/Book.service";
import { Category as CategoryService } from "../services/Category.service";
import { useParams } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet";

function Category() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sorting, setSorting] = useState("");
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    CategoryService.getSubCategoryById(id).then((category) => {
      setCategory(category);
      Book.getBookByCategoryId(id).then((res) => {
        if (res.totalPages > 0) {
          setTotalPage(res.totalPages);
        }
        setBooks(res);
        setIsLoading(false);
      });
    });
  }, [id]);

  useEffect(() => {
    if (category) {
      setIsLoading(true);
      Book.getBookByCategoryId(category.id, sorting, currentPage - 1).then(
        (res) => {
          setBooks(res);
          setIsLoading(false);
        }
      );
    }
  }, [currentPage]);

  const sortFunction = (selected) => {
    setIsLoading(true);
    setCurrentPage(1);
    setSorting(selected);
    Book.getBookByCategoryId(category.id, selected).then((res) => {
      setBooks(res);
      setIsLoading(false);
    });
  };
  return (
    <div>
      <Header></Header>
      <div className="container bg-white rounded-md p-4 mx-auto my-4">
        {isLoading ? (
          <div className="opacity-30 w-full flex justify-center items-center my-4">
            <Spinner className="h-16 w-16 " />
          </div>
        ) : (
          <>
            <Helmet>
              <title>{category.name} - Book Store</title>
            </Helmet>
            <div className="pb-4 border-b border-b-gray-300 mb-2">
              <div className="mt-2 flex w-1/4 items-center">
                <span className="w-1/5 mr-4">Sort by: </span>
                <div className="w-1/2">
                  <Select
                    size="sm"
                    name=""
                    id="sort"
                    label="Sort by"
                    onChange={sortFunction}
                  >
                    <Option value="priced">Price (descending)</Option>
                    <Option value="pricea">Price (ascending)</Option>
                    <Option value="titled">Title (descending)</Option>
                    <Option value="titlea">Title (ascending)</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <div className="px-6 py-2 grid grid-cols-6 gap-y-12">
                {books.content.map((book) => {
                  return <Card book={book}></Card>;
                })}
              </div>
            </div>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={(newPage) => {
                setCurrentPage(newPage);
              }}
              totalPages={totalPage}
            ></Pagination>
          </>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Category;
