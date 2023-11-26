import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { Book as BookService } from "../../services/Book.service";
import Loading from "../../components/Loading";
import Login from "../../components/Login";
import BookReview from "../../components/BookReview";
import GeneralInformation from "./GeneralInformation";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [active, setActive] = useState("signIn");
  const navigate = useNavigate();
  useEffect(() => {
    BookService.getBookById(id)
      .then((result) => {
        if (!result) {
          navigate("/404");
        }
        setLoading(false);
        setBook(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (loading) return <Loading></Loading>;
  else
    return (
      <>
        <Helmet>
          <title>{book.title} - Book Store</title>
        </Helmet>
        <Header></Header>
        <div className="container mx-auto my-4">
          <GeneralInformation
            book={book}
            count={count}
            setCount={setCount}
          ></GeneralInformation>
          {/* details */}
          <div className="bg-white p-4 rounded-md mb-4">
            <h1 className="text-2xl font-bold mb-2">Product Introduction</h1>
            {book.description.split("<>").map((text) => {
              return (
                <>
                  <p>{text}</p> <br />
                </>
              );
            })}
            <p></p>
          </div>
          <BookReview
            id={id}
            setActive={setActive}
            setIsOpenLoginModal={setIsOpenLoginModal}
            isOpenLoginModal={isOpenLoginModal}
            book={book}
          ></BookReview>
        </div>
        <Footer></Footer>
        {/* Modal  */}
        <Login
          activeTab={active}
          isOpen={isOpenLoginModal}
          setIsOpen={(isOpen) => {
            setIsOpenLoginModal(isOpen);
          }}
          active={active}
          setActive={(active) => {
            setActive(active);
          }}
        ></Login>
      </>
    );
}

export default Book;
