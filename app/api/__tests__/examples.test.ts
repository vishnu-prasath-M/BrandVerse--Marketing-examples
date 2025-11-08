import { GET } from "../examples/route";
import { prisma } from "@/lib/prisma";

// Mock prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    example: {
      findMany: jest.fn(),
    },
  },
}));

describe("GET /api/examples", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns paginated examples", async () => {
    const mockExamples = [
      {
        id: "1",
        slug: "example-1",
        title: "Example 1",
        description: "Description 1",
        body: "Body 1",
        imageUrl: "https://example.com/img1.jpg",
        monthlyRevenue: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
        categories: [],
      },
    ];

    (prisma.example.findMany as jest.Mock).mockResolvedValue(mockExamples);

    const request = new Request("http://localhost:3000/api/examples?take=9");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("examples");
    expect(data).toHaveProperty("nextCursor");
    expect(data).toHaveProperty("hasMore");
  });

  it("filters by category when provided", async () => {
    (prisma.example.findMany as jest.Mock).mockResolvedValue([]);

    const request = new Request(
      "http://localhost:3000/api/examples?category=email-marketing"
    );
    await GET(request);

    expect(prisma.example.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          categories: expect.objectContaining({
            some: expect.objectContaining({
              category: expect.objectContaining({
                slug: "email-marketing",
              }),
            }),
          }),
        }),
      })
    );
  });

  it("handles errors gracefully", async () => {
    (prisma.example.findMany as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    const request = new Request("http://localhost:3000/api/examples");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toHaveProperty("error");
  });
});

