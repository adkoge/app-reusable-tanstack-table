import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ViewLevelSwitcher from ".";
import { userView } from "../../config/viewModes";

describe("ViewLevelSwitcher Component", () => {
  const onViewLevelChangeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all view buttons", () => {
    render(
      <ViewLevelSwitcher
        currentViewLevel={userView.ME}
        onViewLevelChange={onViewLevelChangeMock}
      />
    );

    expect(screen.getByText("My View")).toBeInTheDocument();
    expect(screen.getByText("Admin View")).toBeInTheDocument();
    expect(screen.getByText("Company View")).toBeInTheDocument();
  });

  it("highlights the active view button", () => {
    render(
      <ViewLevelSwitcher
        currentViewLevel={userView.ADMIN}
        onViewLevelChange={onViewLevelChangeMock}
      />
    );

    const adminButton = screen.getByText("Admin View");
    expect(adminButton).toHaveClass("bg-blue-600 text-white");

    const myViewButton = screen.getByText("My View");
    expect(myViewButton).toHaveClass("bg-white border-gray-300");
  });

  it("calls onViewLevelChange with correct value on button click", () => {
    render(
      <ViewLevelSwitcher
        currentViewLevel={userView.ME}
        onViewLevelChange={onViewLevelChangeMock}
      />
    );

    const adminButton = screen.getByText("Admin View");
    fireEvent.click(adminButton);
    expect(onViewLevelChangeMock).toHaveBeenCalledWith(userView.ADMIN);

    const companyButton = screen.getByText("Company View");
    fireEvent.click(companyButton);
    expect(onViewLevelChangeMock).toHaveBeenCalledWith(userView.COMPANY);
  });
});
