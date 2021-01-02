import React from "react";

import PropTypes from "prop-types";
import classNames from "classnames";
import Logo from "./../layout/partials/Logo";
import FooterNav from "./../layout/partials/FooterNav";
import FooterSocial from "./../layout/partials/FooterSocial";
import { daiLink, ethLink } from "./../../utils/utilities";

const propTypes = {
  topOuterDivider: PropTypes.bool,
  topDivider: PropTypes.bool,
};

const defaultProps = {
  topOuterDivider: false,
  topDivider: false,
};

class Footer extends React.Component {
  render() {
    const { className, topOuterDivider, topDivider, ...props } = this.props;

    const classes = classNames(
      "site-footer center-content-mobile has-top-divider",
      className
    );

    return (
      <footer
        {...props}
        className={classes}
        style={{ backgroundColor: "#EDF1FF" }}
      >
        <div className="container">
          <div
            className={classNames(
              "site-footer-inner",
              topDivider && "has-top-divider"
            )}
          >
            <div
              style={{
                textAlign: "left",
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontWeight: "600",
                fontSize: "1.2rem",
                color: "#2B2C52",
              }}
            >
              <p>This game is running on the Kovan network</p>
              <p>
                To play, you need{" "}
                <a
                  className="kovan-link"
                  style={{ textDecoration: "none" }}
                  href={daiLink}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  DAI
                </a>{" "}
                and{" "}
                <a
                  className="kovan-link"
                  style={{ textDecoration: "none" }}
                  href={ethLink}
                  target="blank"
                  rel="noopener noreferrer nofollow"
                >
                  Kovan ETH
                </a>
              </p>
            </div>
            <br></br>
            <div className="footer-top space-between text-xxs">
              <Logo />
              <FooterSocial />
            </div>
            <div className="footer-bottom space-between text-xxs invert-order-desktop">
              <FooterNav />
              <div className="footer-copyright">
                &copy; 2020 GoodGhosting, all rights reserved
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;

// const KovanFauctet = () => (
//   <div
//     className="sans_serif kovan-faucet"
//     style={{
//       backgroundColor: "#F5F7FE",
//       paddingBottom: "80px",
//       paddingTop: "32px",
//       paddingLeft: "20px",
//       paddingRight: "20px",
//     }}
//   >
// <p>This game is running on Kovan</p>
// <p>
//   To play, you need{" "}
//   <a
//     href="https://testnet.aave.com/faucet"
//     target="_blank"
//     rel="noopener noreferrer nofollow"
//   >
//     DAI
//   </a>{" "}
//   and{" "}
//   <a
//     href="https://kovan.faucet.enjin.io//"
//     target="blank"
//     rel="noopener noreferrer nofollow"
//   >
//     Kovan ETH
//   </a>
// </p>
//   </div>
// );

// export default KovanFauctet;
