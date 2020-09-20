import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import {displaySegment, weiToERC20} from './../../utils/utilities'
import web3 from 'web3';

const propTypes = {
  ...SectionTilesProps.types,
  pricingSwitcher: PropTypes.bool,
  pricingSlider: PropTypes.bool
}

const defaultProps = {
  ...SectionTilesProps.defaults,
  pricingSwitcher: false,
  pricingSlider: false
}

class GameStats extends React.Component {

  handlePricingSwitch = (e) => {
    this.setState({ priceChangerValue: e.target.checked ? '1' : '0' });
  }

  handlePricingSlide = (e) => {
    this.setState({ priceChangerValue: e.target.value });
    this.handleSliderValuePosition(e.target);
  }

  handleSliderValuePosition = (input) => {
    const multiplier = input.value / input.max;
    const thumbOffset = this.thumbSize * multiplier;
    const priceInputOffset = (this.thumbSize - this.sliderValue.current.clientWidth) / 2;
    this.sliderValue.current.style.left = input.clientWidth * multiplier - thumbOffset + priceInputOffset + 'px';
  }

  getPricingData = (values, set) => {
    return set !== undefined ? values[this.state.priceChangerValue][set] : values[this.state.priceChangerValue];
  }

  totalPoolAmount(){
    const BN = web3.utils.BN;
    let gamePrincipal = new BN(this.props.gameInfo.totalGamePrincipal)
    return web3.utils.fromWei(gamePrincipal)
  }

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
      pricingSwitcher,
      pricingSlider,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'pricing section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'pricing-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const tilesClasses = classNames(
      'tiles-wrap',
      pushLeft && 'push-left'
    );

    const sectionHeader = {
      title: 'Our Saving Pool is live!',
      paragraph: "👉Don't forget to make your regular deposit!"
    };
    console.log("👻",props)
    return (
      <section
        className={outerClasses}
      >
        <div className="container">
          <div >
            <SectionHeader data={sectionHeader} className="center-content invert-color" />          
            <div className={tilesClasses}>
              <div className="tiles-item reveal-from-top" style={{opacity : '1', flexBasis: '500px', maxWidth : '500px'}}>
                <div className="tiles-item-inner has-shadow">
                  <div className="pricing-item-content">
                    <div className="pricing-item-header">
                      <div className="pricing-item-price mb-4">
                        <span className="pricing-item-price-currency h2 text-color-mid">
                        </span>
                        <span className="pricing-item-price-amount game-stats-figures">
                          <span>Every day deposit</span>
                          {/* {this.props.gameInfo.segmentLength.$d.days}  can use this to ref the specific number of days   */}
                          <h4>{web3.utils.fromWei(this.props.gameInfo.rawSegmentPayment)} DAI</h4>
                          <p>Total Pool Amount</p>
                          <h4> {this.props.gameInfo  && weiToERC20(this.props.gameInfo.totalGamePrincipal)} DAI</h4>
                          <p>Total Pool Interest</p>
                          <h4> {this.props.gameInfo  && weiToERC20(this.props.totalGameInterest)} DAI</h4>
                          <p>  Players Status </p>
                          {/* TODO calculate this */}
                          <h4> 1 Paid   3 Live   0 Dead</h4>
                          <p>  Current Round </p>
                          {/* TODO calculate this */}
                          <h4> {displaySegment(this.props.gameInfo.currentSegment)}</h4>
                        </span>
                      </div>
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

GameStats.propTypes = propTypes;
GameStats.defaultProps = defaultProps;

export default GameStats;