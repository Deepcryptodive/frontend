import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

class FeaturesTiles extends React.Component {

  render() {

    const {
      className,
      topOuterDivider,
      bottomOuterDivider,
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      pushLeft,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'features-tiles section center-content',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'features-tiles-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const tilesClasses = classNames(
      'tiles-wrap',
      pushLeft && 'push-left'
    );

    const sectionHeader = {
      title: "The end of boring saving",
      paragraph: "Our groundbreaking gameplay, will give you the ultimate push to save. Compete with others and take the opportunity get higher interest rates, without risking your principal. If you are motivated enough to complete all deposits, you will earn more than you would by saving by yourself."
    };
    const sectionBottom = {
      title: "Regular savers earn extra 💸",
      paragraph: "When a saving pool ends, everyone gets their principle back. The extra interest that was earned, is split amongst the savvy savers who made every deposit. Players that missed a payment, forfeit their claim to the generated interest. Hence, the more people fail to meet their goals, the higher the rewards for those that do!   So hit your goals to earn a slice of the interest! ",
    };

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content"
              width={72}
              height={72} />
            <div className={tilesClasses}>

              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16 reveal-from-top" data-reveal-container=".tiles-item">
                      <Image
                        src={require('./../../assets/images/synchronized-swimming.svg')}
                        alt="Pool icon"
                        width={72}
                        height={72} />
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8 reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="100">
                    Join our saving pool
                    </h4>
                    <p className="m-0 text-sm reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="200">
                      Dive in and join our one of our shared saving pools. Get motivated to save. No more waiting for the right time to start!
                    </p>
                  </div>
                </div>
              </div>

              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16 reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="100">
                      <Image
                        src={require('./../../assets/images/money.svg')}
                        alt="Features tile icon 02"
                        width={72}
                        height={72} />
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8 reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="200">
                     Make regular deposits
                    </h4>
                    <p className="m-0 text-sm reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="300">
                     Add to your savings weekly or monthly. Feel proud as your balance grows and you hit your financial goals. You are free to remove your deposited funds at any point.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16 reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="200">
                      <Image
                        src={require('./../../assets/images/celebrate.svg')}
                        alt="Features tile icon 03"
                        width={72}
                        height={72} />
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8 reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="300">
                       Watch interest accrue
                    </h4>
                    <p className="m-0 text-sm reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="400">
                    Pooled funds are deposited in audited DeFi platforms, generating higher interest rates than in traditional finance. Annual rates of over 7% are possible - for all winners.
                    </p>
                  </div>
                </div>
              </div>

              <div className={innerClasses}>
                <SectionHeader data={sectionBottom} className="center-content"
                  width={72}
                  height={72} />
              </div>

{/*
              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16 reveal-from-top" data-reveal-container=".tiles-item">
                      <Image
                        src={require('./../../assets/images/feature-tile-icon-04.svg')}
                        alt="Features tile icon 04"
                        width={72}
                        height={72} />
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8 reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="100">
                      High-Quality Service
                    </h4>
                    <p className="m-0 text-sm reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="200">
                      A pseudo-Latin text used in web design, layout, and printing in place of things to emphasise design for previewing layouts.
                    </p>
                  </div>
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </section>
    );
  }
}

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;
