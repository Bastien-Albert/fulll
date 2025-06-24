import { render, screen } from "@testing-library/react";
import Message from "./Message";

describe("Message component", () => {
    it("should render children correctly", () => {
        render(
            <Message>
                <p>Test content</p>
            </Message>
        );
        expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("should apply wrapper classes", () => {
        const { container } = render(
            <Message>
                <p>Content</p>
            </Message>
        );

        const siteWidth = container.querySelector(".site-width");
        const containerDiv = container.querySelector(".container");
        const cardDiv = container.querySelector(".p-10");

        expect(siteWidth).toBeInTheDocument();
        expect(containerDiv).toBeInTheDocument();
        expect(cardDiv).toBeInTheDocument();
    });
});
