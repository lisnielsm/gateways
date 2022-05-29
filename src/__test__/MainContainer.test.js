import React from 'react';
import MainContainer from "../components/MainContainer01";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

import { store } from '../store';
import { Provider } from 'react-redux';

test("<MainContainer /> Load the MainContainer component and make sure everything is correct", async () => {

    render(<Router>
        <Provider store={store}>
            <MainContainer />
        </Provider>
    </Router>);

    const title = screen.getByTestId("title");
    expect(title.tagName).toBe("H2");
    expect(title.tagName).not.toBe("H1");
    expect(title.textContent).toBe("Gateways List");
    expect(title.textContent).not.toBe("Gateways list");

    const newBtn = screen.getByTestId("newBtn");
    expect(newBtn).toBeInTheDocument();
    expect(newBtn.tagName).toBe("A");
    expect(newBtn.tagName).not.toBe("INPUT");
    expect(newBtn.tagName).not.toBe("BUTTON");

    const datagrid = screen.getByTestId("datagrid");
    expect(datagrid).toBeInTheDocument();
    expect(datagrid.tagName).toBe("DIV");
    expect(datagrid.tagName).not.toBe("INPUT");
    expect(datagrid.tagName).not.toBe("BUTTON");

});