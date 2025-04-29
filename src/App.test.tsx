import { describe, expect, it} from "vitest"
import {render} from '@testing-library/react'
import App from "./App";

describe("App", () => {
    it("should render App component", async () => {
        const result = render(<App/>)
        expect(await result.findByText("Vite + React")).toBeInTheDocument()
    });
})