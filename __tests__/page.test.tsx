import Page from "@/app/page"
import { render, screen } from '@testing-library/react'

describe("Page", () => {
  it("renders a svg", () => {
    render(<Page />)
    const svg = screen.getByRole('img');

    expect(svg).toBeInTheDocument();
  })
})