import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar({ handleSearch }) {
  const [input, setInput] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className={styles.navbar__wrapper}>
      <div className={styles.navbar__search}>
        <input
          type="text"
          onChange={handleChange}
          value={input}
          className={styles.navbar__input}
        />
        <button
          onClick={() => [handleSearch(input), setInput("")]}
          className={styles.navbar__btn}
        >
          Search
        </button>
      </div>
      <nav>
        <ul className={styles.navbar__list}>
          <li className={styles["navbar__list-item"]}>
            <a href="#">Sign Up</a>
          </li>
          <li className={styles["navbar__list-item"]}>
            <a href="#">Login</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
