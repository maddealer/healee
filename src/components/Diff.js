import React, { useEffect, useState } from "react";

const Diff = (props) => {
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    countDifference();
  }, [props.data]);

  const countDifference = () => {
    let data = props.data;
    let count = 0;
    let maxCount = 0;

    for (let i = 0; i < data.length - 1; i++) {
      count = 0;
      for (let j = i + 1; j < data.length; j++) {
        if (data[j].rateOnly - data[i].rateOnly <= 0.5) {
          count++;
        } else {
          if (count > maxCount) maxCount = count + 1;

          break;
        }
      }
    }
    if (count > maxCount) maxCount = count + 1;
    setDifference(maxCount);
  };

  return (
    <div>
      <div>
        {difference ? (
          <div>
            <h4>
              {`The length of the longest array, where the absolute difference between any two elements of the array is less than or equal to 0.5`}
            </h4>
            <h2>{difference}</h2>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Diff;
