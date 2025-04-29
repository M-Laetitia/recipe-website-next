import "@testing-library/jest-dom";
import { render} from "@testing-library/react";
import ArticlesPage from "../app/article/page";


// Mock de `fetch`
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), // Adapte la réponse en fonction de ce que tu attends
  })
);

describe("Article Page", () => {
  it("check for relevant text", async () => {
    const { findByText } = render(<ArticlesPage />);
    
    // Attends que l'élément soit trouvé avant de faire l'assertion
    const element = await findByText("BLOG - ARTICLES");
    expect(element).toBeInTheDocument();
  });
});