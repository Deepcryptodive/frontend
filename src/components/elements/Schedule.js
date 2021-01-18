import React from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Timeline from "./Timeline";
import TimelineItem from "./TimelineItem";
import classNames from "classnames";

dayjs.extend(duration);

const Schedule = (props) => {
  const {
    className,
    topOuterDivider,
    bottomOuterDivider,
    hasBgColor,
    invertColor,
  } = props;

  const outerClasses = classNames(
    "roadmap section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const numberOfPayableRounds = parseInt(props.gameInfo.lastSegment);
  const numberOfRounds = numberOfPayableRounds + 3;
  const roundsLengthsSecs = props.gameInfo.segmentLengthInSecs;
  const arr = new Array(numberOfRounds);
  const segments = Array.apply(null, arr).map(function (x, i) {
    return {
      round: i + 1,
      dateData: props.gameInfo.firstSegmentEnd.add(
        (i - 1) * roundsLengthsSecs,
        "second"
      ),
    };
  });

  return (
    <div className="schedule tabs-content">
      <h3
        className="show-mobile-only"
        style={{ marginTop: "5px", textAlign: "left" }}
      >
        Timeline
      </h3>
      {/* <h3>Deposit Timeline</h3>
        <p style={{ marginBottom: "10px" }}>
          Each round lasts{" "}
          {dayjs.duration(roundsLengthsSecs, "seconds").asDays()} days
        </p>
        <p style={{ marginBottom: "10px" }}>
          Make your regular deposit before the end of each round.
        </p>
        <p>
          {" "}
          To be safe, we recomend depositing at least an hour before each round
          ends.{" "}
        </p> */}
      <div className="container">
        <Timeline>
          {segments.map((i) => {
            return (
              <TimelineItem
                title={`${i.dateData.format("HH:mm ddd D MMM")}: ${
                  i.round === 1
                    ? "Game launched"
                    : i.round === numberOfRounds
                    ? `Waiting period ends`
                    : `Deposit deadline ${i.round - 1}`
                }`}
                key={i.round}
                className={
                  i.round % 2 !== 0 ? "schedule-left" : "schedule-right"
                }
              >
                {/* {i.round === 1
                    ? "Game launched"
                    : i.round === numberOfRounds
                      ? `Waiting period ends`
                      : `Deposit deadline ${i.round - 1}`
                    } */}
                {i.round === numberOfRounds
                  ? `Waiting Period`
                  : `Round  ${i.round}`}
              </TimelineItem>
            );
          })}
          <p
            style={{
              textTransform: "uppercase",
              fontFamily: "Cardo",
              fontWeight: "400",
              marginTop: "10px",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            After the waiting period
          </p>
          <span>
            <p
              style={{
                textAlign: "center",
              }}
            >
              Get back your initial deposit and collect your winnings!
            </p>
          </span>
          <p style={{ textAlign: "center", paddingBottom: "20px" }}>
            <span
              role="img"
              aria-label="money-emoji"
              style={{
                fontSize: "2.5rem",
                lineHeight: "2.5rem",
              }}
            >
              🤑
            </span>
          </p>
        </Timeline>
      </div>
    </div>
  );
};
export default Schedule;
