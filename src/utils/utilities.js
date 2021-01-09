import parseErr from "parse-err";
import getRevertReason from "eth-revert-reason";
import web3 from "web3";
export const status = {
  unloaded: "unloaded",
  registered: "registered",
  unregistered: "unregistered",
};

export const isNotEmptyObj = (myObject) => !!Object.keys(myObject).length;

export const aaveLendingPoolProvider =
  "0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5";
export const daiAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";
export const goodGhostingAdress = process.env.REACT_APP_GG_CONTRACT; // 2 week segments
// export const goodGhostingAdress = '0x79C01423De3Ca5c436dF4996c9B16d796c871370' //1800 secs
// export const goodGhostingAdress = "0x839f2F25216621D01D0567646c459d960abD6267";

export const brandColors = {
  darkBlue: "#5680e9",
  lightBlue: "#84ceeb",
  mediumBlue: "#5ab9ea",
  lilac: "#c1c8e4",
  purple: "#8860d0",
};

export const displayAddress = (address) =>
  address.slice(0, 4) + "..." + address.slice(-4);

export const gqlErrors = {
  players: "gql players request failed",
  game: "gql game request failed",
};

export const gameNumber = 0;

export const parseRevertError = async (error) => {
  const errorToString = parseErr(error).stack.toString();
  const transactionHash = errorToString
    .split('transactionHash": ')[1]
    .slice(1, 67);
  const reason = await getRevertReason(transactionHash, "kovan");
  return reason;
};

export const weiToERC20 = (wei) => {
  const BN = web3.utils.BN;
  let weiBN = new BN(wei);
  return web3.utils.fromWei(weiBN);
};
// current segment counts from 0 and is a string
export const displaySegment = (raw) => parseInt(raw) + 1;

export const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

export const daiLink = "https://testnet.aave.com/faucet";

// export const ethLink = "https://kovan.faucet.enjin.io/"; // SSL Certificate issue with this faucet
export const ethLink = "https://faucet.kovan.network/";
