import React from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Timeline from "../elements/Timeline";
import TimelineItem from "../elements/TimelineItem";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

class Roadmap extends React.Component {
  render() {
    const {
      className,
      topOuterDivider,
      bottomOuterDivider,
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      ...props
    } = this.props;

    const outerClasses = classNames(
      "roadmap section",
      topOuterDivider && "has-top-divider",
      bottomOuterDivider && "has-bottom-divider",
      hasBgColor && "has-bg-color",
      invertColor && "invert-color",
      className
    );

    const innerClasses = classNames(
      "roadmap-inner section-inner",
      topDivider && "has-top-divider",
      bottomDivider && "has-bottom-divider"
    );

    const sectionHeader = {
      title: "Product roadmap",
      paragraph: "Our journey revinventing savings for the DeFi generation.",
    };

    return (
      <section {...props} className={outerClasses}>
        <div className="container" id="roadmap">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            <Timeline>
              <TimelineItem title="February 2020" fadeInGG>
                <a
                  href="https://www.youtube.com/watch?v=nUW8ASimbH8"
                  target="_blank"
                  rel="noopener"
                >
                  Initial product ideation at ETH London, awarded a finalist
                  position
                </a>
              </TimelineItem>
              <TimelineItem title="July 2020" fadeInGG>
                GoodGhosting joins Gitcoin's KERNEL program. New team formation
              </TimelineItem>
              <TimelineItem title="August 2020" fadeInGG>
                <a
                  href="https://medium.com/goodghosting/confession-time-whats-next-f5ac52aa517d"
                  target="_blank"
                  rel="noopener"
                >
                  Concept launch and validation
                </a>
              </TimelineItem>
              <TimelineItem title="September 2020" fadeInGG>
                <a
                  href="https://gitcoin.co/grants/1112/goodghosting-a-defi-savings-game"
                  target="_blank"
                  rel="noopener"
                >
                  {" "}
                  Our gitcoin grant is live
                </a>
              </TimelineItem>
              <TimelineItem title="NOVEMBER 2020" fadeInGG>
              <a
                href="https://medium.com/goodghosting/the-beginners-guide-to-using-goodghosting-on-kovan-testnet-9b7edb8fb640"
                target="_blank"
                rel="noopener"
              >
                Testnet launch</a>
                <a
                  href="https://medium.com/goodghosting/goodghosting-alpha-testing-94e1f8c083e1"
                  target="_blank"
                  rel="noopener"
                > & UX testing</a>
              </TimelineItem>
              <TimelineItem title="December 2020" fadeInGG>
              <a
                href="https://twitter.com/metagammadelta/status/1338532174610407424"
                target="_blank"
                rel="noopener"
              >
                Awarded MakerDAO grant by MGD</a>
              </TimelineItem>
              <TimelineItem title="Q1 2021" fadeInGG>
                Mainnet MVP launch with gas minimized architecture
              </TimelineItem>
              {/* <TimelineItem title="March 2020">
                Deployed a high-quality first release and conducted a market validation test
              </TimelineItem> */}
            </Timeline>
          </div>
        </div>
      </section>
    );
  }
}

Roadmap.propTypes = propTypes;
Roadmap.defaultProps = defaultProps;

export default Roadmap;
