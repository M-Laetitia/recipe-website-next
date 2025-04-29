import "@testing-library/jest-dom";
import { render} from "@testing-library/react";
import Home from "../app/page";


// Mock de `fetch`
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), 
  })
);

describe("HomePage", () => {
  it("check for relevant text", async () => {
    const { findByText } = render(<Home />);
    
    // Attends que l'élément soit trouvé avant de faire l'assertion
    const element = await findByText("Latest recipes :");
    expect(element).toBeInTheDocument();
  });
});