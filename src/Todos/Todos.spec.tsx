import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { act, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Todos, { URL } from "./Todos";

const RESPONSE_200 = [
  { id: 1, userId: 3, title: "Task #1", completed: false },
  { id: 2, userId: 4, title: "Something to do", completed: true },
  { id: 3, userId: 3, title: "Wash laundry", completed: false },
  {
    id: 4,
    userId: 3,
    title: "Plant a tree in the garden",
    completed: false,
  },
];

const handlers = [
  http.get(URL, () => {
    const response = HttpResponse.json(RESPONSE_200);
    return response;
  }),
];

const server = setupServer(...handlers);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Todos", () => {
  const user = userEvent.setup();

  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test("renders component", async () => {
    server.use(http.get(URL, () => HttpResponse.json([])));

    const { getByTestId, findByText } = render(<Todos />, { wrapper });

    expect(getByTestId("message").textContent).toBe("Loading tasks");
    const message = await findByText("No tasks yet");
    expect(message);
  });

  test("renders error message", async () => {
    server.use(
      http.get(URL, () => {
        return HttpResponse.error();
      }),
    );

    const { findByText } = render(<Todos />, { wrapper });
    const errorMessageEl = await findByText("Error: Failed to fetch");
    expect(errorMessageEl);
  });

  test("renders data", async () => {
    const { container: c } = render(<Todos />, { wrapper });

    await waitFor(
      () => {
        const toggleButtonEls = c.querySelectorAll("button");
        expect(toggleButtonEls).toHaveLength(4);
      },
      { timeout: 1000 },
    );
  });

  test("toggles task details", () => {
    const { container: c, getByTestId } = render(<Todos />, { wrapper });
    waitFor(
      async () => {
        const toggleButtonEls = c.querySelectorAll("button");

        await act(async () => {
          await user.click(toggleButtonEls[2]);
          expect(getByTestId("task-details--id-3"));
          expect(getByTestId("task-details--user-id-3-3"));
        });

        await act(async () => {
          await user.click(toggleButtonEls[0]);
          expect(getByTestId("task-details--id-1"));
          expect(getByTestId("task-details--user-id-3-1"));
        });

        await act(async () => {
          await user.click(toggleButtonEls[0]);
          expect(getByTestId("task-details--id-1")).toBeNull();
          expect(getByTestId("task-details--user-id-3-1")).toBeNull();
        });
      },
      { timeout: 1000 },
    );
  });
});
