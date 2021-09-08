import React, { useState, useEffect } from "react";
import Diff from "./Diff";

import "./Display.css";

const Display = (props) => {
  const [selected, setSelected] = useState("USD");
  const [dataReady, setDataReady] = useState([]);
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [group3, setGroup3] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    groupData();
  }, [selected]);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  //Grouping all data from selected currency
  const groupData = () => {
    const index = props.data.filter((obj) => {
      return obj.currenciesGroup === selected;
    });
    let ratesToDisplay = index[0].allPairs;

    let g1 = [];
    let g2 = [];
    let g3 = [];

    ratesToDisplay.sort((a, b) => a.rateOnly - b.rateOnly);
    setDataReady(ratesToDisplay);
    for (let i = 0; i < ratesToDisplay.length; i++) {
      if (ratesToDisplay[i].rateOnly < 1) g1.push(ratesToDisplay[i]);
      if (ratesToDisplay[i].rateOnly >= 1 && ratesToDisplay[i].rateOnly < 1.5)
        g2.push(ratesToDisplay[i]);
      if (ratesToDisplay[i].rateOnly >= 1.5) g3.push(ratesToDisplay[i]);
    }

    setDataReady(ratesToDisplay);
    setGroup1(g1);
    setGroup2(g2);
    setGroup3(g3);
    setLoading(false);
  };
  //Display the HTML
  const display = () => {
    let g1html = group1.map((el, index) => {
      return (
        <p key={index}>
          {el.pair}: {el.rateOnly}
        </p>
      );
    });
    let g2html = group2.map((el, index) => {
      return (
        <p key={index}>
          {el.pair}: {el.rateOnly}
        </p>
      );
    });
    let g3html = group3.map((el, index) => {
      return (
        <p key={index}>
          {el.pair}: {el.rateOnly}
        </p>
      );
    });

    return (
      <div>
        <div className="row">
          <div className="column">
            <div className="card">
              <h3>Card 1</h3>
              {g1html}
              <h4>Count: {g1html.length}</h4>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <h3>Card 2</h3>
              {g2html}
              <h4>Count: {g2html.length}</h4>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <h3>Card 3</h3>
              {g3html}
              <h4>Count: {g3html.length}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="select">
        <h4>Please choose a currency</h4>
        <select value={selected} onChange={handleChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="NZD">NZD</option>
          <option value="BGN">BGN</option>
        </select>
      </div>
      {loading ? <div></div> : display()}
      <hr></hr>
      {dataReady ? <Diff data={dataReady} /> : null}
    </div>
  );
};

export default Display;
