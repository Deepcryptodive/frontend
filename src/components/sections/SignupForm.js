import React from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import { Link } from "react-router-dom";
import SectionHeader from "./partials/SectionHeader";
import Input from "../elements/Input";
import Button from "../elements/Button";
import CountdownContainer from './../elements/countdown-container';

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

class SignupForm extends React.Component {
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
      "signin section",
      topOuterDivider && "has-top-divider",
      bottomOuterDivider && "has-bottom-divider",
      hasBgColor && "has-bg-color",
      invertColor && "invert-color",
      className
    );

    const innerClasses = classNames(
      "signin-inner section-inner",
      topDivider && "has-top-divider",
      bottomDivider && "has-bottom-divider"
    );

    const sectionHeader = {
      title: "Time left to join",
      // paragraph : "Save 100 DAI every  week for 6 weeks."
    };

    return (
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader
              tag="h1"
              data={sectionHeader}
              className="center-content"
            />
            <CountdownContainer
              timeTillDate="08 16 2020 , 6:00 am"
              timeFormat="MM DD YYYY, h:mm a"
            />
            <div className="tiles-wrap">
              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <form>
                    <fieldset>
                      {/* <div className="mb-12">
                        <Input
                          label="Full name"
                          placeholder="Full name" 
                          labelHidden
                          required />
                      </div> */}
                      {/* <div className="mb-12">
                        <Input
                          type="email"
                          label="Email"
                          placeholder="Email"
                          labelHidden
                          required />
                      </div> */}
                      {/* <div className="mb-12">
                        <Input
                          type="password"
                          label="Password"
                          placeholder="Password"
                          labelHidden
                          required />
                      </div> */}
                      <div className="mt-24 mb-32">
                        <Button color="primary" wide>
                          Connect your wallet
                        </Button>
                      </div>
                    </fieldset>
                  </form>
                  <div className="signin-bottom has-top-divider">
                    <div className="pt-32 text-xs center-content text-color-low">
                      Already have an account?{" "}
                      <Link to="/login/" className="func-link">
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

SignupForm.propTypes = propTypes;
SignupForm.defaultProps = defaultProps;

export default SignupForm;

const joinForm = () => (
  <form>
    <fieldset>
      {/* <div className="mb-12">
      <Input
        label="Full name"
        placeholder="Full name" 
        labelHidden
        required />
    </div> */}
      <div className="mb-12">
        <Input
          type="email"
          label="Email"
          placeholder="Email"
          labelHidden
          required
        />
      </div>
      {/* <div className="mb-12">
      <Input
        type="password"
        label="Password"
        placeholder="Password"
        labelHidden
        required />
    </div> */}
      <div className="mt-24 mb-32">
        <Button color="primary" wide>
          Sign up
        </Button>
      </div>
    </fieldset>
  </form>
);
