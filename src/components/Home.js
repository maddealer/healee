import React, { useState, useEffect } from "react";
import Display from "./Display";
const Home = () => {
  const currencies = ["USD", "EUR", "AUD", "CAD", "CHF", "NZD", "BGN"];
  const [ratesList, setRatesList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getRates();
  }, []);

  //Function for fetching and caching the data
  const getRates = async () => {
    let allData = [];
    let groupedByCurrency = [];
    const ONE_DAY = 1000 * 60;

    let isData = JSON.parse(localStorage.getItem("data"));
    let expiry = JSON.parse(localStorage.getItem("expiry"));
    if (isData && expiry && expiry.nextCleanup > new Date().getTime()) {
      allData.push(isData);
      console.log("gore");
    } else {
      allData = [];
      console.log("dolu");
      localStorage.removeItem("data");
      localStorage.removeItem("expiry");
      for (let i = 0; i < currencies.length; i++) {
        for (let j = 0; j < currencies.length; j++) {
          if (currencies[j] !== currencies[i]) {
            try {
              const response = await fetch(
                `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencies[
                  i
                ].toLowerCase()}/${currencies[j].toLowerCase()}.json`,
                {
                  method: "GET",
                }
              );
              const json = await response.json();
              allData.push({
                pair: `${currencies[i]}-${currencies[j]}`,
                rate: json,
              });
            } catch (err) {
              console.log(err);
            }
          }
        }
      }

      localStorage.setItem("data", JSON.stringify(allData));
      localStorage.setItem(
        "expiry",
        JSON.stringify({
          nextCleanup: new Date().getTime() + ONE_DAY,
        })
      );
    }
    let dataArray = JSON.parse(localStorage.getItem("data"));
    for (let i = 0; i < currencies.length; i++) {
      let group = [];

      for (let j = 0; j < dataArray.length; j++) {
        if (dataArray[j].pair.includes(`${currencies[i]}`)) {
          let objVal = Object.values(dataArray[j].rate);
          let newObj = {
            pair: dataArray[j].pair,
            rateOnly: objVal[1],
          };
          group.push(newObj);
        }
      }
      groupedByCurrency.push({
        currenciesGroup: currencies[i],
        allPairs: group,
      });
    }
    setRatesList(groupedByCurrency);
    setLoading(false);
  };

  return <div>{loading ? <h1>Loading</h1> : <Display data={ratesList} />}</div>;
};

export default Home;
