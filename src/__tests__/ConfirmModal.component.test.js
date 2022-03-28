/* eslint-disable no-undef */
import userEvent from "@testing-library/user-event";
import ConfirmModal from "../components/ProductList/ConfirmModal";
import { render, screen, act } from "../utils/test";
beforeEach(() => {
    const div = document.createElement("div");
    div.setAttribute("id", "portal");
    document.body.appendChild(div);
});

afterEach(() => {
    document.body.innerHTML = "";
});

test("Should show message ", async () => {
    // mock message
    const message = "Are you sure?";

    // render component
    render(<ConfirmModal message={message} />);

    // expect information to be shown
    expect(screen.getByText(/Are you sure?/i)).toBeInTheDocument();
});

test("Should call onConfirm,turnOff function when yes is pressed ", async () => {
    // mock onConfirm, turnOff functions
    const onConfirm = jest.fn();
    const turnOff = jest.fn();
    // render component
    render(<ConfirmModal onConfirm={onConfirm} turnOff={turnOff} />);

    // press confirm button
    await act(async () => userEvent.click(screen.getByRole("button", { name: /yes/i })));

    //expect onConfirm, turnOff functions to be called
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(turnOff).toHaveBeenCalledTimes(1);
});
