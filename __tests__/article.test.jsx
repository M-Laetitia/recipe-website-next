import "@testing-library/jest-dom";
import { render} from "@testing-library/react";
import ArticlesPage from "../app/article/page";


// Mock de `fetch`
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
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


// on importe les helpers de test :
// 1° rendu react
// 2° pour ajouter des matchers dans toBeInDocument
// on utiliser la fonction getBytext pour check la présence de 2 chaines de caractères dans le DOM
// Si ArticlesPage contient des componsant aysynchornes on utilsie findByText / waitFor
// on pourrrait améliorer ce test en le rendant plus robuste en vérifiant les arialabel, les headings, roles
// couverture des test npm__coverage (> audit cb de % de code a été testé)
// .local / test / dev 