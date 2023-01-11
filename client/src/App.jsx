import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

// TODO: Remove this!

const ISBNID = "0894808532";

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

  const [input, setInput] = useState("");

  async function handleSearch(e) {
    const url1 = await fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${ISBNID}&jscmd=data&format=json`
    );
    const res = await url1.json();

    const data = await res;

    const ISBN = data[`ISBN:${ISBNID}`];

    setBookInfo({
      ...bookInfo,
      title: ISBN.title,
      publishedDate: ISBN.publish_date,
      cover: ISBN.cover.medium,
      author: ISBN.authors[0].name,
      numberOfPages: ISBN.number_of_pages,
      isbnNumber: ISBNID,
      subtitle: ISBN.subtitle,
    });

    setInput("");
    console.log(bookInfo);
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  // TODO: Remove this!
  handleSearch();

  return (
    <div className="App">
      <Card
        title={bookInfo.title}
        author={bookInfo.author}
        publishedDate={bookInfo.publishedDate}
        cover={bookInfo.cover}
        numberOfPages={bookInfo.numberOfPages}
        isbnNumber={bookInfo.isbnNumber}
        subtitle={bookInfo.subtitle}
      />
      {/* <input type="text" onChange={handleChange} value={input} /> */}
      {/* <button onClick={handleSearch}>Search</button> */}
    </div>
  );
}

export default App;
