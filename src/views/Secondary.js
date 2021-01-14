import React from "react";
// import section header
import SectionHeader from "../components/sections/partials/SectionHeader";
// import sections
import HeroFull from "../components/sections/HeroFull";
import Team from "../components/sections/Team";
import GenericSection from "../components/sections/GenericSection";
import Roadmap from "../components/sections/Roadmap";
import Cta from "../components/sections/Cta";
// import some required elements
import Image from "../components/elements/Image";
import Input from "../components/elements/Input";
import ButtonGroup from "../components/elements/ButtonGroup";
import Button from "../components/elements/Button";
import Modal from "../components/elements/Modal";
import Accordion from "../components/elements/Accordion";
import AccordionItem from "../components/elements/AccordionItem";

class Secondary extends React.Component {
  state = {
    demoModalActive: false,
  };

  openModal = (e) => {
    e.preventDefault();
    this.setState({ demoModalActive: true });
  };

  closeModal = (e) => {
    e.preventDefault();
    this.setState({ demoModalActive: false });
  };

  render() {
    const genericSection01Header = {
      title: "Buttons - Lorem ipsum is placeholder text commonly used.",
    };

    const genericSection02Header = {
      title: "Sign up to our mailing list",
    };

    const genericSection03Header = {
      title: "Modal - Lorem ipsum is placeholder text commonly used.",
    };

    const genericSection04Header = {
      title: "Frequently Asked Questions (FAQ)",
    };

    return (
      <React.Fragment>
        {/* <HeroFull className="illustration-section-02" /> */}
        <Team className="illustration-section-04"/>
        {/*
        <GenericSection topDivider>
          <div className="container-xs">
            <h2 className="mt-0">
              Lorem ipsum is placeholder text commonly used in the graphic.
            </h2>
            <p>
              Lorem ipsum dolor sit amet,{" "}
              <a href="#0">consectetur adipiscing elit</a>, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <figure>
              <Image
                className="image-larger"
                src={require("./../assets/images/image-placeholder.svg")}
                alt="Placeholder"
                width={712}
                height={400}
              />
              <figcaption className="text-color-low">
                A super-nice image{" "}
                <span role="img" aria-label="smile">
                  😀
                </span>
              </figcaption>
            </figure>
            <h4>Flexibility</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </p>
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetur.</li>
              <li>Lorem ipsum dolor sit amet, consectetur.</li>
              <li>Lorem ipsum dolor sit amet, consectetur.</li>
            </ul>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        </GenericSection> */}

        {/* <GenericSection topDivider className="center-content">
          <div className="container-xs">
            <SectionHeader
              data={genericSection01Header}
              className="center-content"
            />
            <ButtonGroup>
              <Button color="primary" wideMobile>
                Get started
              </Button>
              <Button color="secondary" wideMobile>
                Get started
              </Button>
              <Button color="dark" wideMobile>
                Get started
              </Button>
            </ButtonGroup>
          </div>
        </GenericSection> */}

        {/* <GenericSection topDivider>
          <div className="container-xs">
            <SectionHeader
              data={genericSection02Header}
              className="center-content"
            />
            <form style={formStyle}>
              <div className="mb-24">
                <Input
                  type="email"
                  label="This is a label"
                  placeholder="Your best email.."
                  formGroup="desktop"
                  labelHidden
                >
                  <Button color="primary">Get the latest updates</Button>
                </Input>
              </div> */}
              {/* <div className="mb-24">
                <Input
                  type="email"
                  label="This is a label"
                  placeholder="Your best email.."
                  formGroup="desktop"
                  labelHidden
                  status="error"
                  hint="Something is wrong."
                >
                  <Button color="primary">Early access</Button>
                </Input>
              </div>
              <div className="mb-24">
                <Input
                  type="email"
                  label="This is a label"
                  placeholder="Your best email.."
                  formGroup="desktop"
                  labelHidden
                  status="success"
                  hint="You've done it."
                >
                  <Button color="primary">Early access</Button>
                </Input>
              </div> */}
            {/* </form>
          </div>
        </GenericSection> */}

        {/* <GenericSection topDivider>
          <div className="container-xs">
            <SectionHeader
              data={genericSection03Header}
              className="center-content"
            />
            <div className="center-content">
              <Button
                color="secondary"
                aria-controls="demo-modal"
                onClick={this.openModal}
              >
                Open modal
              </Button>
            </div>
            <Modal
              id="demo-modal"
              show={this.state.demoModalActive}
              handleClose={this.closeModal}
            >
              <div className="center-content">
                <Image
                  className="mb-16"
                  src={require("./../assets/images/abstract-icon.svg")}
                  alt="Diamond"
                  width={53}
                  height={56}
                />
                <h3 className="mt-0 mb-12">Join our newsletter</h3>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <Input
                type="email"
                label="This is a label"
                placeholder="Your best email.."
                formGroup="desktop"
                labelHidden
              >
                <Button color="primary">Early access</Button>
              </Input>
              <div className="center-content mt-24">
                <a
                  className="func-link text-xxs fw-500 tt-u"
                  aria-label="close"
                  href="#0"
                  onClick={this.closeModal}
                >
                  No thanks!
                </a>
                ``
              </div>
            </Modal>
          </div>
        </GenericSection> */}

        <GenericSection topDivider className="illustration-section-06" id="faqs">
          <div className="container-xs">
            <SectionHeader
              data={genericSection04Header}
              className="center-content"
            />
            <Accordion>
              <AccordionItem title="When are you launching?">
                We are in active development. We have been recruiting alpha testers during Q4 2020 from our Discord community. After fine-tuning our product, we will launch a first version in early 2021.
                Read more about our <a href="https://medium.com/goodghosting/confession-time-whats-next-f5ac52aa517d" target="_blank" rel="noopener"> development plans in this blog post.</a>
              </AccordionItem>
              <AccordionItem
                title="How are you getting such high interest rates?"
                active
              >
                <span>
                  We deposit your principal into </span>
                  <a
                    href="https://defipulse.com/blog/what-is-defi/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  decentralized finance (DeFi) services
                  </a>
                <span> such as </span>
                <a
                  href="https://docs.aave.com/faq/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AAVE
                </a>
                <span> and/or </span>
                <a
                  href="https://docs.yearn.finance/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Yearn Finance
                </a>
                <span>
              . Both use non-custodial borrowing and lending platforms that
                  run on the Ethereum blockchain. This currently generates
                  higher interest rates than your bank account. Please
                  note that past interest rates do not indicate future
                  returns.
                </span>
              </AccordionItem>
              <AccordionItem title="Which currencies do you support?">
                <span>We currently support </span>
                <a
                  href="https://community-development.makerdao.com/makerdao-mcd-faqs/faqs/dai"
                  target="_blank"
                >
                  DAI
                </a>
                    <span>: a digital stablecoin which is pegged to the US Dollar. We are looking at adding more digital currencies, including </span>
                        <a href="https://www.circle.com/en/usdc" target="_blank"  rel="noopener noreferrer">
                          USDC
                        </a><span>. In the future, we aim to offer the ability to save in most international currencies. </span>
              </AccordionItem>
              <AccordionItem title="Is the annual percentage yield (APY) guaranteed?">
                <span>No, the 7% interest rate that is indicated is an estimation based on </span>
                <a href="https://loanscan.io/earn/historical" target="_blank"  rel="noopener noreferrer">
                  historical data</a>
                <span>. Past performance is no guarantee of future
                results. Actual APY will fluctuate based on supply and demand of
                the underlying automated money markets, as well as how many people complete the
                game.</span>
              </AccordionItem>
              <AccordionItem title="Is my money safe?">
                As with all DeFi products there are inherent <a href="https://medium.com/@xave.meegan/identifying-key-non-financial-risks-in-decentralised-finance-on-ethereum-blockchain-87402cb82e23" target="_blank" rel="noopener noreferrer">
                              risks</a>. Although we only
                plug into audited platforms - and adhere to strict security practices - our smart contracts are not (yet)
                audited. Please do not add more money than you can afford to lose.
              </AccordionItem>
              <AccordionItem title="Can I withdraw my funds at any time?">
                Yes. You can withdraw your funds at any time. We are fully <a href="https://web3.consulting/blog/post/defi-explained-self-custody" target="_blank" rel="noopener noreferrer">
                              non-custodial</a> and our smart contracts operate 24/7. If you wish to do withdraw from an ongoing game, you may be charged a small fee to compensate the remaining players in the savings pool.
              </AccordionItem>
              <AccordionItem title="Which DeFi platforms are you using?">
                <span>We currently support </span>
                <a
                  href="https://aave.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AAVE v2
                </a>
                <span> for our MVP, and </span>
                <span>
                   are actively researching adding more yield platforms such as </span>
                  <a href="https://yearn.finance/" target="_blank" rel="noopener noreferrer">
                                Yearn.finance </a>
                <span> and </span>
                              <a href="https://idle.finance/" target="_blank" rel="noopener noreferrer">
                                            Idle.finance</a>
                <span>. Let us know if there is one particular DeFi project or robo-advisor you are looking for.</span>
              </AccordionItem>
              <AccordionItem title="What about gas costs?">
                We know Ethereum <a href="https://www.investopedia.com/terms/g/gas-ethereum.asp" target="_blank" rel="noopener noreferrer">
                              gas costs</a> can be rather high, so we are sponsoring our
                users transaction fees for their first complete saving game. In
                the future, we will be using multiple solutions to reduce the gas
                costs for savers (e.g. layer 2 scaling and meta-transactions).
              </AccordionItem>
              <AccordionItem title="Can I save ETH instead of stablecoins?">
                Not yet, but we plan to add the ability to convert a portion of your regular stablecoin savings into Ethereum (ETH).
                This will provide you with an easy way to dollar-cost average into ETH. You will be able to
                withdraw the ETH at any point without affecting you capability to win a game and collect interest.
              </AccordionItem>
              <AccordionItem title="How do you make money?">
                Currently we are a free service, however in the future we will
                likely charge a small performance fee on all earnings to fund the project. Additionally, we may offer the ability to create your
                own fully configurable savings pool for a small fee.
              </AccordionItem>
              <AccordionItem title="What is an Ethereum wallet and why do I need it?">
                To access our service, you will need an Ethereum wallet or a Web3.0-enabled browser.
                For instance,  <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
                                                MetaMask </a> which works on most computers and smartphones.
                This allows you to access the next generation of decentralized financial apps.
                We will write a more detailed guide about how to interact with the GoodGhosting app when we launch. But don't worry, we'll make it as simple as possible!
              </AccordionItem>
              <AccordionItem title="Can I access GoodGhosting from any country?">
              <span>Yes, we welcome savers from anywhere in the world. We are a permissionless platform built on top of the </span>
              <a href="https://ethereum.org/en/what-is-ethereum/" target="_blank" rel="noopener noreferrer">
                                              open and decentralized Ethereum network </a>
              <span>. This allows for any individual to directly interact with GoodGhosting, irrespective of their country of residence or nationality.</span>
              </AccordionItem>
            </Accordion>
          </div>
        </GenericSection>

        <Roadmap topDivider />
        <Cta topDivider bottomDivider split className="reveal-from-top" />
      </React.Fragment>
    );
  }
}

// inline style
const formStyle = {
  maxWidth: "420px",
  margin: "0 auto",
};

export default Secondary;
