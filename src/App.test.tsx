import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./Components/App";

jest.mock("./Calculator/dpsPool", () => ({
    runDpsJob: () => ({ cancel: () => undefined, reprioritize: () => undefined }),
}));

test("renders the default fight", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Archive Guardian" })).toBeInTheDocument();
});
