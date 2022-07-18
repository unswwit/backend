import React, { useEffect, useState } from "react";
import styles from "../../styles/publications.module.css";
import PubArticle from "../../components/publications-article";
import PageHeader from "../../components/header";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen";

const Publications = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sourceLoading, setSourceLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);

  useEffect(() => {
    // start at the top of the page
    window.scrollTo(0, 0);

    // load articles
    fetchPublications().catch((error) =>
      // error handling
      console.error(error)
    );
  }, []);

  // get publications
  // input: publications data from google sheets
  // output: array of dictionaries containing publications data
  const fetchPublications = async () => {
    setLoading(false);
    const res = await axios.get(
      "https://wit-database.herokuapp.com/publications"
    );
    setArticles(res.data);
    setSourceLoading(false);
  };

  return (
    <div>
      {sourceLoading && headerLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Cover Photo */}
          <PageHeader
            imgUrl="/headers/publications-header.jpg"
            title="Publications"
            imageLoading={setHeaderLoading}
          />

          <div className={styles.publicationsBody}>
            {/*Loading Container*/}
            <div id={styles.pubLoadingContainer}>
              {loading && (
                <CircularProgress
                  variant="indeterminate"
                  size={50}
                  thickness={5}
                  id={styles.pubLoading}
                />
              )}
            </div>

            {/*Articles*/}
            {!loading &&
              Array.from({ length: 3 }, (_, i) => i + 2020)
                .reverse()
                .map((year) => {
                  return (
                    <div key={year}>
                      <h1>{year}</h1>
                      <div className={styles.row}>
                        {articles
                          .filter((article) => article.year === year)
                          .map((article, index) => (
                            <PubArticle
                              key={index}
                              imgUrl={`/publications/${year}/${article.img}`}
                              heading={article.heading}
                              date={article.date}
                              url={article.url}
                            />
                          ))}
                      </div>
                    </div>
                  );
                })}
          </div>
        </>
      )}
    </div>
  );
};

export default Publications;
