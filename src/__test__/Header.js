import Header from "../components/Header";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

test("<Header /> Load the header and make sure everything is correct", () => {

    render(<Header />);
    expect( screen.getByText("Gateways")).toBeInTheDocument();
    expect( screen.getByText("Login")).toBeInTheDocument();
    expect( screen.getByText("Create Account")).toBeInTheDocument();

});