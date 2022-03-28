/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable no-undef */
import userEvent from "@testing-library/user-event";
import Login from "../components/Login";
import { render, act, screen } from "../utils/test";

test("Should show error when fields are invalid", async () => {
    // make invalid data
    const loginInfo = {
        email: "123",
        password: "123",
    };

    // render component
    render(<Login />);

    // type login infoß
    await act(async () => userEvent.type(screen.getByLabelText(/email/i), loginInfo.email));
    await act(async () => userEvent.type(screen.getByLabelText(/password/i), loginInfo.password));

    // check error message
    expect(screen.getAllByRole("alert")[0].textContent).toBe("Email is invalid");
    expect(screen.getAllByRole("alert")[1].textContent).toBe(
        "Password must be at least 5 characters",
    );
});

test("Should show error when fields are null", async () => {
    // render component
    render(<Login />);

    // press login button
    await act(async () => userEvent.click(screen.getByRole("button", { name: /login/i })));

    // check error message
    expect(screen.getAllByRole("alert")[0].textContent).toBe("Email is required");
    expect(screen.getAllByRole("alert")[1].textContent).toBe("Password is required");
});
