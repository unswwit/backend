import React, { useEffect, useState } from "react";
import PageHeader from "../../components/header";
import Chip from "@material-ui/core/Chip";
import styles from "../../styles/videos.module.css";
import YouTubeSubscribe from "../../components/youtubeSubscribe";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import humps from "humps";
import PaginationComp from "../../components/Pagination";
import LoadingScreen from "../../components/LoadingScreen";
import { isMobile } from "react-device-detect";
import { useStyles, categories } from "../../data/videoData";

const Videos = (props) => {
  const classes = useStyles();

  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoNumber, setVideoNumber] = useState("0");
  const [sourceLoading, setSourceLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);
  // all videos
  const [content, setContent] = useState([]);
  // currently selected category -> default to "All"
  const [selectedCategory, setSelectedCategory] = useState("All");
  // check if search + category filters result in no results
  const [emptyCategory, setEmptyCategory] = useState(false);
  // search term (user input) for videos search bar
  const [searchTerm, setSearchTerm] = useState("");
  // all the posts of the selected filter category
  const [selectedPosts, setSelectedPosts] = useState([]);
  // the posts displayed on the current page
  const [currentPosts, setCurrentPosts] = useState([]);
  // set how many posts to view per page
  const postsPerPage = 9;
  // current page number
  const [currentPage, setCurrentPage] = useState(1);
  // set youtube theme
  const [youtubeTheme, setYoutubeTheme] = useState("full");

  // retrieve current video content
  const handleVideoNumber = (numVideos) => {
    let url = window.location.href.split("/");
    if (url[url.length - 1] && url[url.length - 1] !== "videos") {
      setVideoNumber(url[url.length - 1]);
      return url[url.length - 1];
    }
    return `${+numVideos - 1}`;
  };

  // load the page content for the current video
  const loadPageContent = (allVideos, currVideoNumber) => {
    var videoIndex = 0;
    const currVideo = allVideos.filter((video, index) => {
      if (video.videoNumber.toString() === currVideoNumber) {
        videoIndex = index;
        return true;
      } else {
        return false;
      }
    })[0];
    setVideo(currVideo);

    return videoIndex;
  };

  // load video previews
  const loadVideoPreviews = (allVideos, videoIndex) => {
    let sortedVideos = allVideos.slice(0, videoIndex).reverse();
    const additionalVideos = allVideos
      .slice(videoIndex + 1, allVideos.length)
      .reverse();
    sortedVideos = [...additionalVideos, ...sortedVideos];
    setCurrentPosts(sortedVideos.slice(0, postsPerPage));
    setCurrentPage(1);
    setSelectedPosts(sortedVideos);
    setContent(sortedVideos);
  };

  // get videos
  // input: videos data from google sheets
  // output: array of dictionaries containing videos data
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(false);

      const res = await axios.get("https://wit-database.herokuapp.com/videos");
      const allVideos = humps.camelizeKeys(res.data);
      const currVideoNumber = handleVideoNumber(allVideos.length);

      if (allVideos.length <= 0 || currVideoNumber > allVideos.length) {
        props.history.push("/404");
        return;
      }

      var videoIndex = loadPageContent(allVideos, currVideoNumber);
      loadVideoPreviews(allVideos, videoIndex);

      setLoading(false);
      setSourceLoading(false);
    };

    // Start at the top of the page
    window.scrollTo(0, 0);

    // Importing Video Details
    fetchVideos().catch((error) =>
      // error handling
      console.error(error)
    );
  }, [videoNumber, props.history]);

  useEffect(() => {
    if (currentPosts.length === 0 && loading === false) {
      setEmptyCategory(true);
      console.error = () => {};
    } else {
      setEmptyCategory(false);
    }
  }, [currentPosts, loading]);

  // filter content by selected category + searchTerm
  const filterContent = (selectedCategory, searchTerm) => {
    // filter by category
    const filteredContent = content.filter(
      (picture) =>
        selectedCategory === "All" ||
        picture.category.split(",").includes(selectedCategory)
    );
    // filter by search term
    searchVideos(filteredContent, searchTerm);
  };

  // filter category content by search filter in heading, subheading or author
  const searchVideos = (filteredContent, searchTerm) => {
    const searchResults = filteredContent.filter((video) => {
      if (
        searchTerm === "" ||
        video.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.date.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
    setSelectedPosts(searchResults);
    setCurrentPosts(searchResults.slice(0, postsPerPage));
    setCurrentPage(1);
  };

  // called when pagination item clicked to slice the correct amount of videos for viewing
  const paginate = (pageNumber) => {
    setCurrentPosts(
      selectedPosts.slice(
        (pageNumber - 1) * postsPerPage,
        pageNumber * postsPerPage
      )
    );
    setCurrentPage(pageNumber);
  };

  // change youtube theme depending on user dark/light mode
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setYoutubeTheme("dark");
    }
  }, []);

  // get video items
  const getVideos = (videos) => {
    return videos.map((video, index) => {
      return (
        <div className={styles.videoDescription} key={index}>
          <Link href={`/media/videos/${video.videoNumber}`}>
            <div
              className={styles.boxContainer}
              onClick={() => setVideoNumber(video.videoNumber)}
            >
              <div className={styles.darkOverlay} />
              <div className={styles.previewContainer}>
                <Image
                  className={styles.videoImages}
                  src={`/videos/${video.img}`}
                  alt={video.name}
                  width={"1200px"}
                  height={"628px"}
                />
              </div>
              <p className={styles.moreName}>{video.name}</p>
              <p className={styles.moreDate}>{video.date}</p>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <div>
      {sourceLoading && headerLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Cover Photo */}
          <PageHeader
            imageLoading={setHeaderLoading}
            imgUrl="/headers/videos-header.jpg"
            title="Videos"
          />
          {loading && (
            <div id={styles.videoLoadingContainer}>
              <CircularProgress
                variant="indeterminate"
                size={50}
                thickness={5}
                id={styles.videoLoading}
              />
            </div>
          )}
          {/* Start of Videos */}
          {!loading && (
            <div className={styles.videosBody}>
              <h1 className={styles.vidSubheading}>Welcome to our channel</h1>
              <div className={styles.youtubeImgContainer}>
                <Image
                  className={styles.youtubeImg}
                  src={"/videos/youtube.png"}
                  alt="Youtube"
                  layout={"fill"}
                />
              </div>
              <p className={styles.desc}>
                Join us on our YouTube channel to keep up to date with WIT’s
                latest events, training and development videos + some extra
                behind the scene clips!
              </p>
              {/* Subscribe Button */}
              <p className={styles.subscribeText}>SUBSCRIBE HERE</p>
              {/*https://www.youtube.com/channel/UCQ8PGe3P4ZuDSNCb9vCeTiw?sub_confirmation=1&feature=subscribe-embed-click*/}
              <YouTubeSubscribe
                channelid={"UCQ8PGe3P4ZuDSNCb9vCeTiw"}
                theme={youtubeTheme}
                layout={"full"}
                count={"hidden"}
                className={styles.subscribe}
              />
              {/* YouTube Embedded Video */}
              <div
                id={styles.videoContainer}
                className={styles.youtubeContainer}
              >
                <div className={styles.iframeWrapper}>
                  <div className={styles.responsiveIframe}>
                    <iframe
                      src={`https://youtube.com/embed/${video.youtubeVideoId}`}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen={true}
                      title={!video.name ? "Video" : video.name}
                      className={styles.embeddedVideo}
                    />
                  </div>
                  <p className={styles.videoName}>{video.name}</p>
                  <p className={styles.videoDate}>{video.date}</p>
                </div>
              </div>
              <p className={styles.subHeading}>More From WIT</p>
              <div className={styles.videoCategories}>
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
              {/* End of categories */}
              {/* Start of search bar */}
              <div className={styles.searchBar}>
                <input
                  className={styles.inputSearchBar}
                  type="text"
                  placeholder="Search videos"
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
              {/* See more videos */}
              <div className={styles.videoContainer}>
                {isMobile ? getVideos(selectedPosts) : getVideos(currentPosts)}
              </div>
            </div>
          )}
          {/* Pagination */}
          {!isMobile && (
            <PaginationComp
              totalPages={Math.ceil(selectedPosts.length / postsPerPage)}
              paginate={paginate}
              page={currentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Videos;
