import React from "react";
import Link from "next/link";
import { BootstrapTooltip } from "./BootstrapTooltip";
import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  const routes = {
    Home: "/",
    Events: "/events",
    Opportunities: "/opportunities",
    "Join Us": "/join-us",
    "Our Story": "/about/our-story",
    "Sponsors and Affiliations": "/about/sponsors-affiliations",
    "Our Team": "/about/our-team",
    "Contact Us": "/about/contact-us",
    "Blog Posts": "/media/blog",
    Podcast: "/media/podcast",
    Publications: "/media/publications",
    Marketing: "/media/marketing",
    Videos: "/media/videos",
  };

  const headings = ["STUDENT INVOLVEMENT", "ABOUT US", "MEDIA"];

  const links = [
    ["Home", "Events", "Opportunities", "Join Us"],
    ["Our Story", "Sponsors and Affiliations", "Our Team", "Contact Us"],
    ["Blog Posts", "Podcast", "Publications", "Marketing", "Videos"],
  ];

  const socials = {
    spArc: [
      "https://member.arc.unsw.edu.au/s/clubdetail?clubid=0016F0000371W0xQAE",
      "sparc.png",
    ],
    "Facebook Page": ["https://www.facebook.com/unsw.wit/", "facebook.png"],
    "Facebook Group": [
      "https://www.facebook.com/groups/unswwit/",
      "facebook-group.png",
    ],
    LinkedIn: [
      "https://www.linkedin.com/company/unsw-women-in-technology/",
      "linkedin.png",
    ],
    Instagram: ["https://www.instagram.com/wit.unsw/", "instagram.png"],
    Youtube: [
      "https://www.youtube.com/channel/UCQ8PGe3P4ZuDSNCb9vCeTiw/videos/",
      "youtube.png",
    ],
    Twitch: ["https://www.twitch.tv/unswwit", "twitch.png"],
    Spotify: [
      "https://open.spotify.com/show/1iWagdei1mVoyzg8TqbB2P",
      "spotify.png",
    ],
    Discord: ["https://discord.gg/BWY4tzM326", "discord.png"],
  };

  return (
    <div>
      <footer>
        <ul className="footer-all">
          <div className="grid-footer-container">
            <li className="col-width footer-item footer-logo">
              {/* TODO: change to next/image */}
              <div className={styles.footerLogoWhite}>
                <Image
                  src="/logo-white.png"
                  alt="wit logo"
                  width={45}
                  height={40}
                />
              </div>
              <div className={styles.footerLogoBlack}>
                <Image
                  src="/logo-black.png"
                  className="footer-logo-black"
                  alt="wit logo"
                  width={45}
                  height={40}
                />
              </div>
            </li>
            {links.map((col, index) => {
              return (
                <div key={col} className="col-width footer-links">
                  <li className="footer-item footer-header">
                    {" "}
                    {headings[index]}{" "}
                  </li>
                  {col.map((route) => {
                    return (
                      <li className="footer-item" key={route}>
                        <Link href={routes[route] || "/"}>{route}</Link>
                      </li>
                    );
                  })}
                </div>
              );
            })}
            <div className="col-width socials">
              <div className="socials-subheading">
                <li className="footer-item footer-header">
                  {" "}
                  FOLLOW OUR SOCIALS{" "}
                </li>
              </div>
              <div className="footer-item">
                <div className="square-link">
                  {Object.keys(socials).map((social) => {
                    return (
                      <span key={social} className="footer-icons">
                        <BootstrapTooltip
                          key={social}
                          title={
                            <>
                              <div className="tooltipTitle">{social}</div>
                            </>
                          }
                        >
                          <a
                            href={socials[social][0]}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={`/icons/${social}.png`}
                              alt={social}
                              width="40px"
                              height="40px"
                            />
                          </a>
                        </BootstrapTooltip>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </ul>
        <div className="footer-copyright text-center bottom-footer-item">
          <Link href="/"> Copyright© 2020. UNSW Women in Technology </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
