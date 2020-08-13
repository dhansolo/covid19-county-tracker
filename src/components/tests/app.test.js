import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment/moment';

import App from '../app';

test("It should render correct content", () => {
    const root = document.createElement("div");
    ReactDOM.render(<App />, root);
    expect(root.querySelector("h1")).toBeDefined();
    expect(root.querySelector("h1").textContent).toBe("COVID-19 County Tracker");
})

test("Date should be accurate", () => {
    let currentDate = new Date();
    let momentDate = "" + moment().subtract(1, 'days').format("MMMM DD, YYYY");
    expect(currentDate).toMatch("" + Date.get)
})