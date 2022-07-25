import React, { Component } from "react";
import styles from "../styles/opportunities.module.css";
import Link from "next/link";

class OpportunitiesCard extends Component {
  render() {
    return (
      <Link href={this.props.link}>
        <a
          className={styles.oppGridItems}
          key={this.props.index}
        >
          <div className={styles.darkOverlay} />
          <div className={styles.imageContainer}>
            {this.props.img ? (
              // TODO: change img tags to Image tags
              <img
                className={styles.oppImg}
                src={`/sponsors/2022/${this.props.img}`}
                alt={this.props.companyName}
              />
            ) : (
              <img
                className={styles.oppImg}
                src={`/opportunities/${this.props.notSponsorImg}`}
                alt={this.props.companyName}
              />
            )}
          </div>

          {/* The image name could be found in the "public/sponsors/2021" folder or add it to "public/opportunities" folder */}
          <div className={styles.oppDesc}>
            <p className={styles.oppTypeAndLocation}>{this.props.type}</p>
            {/* The type should be in the format of the following example: Graduate Role */}
            <p className={styles.jobPosition}>{this.props.position}</p>
            {/* The position should be in the format of the following example: Front End Developer */}
            <p className={styles.oppTypeAndLocation}>{this.props.location}</p>
            {this.props.closeDate ? (
              <p className={styles.oppSummary}>
                Applications close: {this.props.closeDate}
                {/* The close date should be in the format of the following example: 01/01/2021 */}
              </p>
            ) : (
              <p className={styles.oppSummary}></p>
            )}
            <p className={styles.oppSummary}>{this.props.summary}</p>
          </div>
        </a>
        </Link>
    );
  }
}

export default OpportunitiesCard;
