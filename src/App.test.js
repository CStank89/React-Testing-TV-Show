import { fetchShow as mockFetchShow } from "./api/fetchShow";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import App from "./App";
import userEvent from "@testing-library/user-event";

const showData = {
  date: {
    id: 553946,
    url:
      "http://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
    name: "Chapter One: The Vanishing of Will Byers",
    season: 1,
    number: 1,
    airdate: "2016-07-15",
    airtime: "",
    airstamp: "2016-07-15T12:00:00+00:00",
    runtime: 60,
    image: {
      medium:
        "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
      original:
        "http://static.tvmaze.com/uploads/images/original_untouched/67/168918.jpg",
    },
    summary:
      "<p>A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.</p>",
    _links: {
      self: {
        href: "http://api.tvmaze.com/episodes/553946",
      },
    },
  },
};

jest.mock("./api/fetchShow.js");

test("render without errors", () => {
  render(<App />);
});

test("render shows when API is called", async () => {
  mockFetchShow.mockResolvedValueOnce(showData);

  render(<App />);

  const dropdown = screen.getByRole("listbox", { name: /select a season/i });

  userEvent.click(dropdown);
  userEvent.click(/season 1/i);

  await waitFor(() => screen.getAllByTestId(/episodes/i));

  expect(screen.getAllByTestId(/episodes/i)).toHaveLength(3);
});
