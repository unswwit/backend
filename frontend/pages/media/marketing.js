import React, { useEffect, useState } from "react";
import styles from "../../styles/Marketing.module.css";
import PageHeader from "../../components/Header";
import Chip from "@material-ui/core/Chip";
import Initiative from "../../components/Initiative";
import CircularProgress from "@material-ui/core/CircularProgress";
import Timeline from "../../components/Timeline";
import PaginationComp from "../../components/Pagination";
import LoadingScreen from "../../components/LoadingScreen";
import axios from "axios";
import humps from "humps";
import { isMobile } from "react-device-detect";
import {
  useStyles,
  categories,
  marks,
  valueToYear,
} from "../../data/marketingData";

import useContentfulMarketingArchives from "../api/contentful-marketing-archives";
const { getMarketingArchives } = useContentfulMarketingArchives();

const MarketingContent = () => {
  const classes = useStyles();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState("2022");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [emptyCategory, setEmptyCategory] = useState(false);
  const [sourceLoading, setSourceLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);

  // set how many posts to view per page
  const postsPerPage = 8;
  // all the posts of the selected filter category
  const [selectedPosts, setSelectedPosts] = useState([]);
  // the posts displayed on the current page
  const [currentPosts, setCurrentPosts] = useState([]);
  // current page number
  const [currentPage, setCurrentPage] = useState(1);

  // set the year for the events timeline
  const handleYear = (newYear) => {
    setYear(newYear);
    setCurrentPage("All");
  };

  // get marketing archives
  // input: marketing archives data from google sheets
  // output: array of dictionaries containing marketing archives data
  const fetchMarketingArchives = async () => {
    const res = await getMarketingArchives();
    const tempContent = humps.camelizeKeys(res);
    console.log(res);
    setContent(tempContent);
    setCurrentPosts(tempContent.slice(0, postsPerPage));
    setSelectedPosts(tempContent);
    setLoading(false);
    setSourceLoading(false);
  };

  // scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
    // load marketing previews
    fetchMarketingArchives().catch((error) =>
      // error handling
      console.error(error)
    );
  }, []);


  // marketing archive message
  useEffect(() => {
    // no posts
    if (currentPosts.length === 0 && loading === false) {
      setEmptyCategory(true);
      console.error = () => {};
    } else {
      setEmptyCategory(false);
    }
  }, [currentPosts, loading]);

  // filter content by selected category
  const filterContent = (selectedCategory) => {
    const filteredContent = content.filter(
      (picture) =>
        selectedCategory === "All" ||
        picture.category.includes(selectedCategory)
    );
    setSelectedPosts(filteredContent);
    setCurrentPosts(filteredContent.slice(0, postsPerPage));
    setCurrentPage(1);
  };

  // called when pagination item clicked to slice the correct amount of posts for viewing
  const paginate = (pageNumber) => {
    setCurrentPosts(
      selectedPosts.slice(
        (pageNumber - 1) * postsPerPage,
        pageNumber * postsPerPage
      )
    );
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {sourceLoading && headerLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Cover Photo */}
          <PageHeader
            imgUrl="/headers/marketing-header.jpg"
            title="Marketing"
            imageLoading={setHeaderLoading}
          />
          {/*End of Header*/}

          <div id={styles.parent}>
            {/*List of initiatives*/}
            <div className={styles.initiatives}>
              {/* Start of categories */}
              <div className={styles.contentCategories}>
                {Object.keys(categories)
                  .sort()
                  .map((category) => {
                    const chipColour =
                      selectedCategory === categories[category]
                        ? "#e85f5c"
                        : "#7F7F7F";
                    return (
                      <Chip
                        key={category}
                        size="medium"
                        label={category}
                        className={classes.chip}
                        style={{
                          backgroundColor: chipColour,
                        }}
                        onClick={() => {
                          setSelectedCategory(categories[category]);
                          filterContent(categories[category]);
                        }}
                      />
                    );
                  })}
              </div>

              <div>
                {/* Timeline */}
                <Timeline
                  margin={"2%"}
                  page={"marketing"}
                  step={50}
                  valueToYear={valueToYear}
                  marks={marks}
                  updateYear={handleYear}
                />
              </div>

              <div>
                {emptyCategory === true && (
                  <p id={styles.emptyMessage}>
                    Keep a lookout for more marketing posts!
                  </p>
                )}
              </div>

              <div id={styles.contentLoadingContainer}>
                {loading && (
                  <CircularProgress
                    variant="indeterminate"
                    size={50}
                    thickness={5}
                    id={styles.contentLoading}
                  />
                )}                                        j
              </div>

              {/*Image collage*/}
              {!isMobile && !loading && (
                <div id={styles.orderedlist}>
                  <div className={styles.grid} id={styles.content}>
                    {currentPosts.map((content, index) => {
                      return (
                        <Initiative
                          key={index}
                          fb={content.link}
                          imgUrl={content.imgUrl}
                          alt={content.label}
                          date={content.date}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              {isMobile && !loading && (
                <div id={styles.orderedlist}>
                  <div className={styles.grid} id={styles.content}>
                    {selectedPosts.map((content, index) => {
                      return (
                        <Initiative
                          key={index}
                          fb={content.link}
                          imgUrl={content.imgUrl}
                          alt={content.label}
                          date={content.date}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            {!isMobile && (
              <PaginationComp
                totalPages={Math.ceil(selectedPosts.length / postsPerPage)}
                paginate={paginate}
                page={currentPage}
                size="large"
              />
            )}
            {/*End of Initiatives*/}
          </div>
        </>
      )}
    </div>
  );
};
export default MarketingContent;
