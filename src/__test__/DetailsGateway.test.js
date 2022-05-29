import React from 'react';
import DetailsGateway from "../components/DetailsGateway";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '../store';
import { Provider } from 'react-redux';

test("<DetailsGateway /> Load the DetailsGateway component and make sure everything is correct", () => {

    render(<Router>
        <Provider store={store}>
            <DetailsGateway />
        </Provider>
    </Router>);

    const title = screen.getByTestId("title");
    expect(title.tagName).toBe("H2");
    expect(title.tagName).not.toBe("H1");
    expect(title.textContent).toBe("Gateway Details");
    expect(title.textContent).not.toBe("Gateway details");

    expect(screen.getByTestId("imgFieldset")).toBeInTheDocument();
    expect(screen.getByTestId("image")).toBeInTheDocument();

    const serialNumber = screen.getByTestId("serialNumber");
    expect(serialNumber).toBeInTheDocument();
    expect(serialNumber.tagName).toBe("DIV");
    expect(serialNumber.tagName).not.toBe("INPUT");
    expect(serialNumber.tagName).not.toBe("BUTTON");

    const name = screen.getByTestId("name");
    expect(name).toBeInTheDocument();
    expect(name.tagName).toBe("DIV");
    expect(name.tagName).not.toBe("INPUT");
    expect(name.tagName).not.toBe("BUTTON");

    const ip = screen.getByTestId("ip");
    expect(ip).toBeInTheDocument();
    expect(ip.tagName).toBe("DIV");
    expect(ip.tagName).not.toBe("INPUT");
    expect(ip.tagName).not.toBe("BUTTON");

    const backBtn = screen.getByTestId("backBtn");
    expect(backBtn).toBeInTheDocument();
    expect(backBtn.tagName).toBe("BUTTON");
    expect(backBtn.tagName).not.toBe("INPUT");
    expect(backBtn.tagName).not.toBe("DIV");

});