import React from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import Image from "../elements/Image";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

class Clients extends React.Component {
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
      "clients section reveal-fade",
      topOuterDivider && "has-top-divider",
      bottomOuterDivider && "has-bottom-divider",
      hasBgColor && "has-bg-color",
      invertColor && "invert-color",
      className
    );

    const innerClasses = classNames(
      "clients-inner section-inner",
      topDivider && "has-top-divider",
      bottomDivider && "has-bottom-divider"
    );

    return (
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <ul className="list-reset">
              <li className="reveal-rotate-from-left" data-reveal-delay="100">
                <Image
                  src={require("./../../assets/images/aave-logo.svg")}
                  alt="Client 01"
                  width={124}
                  height={24}
                />
              </li>
              <li className="reveal-rotate-from-left" data-reveal-delay="150">
                <Image
                  src={require("./../../assets/images/ethereum.svg")}
                  alt="Client 02"
                  width={83}
                  height={30}
                />
              </li>
              <li className="reveal-rotate-from-left" data-reveal-delay="300">
                <Image
                  src={require("./../../assets/images/gitcoin.svg")}
                  alt="Client 03"
                  width={125}
                  height={30}
                />
              </li>
              <li className="reveal-rotate-from-left" data-reveal-delay="300">
                <Image
                  src={require("./../../assets/images/the-graph.svg")}
                  alt="Client 03"
                  width={60}
                  height={30}
                />
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

Clients.propTypes = propTypes;
Clients.defaultProps = defaultProps;

export default Clients;
