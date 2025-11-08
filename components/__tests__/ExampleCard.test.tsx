import { render, screen } from "@testing-library/react";
import ExampleCard from "../ExampleCard";

// Mock next/link and next/image
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock("next/image", () => {
  return ({ src, alt }: { src: string; alt: string }) => {
    return <img src={src} alt={alt} />;
  };
});

const mockExample = {
  id: "1",
  slug: "test-example",
  title: "Test Marketing Example",
  description: "This is a test description for the example",
  imageUrl: "https://via.placeholder.com/800x450",
  monthlyRevenue: 12000,
  categories: [
    { id: "1", name: "Email Marketing", slug: "email-marketing" },
    { id: "2", name: "SEO", slug: "seo" },
  ],
};

describe("ExampleCard", () => {
  it("renders the example title", () => {
    render(<ExampleCard {...mockExample} />);
    expect(screen.getByText("Test Marketing Example")).toBeInTheDocument();
  });

  it("renders the example description", () => {
    render(<ExampleCard {...mockExample} />);
    expect(
      screen.getByText("This is a test description for the example")
    ).toBeInTheDocument();
  });

  it("displays formatted revenue", () => {
    render(<ExampleCard {...mockExample} />);
    expect(screen.getByText("$12k")).toBeInTheDocument();
  });

  it("renders category chips", () => {
    render(<ExampleCard {...mockExample} />);
    expect(screen.getByText("Email Marketing")).toBeInTheDocument();
    expect(screen.getByText("SEO")).toBeInTheDocument();
  });

  it("links to the example detail page", () => {
    render(<ExampleCard {...mockExample} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/examples/test-example");
  });

  it("formats revenue correctly for millions", () => {
    render(<ExampleCard {...mockExample} monthlyRevenue={1500000} />);
    expect(screen.getByText("$1.5M")).toBeInTheDocument();
  });

  it("formats revenue correctly for thousands", () => {
    render(<ExampleCard {...mockExample} monthlyRevenue={5000} />);
    expect(screen.getByText("$5k")).toBeInTheDocument();
  });
});

