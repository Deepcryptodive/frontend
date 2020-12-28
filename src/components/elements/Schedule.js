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
  const numberOfRounds = numberOfPayableRounds + 1;
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
                title={i.dateData.format("HH:mm ddd D MMM")}
                key={i.round}
                className={
                  i.round % 2 !== 0 ? "schedule-left" : "schedule-right"
                }
              >
                {i.round === 1 ? "Game launched" : `Round ${i.round - 1} ends`}
              </TimelineItem>
            );
          })}
          <p
            style={{
              textTransform: "uppercase",
              fontFamily: "Cardo",
              fontWeight: "400",
              marginTop: "40px",
              fontSize: "14px",
            }}
          >
            After the final round
          </p>
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
        </Timeline>
      </div>
    </div>
  );
};
export default Schedule;
