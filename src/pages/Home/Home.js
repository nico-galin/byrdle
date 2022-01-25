import React from "react";
import WordGrid from "../../components/WordGrid/WordGrid";
import styles from "./Home.module.scss";

const Home = () => {
    return (
      <div className={styles.container}>
          <WordGrid word={"hello"} />
      </div>
    );
  }

  export default Home;