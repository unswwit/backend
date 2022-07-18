import React, { useEffect, useState } from "react";
import PageHeader from "../components/header";
import styles from "../styles/joinUs.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slideshow from "../components/QuotesSlideshow.js";
import NewsletterSection from "../components/NewsletterSection";
import { BootstrapTooltip } from "../components/BootstrapTooltip";
import LoadingScreen from "../components/LoadingScreen";
import { memberQuotes } from "../data/joinData";
import { socials } from "../data/joinData";
import SimpleAccordion from "../components/joinUsAccordion";
import PortfolioGrid from "../components/joinUsGrid";
import Image from "next/image";

const JoinUs = () => {
  const [hideSpinner, setHideSpinner] = useState(false);
  const [openNewsletter, setOpenNewsletter] = useState(false);
  const [sourceLoading, setSourceLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);

  // close newsletter
  const callbackModal = () => {
    setOpenNewsletter(false);
  };

  // start at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setSourceLoading(false);
    }, 10000);
  }, []);

  return (
    <div>
      {sourceLoading && !hideSpinner && headerLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <PageHeader
            imgUrl="/headers/join-header-2.jpg"
            title="Join Us"
            imageLoading={setHeaderLoading}
          />
          {/* Start of connect with us */}
          <h2 className={styles.header}>Connect with us</h2>
          <div className={styles.joinUsBody}>
            <div className={styles.joinUsRight}>
              <div className={styles.joinButtons}>
                {Object.keys(socials).map((social, index) => {
                  return (
                    <BootstrapTooltip
                      key={social}
                      title={
                        <>
                          <div className="tooltipTitle">{social}</div>
                        </>
                      }
                    >
                      <a
                        className={styles.joinLink}
                        key={index}
                        href={socials[social][0]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={`/icons/${socials[social][1]}`}
                          alt={social}
                          height="250px"
                          width="250px"
                        />
                      </a>
                    </BootstrapTooltip>
                  );
                })}
              </div>
            </div>
            <div className={styles.googleMap}>
              {!hideSpinner ? (
                <CircularProgress
                  variant="indeterminate"
                  size={50}
                  thickness={5}
                  id={styles.joinLoading}
                />
              ) : null}
              <iframe
                onLoad={() => setHideSpinner(true)}
                title="google-maps"
                width="100%"
                height="390"
                frameBorder="0"
                className={styles.gmapColour}
                scrolling="no"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=UNSW%20Sydney%20High%20St%20Kensington,%20NSW%202052%20Australia+(UNSW%20Sydney)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              />
            </div>
          </div>
          {/* End of connect with us section */}

          {/* Start of how to join section */}
          <h2 className={styles.section}>How to join</h2>
          <div className={styles.descriptionHowto}>
            <strong>Interact through social media</strong>
            <p>
              Stay up to date with our latest events, blogs, podcasts, videos
              and streams through connecting with us through our social media
              and&nbsp;
              <a
                href="https://www.facebook.com/groups/unswwit/"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook group
              </a>
              .
            </p>
            <strong>Become a LinkedIn Alumni</strong>
            <p>
              For past and current executives, subcommittee members or speakers
              at WIT events, our&nbsp;
              <a
                href="https://www.linkedin.com/groups/12373268/"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Alumni network
              </a>
              &nbsp;is available to provide advice and resources for our team to
              convey through our platform. In joining our Alumni Network, you
              will also be notified of new opportunities that will enable you to
              engage with our members.
            </p>
            <strong>Subcommittee Recruitment</strong>
            <p>
              Subcommittee recruitment is open at the beginning of UNSW’s first
              academic term, in February each year, via our&nbsp;
              <a
                href="https://www.facebook.com/unsw.wit/"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook page
              </a>
              . To join, search for our subcommittee Facebook event and fill in
              the registration form attached to the event. The application
              closing period varies from year to year.
            </p>
          </div>
          {/* End of how to join section */}

          {/* Start of what to join section */}
          <h2 className={styles.section}>What to join</h2>
          <div className={styles.descriptionHowto}>
            <p>
              WIT has several specialised portfolios that you can join as a
              subcommittee member. Each portfolio is led by our executives.
              Click one of the portfolios to find out more about the portfolio.
            </p>
          </div>
          {/* End of what to join section */}

          {/* Start of quotes */}
          {
            <div className={styles.carousel}>
              <Slideshow
                height={600}
                data={memberQuotes}
                customSlideStyle={styles.slide}
                customQuoteStyle={styles.quoteContainer}
              />
            </div>
          }
          {/* End of quotes */}

          {/* Start of portfolios grid */}
          <PortfolioGrid />
          {/* End of portfolios grid */}

          {/* Start FAQ section */}
          <h2 className={styles.section}>FAQ</h2>
          <SimpleAccordion />
          {/* End of FAQ section */}

          {/* Start of newsletter */}
          <NewsletterSection
            setOpen={setOpenNewsletter}
            open={openNewsletter}
            callbackModal={callbackModal}
            fade={false}
          />
          {/* End of Newsletter */}
        </>
      )}
    </div>
  );
};

export default JoinUs;
