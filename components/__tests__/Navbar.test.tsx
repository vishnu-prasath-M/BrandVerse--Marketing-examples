import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});



describe("Navbar", () => {
  it("renders the logo and site name", () => {
    render(<Navbar />);
    expect(screen.getByText("Marketing Examples")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Newsletter")).toBeInTheDocument();
  });

  it("has search input", () => {
    render(<Navbar />);
    const searchInput = screen.getByLabelText("Search examples");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "search");
  });

  it("has proper accessibility attributes", () => {
    render(<Navbar />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Main navigation");
  });
});

