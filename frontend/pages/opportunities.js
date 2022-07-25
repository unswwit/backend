import React, { useEffect, useState } from "react";
import PageHeader from "../components/header";
import OpportunitiesCard from "../components/OpportunitiesCard";
import styles from "../styles/opportunities.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";
import humps from "humps";

const Opportunities = () => {
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState([]);
  const [sourceLoading, setSourceLoading] = React.useState(true);
  const [headerLoading, setHeaderLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchOpportunities = async () => {
    const res = await axios.get(
      "https://wit-database.herokuapp.com/opportunities"
    );
    setLoading(false);
    setOpportunities(humps.camelizeKeys(res.data));
    setSourceLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchOpportunities().catch((error) =>
      // error handling
      console.error(error)
    );
  }, []);

  return (
    <div>
      {sourceLoading && headerLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Cover Photo */}
          <PageHeader
            imgUrl="/headers/opportunities-header.jfif"
            title="Opportunities"
            imageLoading={setHeaderLoading}
          />

          {/*start of opportunies*/}
          <div id={styles.oppLoadingContainer}>
            {loading && (
              <CircularProgress
                variant="indeterminate"
                size={50}
                thickness={5}
                id={styles.oppLoading}
              />
            )}
          </div>
          {!loading &&
            (!opportunities.length ? (
              <div className={styles.oppLookout}>
                <p className={styles.lookoutSize}>
                  Keep a lookout here for upcoming opportunities!
                </p>
              </div>
            ) : (
              <div className={styles.oppBody}>
                <p className={styles.head}>
                  Here are all the links to all current career opportunities
                  available ranging from internships to graduate roles. Bookmark
                  this page and check back regularly to be the first to know
                  about job opportunities!
                </p>
                <p className={styles.head}>
                  If you would like to make a listing, please contact us
                  at&nbsp;
                  <a
                    href="mailto:externals@unswwit.com"
                    className={styles.link}
                  >
                    externals@unswwit.com
                  </a>
                  .
                </p>
                <div className={styles.oppGridContainer}>
                  {opportunities.map((individualOpportunity, index) => {
                    return (
                      <OpportunitiesCard
                        index={index}
                        link={individualOpportunity.link}
                        img={individualOpportunity.img}
                        companyName={individualOpportunity.companyName}
                        notSponsorImg={individualOpportunity.notSponsorImg}
                        type={individualOpportunity.type}
                        position={individualOpportunity.position}
                        location={individualOpportunity.location}
                        closeDate={individualOpportunity.closeDate}
                        summary={individualOpportunity.summary}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Opportunities;
