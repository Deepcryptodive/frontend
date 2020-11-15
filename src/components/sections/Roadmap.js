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
                  Initial product ideation at ETH London, award a finalist
                  position.
                </a>
              </TimelineItem>
              <TimelineItem title="July 2020" fadeInGG>
                GoodGhosting joins Gitcoin's Kernel program. New team formation.
              </TimelineItem>
              <TimelineItem title="August 2020" fadeInGG>
                <a
                  href="https://medium.com/goodghosting/confession-time-whats-next-f5ac52aa517d"
                  target="_blank"
                  rel="noopener"
                >
                  Concept launch and validiated.
                </a>
              </TimelineItem>
              <TimelineItem title="September 2020" fadeInGG>
                <a
                  href="https://gitcoin.co/grants/1112/goodghosting-a-defi-savings-game"
                  target="_blank"
                  rel="noopener"
                >
                  {" "}
                  Our gitcoin grant is live.
                </a>
              </TimelineItem>
              <TimelineItem title="Q4 2020" fadeInGG>
                Testnet launch and UX testing.
              </TimelineItem>
              <TimelineItem title="Q1 2021" fadeInGG>
                Mainnet launch with gas minimised MVP architecture.
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
