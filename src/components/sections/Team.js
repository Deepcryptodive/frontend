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

class Team extends React.Component {

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
      'team section center-content',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'team-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const tilesClasses = classNames(
      'tiles-wrap',
      pushLeft && 'push-left'
    );

    const sectionHeader = {
      title: 'Meet the team',
      paragraph: 'We are a team of passionate builders, traders and occassional savers.'
    };

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container" id="team">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content reveal-from-top" />
            <div className={tilesClasses}>

              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <div className="team-item-header reveal-from-top" data-reveal-container=".tiles-item">
                    <div className="team-item-image mb-24 illustration-element-03">
                    <a href="https://www.linkedin.com/in/rachblondon/" target="_blank" rel="noopener">
                      <Image
                        src={require('./../../assets/images/rachel.jpeg')}
                        alt="Team member 01"
                        width={180}
                        height={180} />
                    </a>
                    </div>
                  </div>
                  <div className="team-item-content reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="200">
                    <h5 className="team-item-name mt-0 mb-4">
                      Rachel Black
                    </h5>
                    <div className="team-item-role text-xxs tt-u fw-500 text-color-primary mb-8 sans_serif">
                      CEO | Frontend dev
                    </div>
                    <p className="m-0 text-sm">
                    Rachel is an experienced frontend developer. She also worked in developer relations for a number of blockchain projects, including 3Box and has most recently joined Twilio. She is passionate about building products and community.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <div className="team-item-header reveal-from-top" data-reveal-container=".tiles-item">
                    <div className="team-item-image mb-24 illustration-element-04">
                    <a href="https://www.linkedin.com/in/giel-detienne-8a792094/" target="_blank" rel="noopener">
                      <Image
                        src={require('./../../assets/images/giel.jpg')}
                        alt="Team member 02"
                        width={180}
                        height={180} />
                    </a>
                    </div>
                  </div>
                  <div className="team-item-content reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="200">
                    <h5 className="team-item-name mt-0 mb-4">
                    Giel Detienne
                    </h5>
                    <div className="team-item-role text-xxs tt-u fw-500 text-color-primary mb-8 sans_serif">
                      COO | Crypto Economics
                    </div>
                    <p className="m-0 text-sm">
                    Heavy DeFi user and professional blockchain consultant. Experienced in digital asset management, yield optimization and research.<br/> Molecular scientist by training (PhD in Biotechnology). Member of the Melon Council DAO.
                    </p>
                  </div>
                </div>
              </div>


              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <div className="team-item-header reveal-from-top" data-reveal-container=".tiles-item">
                    <div className="team-item-image mb-24 illustration-element-06">
                    <a href="https://www.linkedin.com/in/babyjessiparker/" target="_blank" rel="noopener">
                      <Image
                        src={require('./../../assets/images/jessi.jpg')}
                        alt="Team member 03"
                        width={180}
                        height={180} />
                    </a>
                    </div>
                  </div>
                  <div className="team-item-content reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="200">
                    <h5 className="team-item-name mt-0 mb-4">
                    Baby Jessi Parker
                    </h5>
                    <div className="team-item-role text-xxs tt-u fw-500 text-color-primary mb-8 sans_serif">
                      UX Designer | Community
                    </div>
                    <p className="m-0 text-sm">
                    UX/UI designer with a background in sales, customer relations and education. Interested in DeFi and becoming more involved within the blockchain ecosystem. Utilizes design thinking to create beautiful and immersive experiences for users.</p>
                  </div>
                </div>
              </div>

              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <div className="team-item-header reveal-from-top" data-reveal-container=".tiles-item">
                    <div className="team-item-image mb-24 illustration-element-06">
                  {/*  <a href="https://www.linkedin.com/in/babyjessiparker/" target="_blank" rel="noopener"> */}
                      <Image
                        src={require('./../../assets/images/DevX.png')}
                        alt="Team member 04"
                        width={180}
                        height={180} />
                    {/*</a>*/}
                    </div>
                  </div>
                  <div className="team-item-content reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="200">
                    <h5 className="team-item-name mt-0 mb-4">
                    Dev X
                    </h5>
                    <div className="team-item-role text-xxs tt-u fw-500 text-color-primary mb-8 sans_serif">
                      Senior Blockchain Developer
                    </div>
                    <p className="m-0 text-sm">
                    Software engineer and PMO, with experience leading large-scale projects and developing scaling platforms. He would like to remain behind the scenes for the time being, focussing on building our Solidity smart contracts in a secure manner. </p>
                  </div>
                </div>
              </div>

              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <div className="team-item-header reveal-from-top" data-reveal-container=".tiles-item">
                    <div className="team-item-image mb-24 illustration-element-06">
                      {/*<a href="https://www.linkedin.com/in/babyjessiparker/" target="_blank" rel="noopener">*/}
                      <Image
                        src={require('./../../assets/images/DevY.png')}
                        alt="Team member 05"
                        width={180}
                        height={180} />
                    {/*</a>*/}
                    </div>
                  </div>
                  <div className="team-item-content reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="200">
                    <h5 className="team-item-name mt-0 mb-4">
                    Dev Y
                    </h5>
                    <div className="team-item-role text-xxs tt-u fw-500 text-color-primary mb-8 sans_serif">
                      Junior Blockchain Developer
                    </div>
                    <p className="m-0 text-sm">
                    Proficient Ethereum hackathon participant & developer since 2017, with a focus on DeFi. Also experienced in MERN & MEAN Stack App Development. He would like to remain building behind the scenes for the time being.</p>
                  </div>
                </div>
              </div>

              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <div className="team-item-header reveal-from-top" data-reveal-container=".tiles-item">
                    <div className="team-item-image mb-24 illustration-element-06">
                      <a href="https://www.linkedin.com/in/simon-cousaert/" target="_blank" rel="noopener">
                      <Image
                        src={require('./../../assets/images/simon.jpeg')}
                        alt="Team member 06"
                        width={180}
                        height={180} />
                    </a>
                    </div>
                  </div>
                  <div className="team-item-content reveal-from-top" data-reveal-container=".tiles-item" data-reveal-delay="200">
                    <h5 className="team-item-name mt-0 mb-4">
                    Simon Cousaert
                    </h5>
                    <div className="team-item-role text-xxs tt-u fw-500 text-color-primary mb-8 sans_serif">
                      Intern | Business Dev
                    </div>
                    <p className="m-0 text-sm">
                    Graduated as a MSc in Business Engineering, with a major in Data Analytics. Immersing himself in the blockchain ecosystem and soon strengthening his skills in London at UCL. Interned at Keyrock (Crypto Market Maker), and will help developing the GoodGhosting business.</p>
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

Team.propTypes = propTypes;
Team.defaultProps = defaultProps;

export default Team;
