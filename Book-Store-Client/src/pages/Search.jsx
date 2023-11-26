import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Select, Option } from "@material-tailwind/react";
import { Book } from "../services/Book.service";
import Card from "../components/Card";
import { Spinner } from "@material-tailwind/react";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet";

function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sorting, setSorting] = useState("");
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    Book.getAllBook(query).then((res) => {
      console.log(res);
      if (res.totalPages > 0) {
        setTotalPage(res.totalPages);
      }
      setBooks(res);
      setIsLoading(false);
    });
  }, [query]);

  useEffect(() => {
    setIsLoading(true);
    Book.getAllBook(query, sorting, currentPage - 1).then((res) => {
      setBooks(res);
      setIsLoading(false);
    });
  }, [currentPage]);

  const sortFunction = (selected) => {
    setIsLoading(true);
    setCurrentPage(1);
    setSorting(selected);
    Book.getAllBook(query, selected).then((res) => {
      setBooks(res);
      setIsLoading(false);
    });
  };

  return (
    <div>
      <Helmet>
        <title>
          {`${query} (${books.totalElements}) results - Book Store`}
        </title>
      </Helmet>
      <Header></Header>
      <div className="container bg-white rounded-md p-4 mx-auto my-4">
        {isLoading ? (
          <div className="opacity-30 w-full flex justify-center items-center my-4">
            <Spinner className="h-16 w-16 " />
          </div>
        ) : (
          <>
            <div className="pb-4 border-b border-b-gray-300 mb-2">
              <p className="uppercase text-xl text-gray-700">
                Search result for{" "}
                <span className="text-black">
                  {query} ({books.totalElements})
                </span>
              </p>
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

export default Search;
