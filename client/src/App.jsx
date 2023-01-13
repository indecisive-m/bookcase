import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

// TODO: Remove this!

// const ISBNID = "000647988X";

function App() {
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

  const [input, setInput] = useState("");

  async function handleSearch(e) {
    const url1 = await fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${input}&jscmd=data&format=json`
    );
    const res = await url1.json();

    const data = await res;

    const isbn = data[`ISBN:${input}`];

    setBookInfo({
      ...bookInfo,
      cover: isbn.cover.medium,
      title: isbn.title,
      publishedDate: isbn.publish_date,
      author: isbn.authors[0].name,
      numberOfPages: isbn.number_of_pages,
      isbnNumber: input,
      subtitle: isbn.subtitle,
    });

    setInput("");
    handleCardModal();
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleCardModal() {
    setShowCard(true);
  }
  // TODO: Remove this!
  // handleSearch();

  return (
    <div className="App">
      {showCard && (
        <Card
          title={bookInfo.title}
          author={bookInfo.author}
          publishedDate={bookInfo.publishedDate}
          cover={bookInfo.cover}
          numberOfPages={bookInfo.numberOfPages}
          isbnNumber={bookInfo.isbnNumber}
          subtitle={bookInfo.subtitle}
        />
      )}
      <input type="text" onChange={handleChange} value={input} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default App;
