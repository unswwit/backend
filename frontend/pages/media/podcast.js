import React, { useState, useEffect } from "react";
import PageHeader from "../../components/header";
import Chip from "@material-ui/core/Chip";
import styles from "../../styles/Podcast.module.css";
import EpisodeTemplate from "../../components/EpisodeTemplate";
import CircularProgress from "@material-ui/core/CircularProgress";
import ScrollUpBtn from "../../components/ScrollUpBtn";
import LoadingScreen from "../../components/LoadingScreen";
import axios from "axios";
import humps from "humps";
import { useStyles, links, categories } from "../../data/podcastData";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import useContentfulPodcasts from "../api/contentful-podcast";
const { getPodcastEpisodes } = useContentfulPodcasts();

// TO UNCOMMENT WHEN REACH > 9 PODCASTS
// import PaginationComp from "../components/Pagination";

const Podcast = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [sourceLoading, setSourceLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);
  // all podcast episodes
  const [content, setContent] = useState([]);
  // currently selected category -> default to "All"
  const [selectedCategory, setSelectedCategory] = useState("All");
  // check if search + category filters result in no results
  const [emptyCategory, setEmptyCategory] = useState(false);
  // search term (user input) for podcast search bar
  const [searchTerm, setSearchTerm] = useState("");
  // all the posts of the selected filter category
  const [selectedPosts, setSelectedPosts] = useState([]);

  // FOR PAGINATION
  // the posts displayed on the current page
  // const [currentPosts, setCurrentPosts] = useState([]);
  // set how many posts to view per page
  // const postsPerPage = 9;

  // get podcasts
  // input: podcasts data from google sheets
  // output: array of dictionaries containing podcasts data
  const fetchPodcastEpisodes = async () => {
    const res = await getPodcastEpisodes();
    const allEpisodes = humps.camelizeKeys(res);
    setContent(allEpisodes);
    setSelectedPosts(allEpisodes);
    setLoading(false);
    setSourceLoading(false);
  };

  useEffect(() => {
    // start at the top of the page
    window.scrollTo(0, 0);

    // load podcast episode previews
    fetchPodcastEpisodes().catch((error) =>
      // error handling
      console.error(error)
    );
  }, []);

  useEffect(() => {
    // if no posts, setEmptyCategory to true
    if (selectedPosts.length === 0 && loading === false) {
      setEmptyCategory(true);
      console.error = () => {};
    } else {
      setEmptyCategory(false);
    }
  }, [selectedPosts, loading]);

  // filter content by selected category + searchTerm
  const filterContent = (selectedCategory, searchTerm) => {
    const filteredContent = content.filter(
      (picture) =>
        selectedCategory === "All" ||
        picture.category.includes(selectedCategory)
    );
    searchPodcasts(filteredContent, searchTerm);
  };

  // filter category content by search filter in heading, subheading or author
  const searchPodcasts = (filteredContent, searchTerm) => {
    const searchResults = filteredContent.filter((episode) => {
      if (
        searchTerm === "" ||
        episode.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
    // only required for pagination
    // setCurrentPosts(searchResults);
    setSelectedPosts(searchResults);
  };

  // called when pagination item clicked to slice the correct amount of posts for viewing
  // const paginate = (pageNumber) => {
  //   setCurrentPosts(episodes.slice((pageNumber - 1) * postsPerPage, pageNumber * postsPerPage));
  // }

  return (
    <div>
      {sourceLoading && headerLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Cover Photo */}
          <PageHeader
            headerLoading={setHeaderLoading}
            imgUrl="/headers/podcast-header.jpg"
            title="Podcast"
          />
          <div id={styles.podcastIntroduction}>
            <div className={styles.logoContainer}>
              <div className={styles.podcastLogo}>
                <Image
                  src="/podcast-logos/talk-WIT-us-logo.png"
                  alt="Talk WIT Us logo"
                  height="250px"
                  width="250px"
                  objectFit={"contain"}
                />
              </div>
            </div>
            <div id={styles.introDescription}>
              <h2 id={styles.heading}>Talk WIT Us</h2>
              <p>
                Join us each month as we talk all about tech, uni, and life,
                featuring our wonderful WIT team and some special guests!
              </p>

              <div id={styles.contentLoadingContainer}>
                {loading && (
                  <CircularProgress
                    variant="indeterminate"
                    size={50}
                    thickness={5}
                    id={styles.contentLoading}
                  />
                )}
              </div>

              <div id={styles.platformContainer}>
                {Object.keys(links).map((link, index) => {
                  return (
                    <Link href={links[link][1]} key={index}>
                      <a className={styles.platformLogos}>
                        <a
                          className={styles.a}
                          key={index}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src={`/podcast-logos/${links[link][0]}`}
                            alt={link}
                            width="25px"
                            height="25px"
                          />
                        </a>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.podcastCategories}>
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
                        filterContent(categories[category], searchTerm);
                      }}
                    />
                  );
                })}
            </div>
          </div>
          {/* End of podcast categories */}

          {/* Start of search bar */}
          <div className={styles.searchBar}>
            <input
              className={styles.inputSearchBar}
              type="text"
              placeholder="Search podcasts"
              onChange={(event) => {
                setSearchTerm(event.target.value);
                filterContent(selectedCategory, event.target.value);
              }}
            />
          </div>
          {/* End of search bar */}
          <div>
            {emptyCategory === true && (
              <p id={styles.emptyMessage}>No results were found.</p>
            )}
          </div>

          <div id={styles.podcastLoadingContainer}>
            {loading && (
              <CircularProgress
                variant="indeterminate"
                size={50}
                thickness={5}
                id={styles.podcastLoading}
              />
            )}
          </div>

          <div id={styles.episodes}>
            {selectedPosts.map((episode, index) => {
              return (
                <EpisodeTemplate
                  key={index}
                  episodeNo={episode.episodeNo}
                  title={episode.title}
                  cover={episode.imgUrl}
                  date={moment(episode.date).format("MMMM DD, YYYY")}
                  description={episode.description}
                  episode={episode}
                />
              );
            })}
          </div>
          {/* TO UNCOMMENT WHEN REACH > 9 PODCASTS */}
          {/* <PaginationComp 
          totalPages={Math.ceil(currentPosts.length/postsPerPage)} 
          paginate={paginate}
        /> */}

          <ScrollUpBtn />
        </>
      )}
    </div>
  );
};
export default Podcast;
