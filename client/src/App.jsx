import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import ListCard from "./components/ListCard";

function App() {
  let storageArray = [];

  const [bookInfo, setBookInfo] = useState({
    title: "",
    publishedDate: "",
    cover: "",
    author: "",
    numberOfPages: "",
    isbnNumber: "",
    subtitle: "",
  });

  const [showCard, setShowCard] = useState(false);
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem("books"));
    if (getLocalStorage) {
      getLocalStorage.forEach((book) => {
        setSavedBooks(() => {
          return [...book];
        });
      });
    } else return;
  }, []);

  async function handleSearch(value) {
    const url1 = await fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${value}&jscmd=data&format=json`
    );
    const res = await url1.json();
    const data = await res;
    const isbn = data[`ISBN:${value}`];

    setBookInfo({
      ...bookInfo,
      cover: isbn.cover.medium,
      title: isbn.title,
      publishedDate: isbn.publish_date,
      author: isbn.authors[0].name,
      numberOfPages: isbn.number_of_pages,
      isbnNumber: value,
      subtitle: isbn.subtitle,
    });

    handleCardModal();
  }

  function handleCardModal() {
    setShowCard((card) => !card);
  }

  function handleAddCard() {
    if (
      savedBooks.filter((book) => book.isbnNumber === bookInfo.isbnNumber)
        .length === 0 ||
      savedBooks.length === 0
    ) {
      setSavedBooks((prevBooks) => {
        return [...prevBooks, bookInfo];
      });

      console.log("putting it in the list");
    } else {
      console.log("This book is already included in this list");
    }

    handleCardModal();
  }

  useEffect(() => {
    if (savedBooks.length < 1) {
      return;
    }
    storageArray.push(savedBooks);
    localStorage.setItem("books", JSON.stringify(storageArray));
  }, [savedBooks]);

  const bookCard = savedBooks.map((item) => {
    if (savedBooks.length !== 0) {
      return (
        <ListCard
          key={item.isbnNumber}
          title={item.title}
          author={item.author}
          publishedDate={item.publishedDate}
          cover={item.cover}
          numberOfPages={item.numberOfPages}
          isbnNumber={item.isbnNumber}
          subtitle={item.subtitle}
        />
      );
    }
  });

  return (
    <div className="App">
      <Navbar handleSearch={handleSearch} />
      {showCard && (
        <Card
          title={bookInfo.title}
          author={bookInfo.author}
          publishedDate={bookInfo.publishedDate}
          cover={bookInfo.cover}
          numberOfPages={bookInfo.numberOfPages}
          isbnNumber={bookInfo.isbnNumber}
          subtitle={bookInfo.subtitle}
          handleAddCard={handleAddCard}
        />
      )}
      <div className="book-card__container">{bookCard}</div>
    </div>
  );
}

export default App;
