import React from 'react';
import Login from "../components/Login";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from "@testing-library/user-event";

import { store } from '../store';
import { Provider } from 'react-redux';

describe("<Login />", () => {
    test("<Login /> Load the Login component and make sure everything is correct", () => {

        render(<Router>
            <Provider store={store}>
                <Login />
            </Provider>
        </Router>);

        const title = screen.getByTestId("login");
        expect(title.tagName).toBe("H2");
        expect(title.tagName).not.toBe("H1");
        expect(title.textContent).toBe("Login");
        expect(title.textContent).not.toBe("LOGIN");

        const email = screen.getByTestId("email");
        expect(email).toBeInTheDocument();
        expect(email.tagName).toBe("DIV");
        expect(email.tagName).not.toBe("INPUT");
        expect(email.tagName).not.toBe("BUTTON");

        const password = screen.getByTestId("password");
        expect(password).toBeInTheDocument();
        expect(password.tagName).toBe("DIV");
        expect(password.tagName).not.toBe("INPUT");
        expect(password.tagName).not.toBe("BUTTON");

        const loginBtn = screen.getByTestId("loginBtn");
        expect(loginBtn).toBeInTheDocument();
        expect(loginBtn.tagName).toBe("BUTTON");
        expect(loginBtn.tagName).not.toBe("INPUT");
        expect(loginBtn.tagName).not.toBe("DIV");

    });

    test("<Login /> Validate the form with no data", async () => {

        render(<Router>
            <Provider store={store}>
                <Login />
            </Provider>
        </Router>);

        // click on login button
        const loginBtn = screen.getByTestId("loginBtn");
        userEvent.click(loginBtn);

        const emailAlert = await screen.findByText("Email is required");
        expect(emailAlert).toBeInTheDocument();
        expect(emailAlert.tagName).toBe("P");
        expect(emailAlert.tagName).not.toBe("SPAN");

        const passwordAlert = await screen.findByText("Password is required");
        expect(passwordAlert).toBeInTheDocument();
        expect(passwordAlert.tagName).toBe("P");
        expect(passwordAlert.tagName).not.toBe("SPAN");
    });

    test("<Login /> Validate the form with incorrect email and password", async () => {

        render(<Router>
            <Provider store={store}>
                <Login />
            </Provider>
        </Router>);

        userEvent.type(screen.getByPlaceholderText("Email"), "lisniel@test");
        userEvent.type(screen.getByPlaceholderText("Password"), "123");

        // click on login button
        const loginBtn = screen.getByTestId("loginBtn");
        userEvent.click(loginBtn);

        const emailAlert = await screen.findByText("Please enter a correct email");
        expect(emailAlert).toBeInTheDocument();
        expect(emailAlert.tagName).toBe("P");
        expect(emailAlert.tagName).not.toBe("SPAN");

        const passwordAlert = await screen.findByText("Password must have at least 6 characters");
        expect(passwordAlert).toBeInTheDocument();
        expect(passwordAlert.tagName).toBe("P");
        expect(passwordAlert.tagName).not.toBe("SPAN");
    });

});