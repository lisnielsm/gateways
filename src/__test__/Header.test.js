import Header from "../components/Header01";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '../store';
import { Provider } from 'react-redux';

test("<Header /> Load the header and make sure everything is correct", () => {

    render(<Router>
        <Provider store={store}>
            <Header />
        </Provider>
    </Router>);


    expect(screen.getByText("Gateways")).toBeInTheDocument();
    expect(screen.getByTestId("logo").tagName).toBe("DIV");
    expect(screen.getByTestId("logo").tagName).not.toBe("P");
    expect(screen.getByTestId("logo").textContent).toBe("Gateways");
    expect(screen.getByTestId("logo").textContent).not.toBe("GATEWAYS");

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByTestId("login").tagName).toBe("A");
    expect(screen.getByTestId("login").tagName).not.toBe("BUTTON");
    expect(screen.getByTestId("login").textContent).toBe("Login");
    expect(screen.getByTestId("login").textContent).not.toBe("LOGIN");

    expect(screen.getByText("Create Account")).toBeInTheDocument();
    expect(screen.getByTestId("createAccount").tagName).toBe("A");
    expect(screen.getByTestId("createAccount").tagName).not.toBe("BUTTON");
    expect(screen.getByTestId("createAccount").textContent).toBe("Create Account");
    expect(screen.getByTestId("createAccount").textContent).not.toBe("CREATE ACCOUNT");
});