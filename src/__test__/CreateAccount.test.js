import React from 'react';
import CreateAccount from "../components/CreateAccount";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

import { store } from '../store';
import { Provider } from 'react-redux';

test("<CreateAccount /> Load the CreateAccount component and make sure everything is correct", async () => {

    render(<Router>
        <Provider store={store}>
            <CreateAccount />
        </Provider>
    </Router>);

    const title = screen.getByTestId("title");
    expect(title.tagName).toBe("H2");
    expect(title.tagName).not.toBe("H1");
    expect(title.textContent).toBe("Create account");
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

    const confirmPassword = screen.getByTestId("confirmpassword");
    expect(confirmPassword).toBeInTheDocument();
    expect(confirmPassword.tagName).toBe("DIV");
    expect(confirmPassword.tagName).not.toBe("INPUT");
    expect(confirmPassword.tagName).not.toBe("BUTTON");

    const createBtn = screen.getByTestId("createBtn");
    expect(createBtn).toBeInTheDocument();
    expect(createBtn.tagName).toBe("BUTTON");
    expect(createBtn.tagName).not.toBe("INPUT");
    expect(createBtn.tagName).not.toBe("DIV");

});

test("<CreateAccount /> Validate the form with no data", async () => {

    render(<Router>
        <Provider store={store}>
            <CreateAccount />
        </Provider>
    </Router>);

    // click on create button
    const createBtn = screen.getByTestId("createBtn");
    userEvent.click(createBtn);

    await waitFor(() => {
        const nameAlert = screen.getByText("Name is required");
        expect(nameAlert).toBeInTheDocument();
        expect(nameAlert.tagName).toBe("P");
        expect(nameAlert.tagName).not.toBe("SPAN");

        const emailAlert = screen.getByText("Email is required");
        expect(emailAlert).toBeInTheDocument();
        expect(emailAlert.tagName).toBe("P");
        expect(emailAlert.tagName).not.toBe("SPAN");

        const passwordAlert = screen.getByText("Password is required");
        expect(passwordAlert).toBeInTheDocument();
        expect(passwordAlert.tagName).toBe("P");
        expect(passwordAlert.tagName).not.toBe("SPAN");

        const confirmPasswordAlert = screen.getByText("Confirm password is required");
        expect(confirmPasswordAlert).toBeInTheDocument();
        expect(confirmPasswordAlert.tagName).toBe("P");
        expect(confirmPasswordAlert.tagName).not.toBe("SPAN");
    });
});

test("<CreateAccount /> Validate the form with incorrect email, password and confirm password", async () => {

    render(<Router>
        <Provider store={store}>
            <CreateAccount />
        </Provider>
    </Router>);

    userEvent.type(screen.getByPlaceholderText("Name"), "Lisniel");
    userEvent.type(screen.getByPlaceholderText("Email"), "lisniel@test");
    userEvent.type(screen.getByPlaceholderText("Password"), "123");
    userEvent.type(screen.getByPlaceholderText("Confirm password"), "456");

    // click on create button
    const createBtn = screen.getByTestId("createBtn");
    userEvent.click(createBtn);

    await waitFor(() => {
        const emailAlert = screen.getByText("Please enter a correct email");
        expect(emailAlert).toBeInTheDocument();
        expect(emailAlert.tagName).toBe("P");
        expect(emailAlert.tagName).not.toBe("SPAN");

        const passwordAlert = screen.getByText("Password must have at least 6 characters");
        expect(passwordAlert).toBeInTheDocument();
        expect(passwordAlert.tagName).toBe("P");
        expect(passwordAlert.tagName).not.toBe("SPAN");

        const confirmPasswordAlert = screen.getByText("The confirmation password does not match");
        expect(confirmPasswordAlert).toBeInTheDocument();
        expect(confirmPasswordAlert.tagName).toBe("P");
        expect(confirmPasswordAlert.tagName).not.toBe("SPAN");
    });
});