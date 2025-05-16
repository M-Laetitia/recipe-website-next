import "@testing-library/jest-dom";
// Charge les matchers personnalisés de jest-dom (par exemple toBeInTheDocument()), qui sont utilisés pour tester le rendu du DOM dans le navigateur.
import { render, waitFor, screen } from "@testing-library/react";
// render	Rendre ton composant dans un DOM virtuel (jsdom) pour le tester
// waitFor	Attendre que des changements apparaissent dans le DOM (souvent utile après un useEffect)
// screen	Utiliser les sélecteurs pour lire ce qui est dans le DOM (par exemple getByText)
import RecipePage from "../app/recipe/page";
// importes le composant à tester (RecipePage).

//  faux Mock getCldImageUrl pour éviter crash si image
jest.mock('next-cloudinary', () => ({
    getCldImageUrl: () => 'https://example.com/fake.jpg',
  }));
  
//   Cette fonction sera exécutée avant chaque test, pour mettre en place ton environnement (notamment ici : le fetch).
  beforeEach(() => {
    // Mock fetch
    global.fetch = jest.fn((url) => { // remplace la fonction fetch du navigateur par une version "mockée" (= simulée), dans un test, tu ne veux pas faire de vrais appels réseau. Tu veux simuler les réponses des endpoints
      if (url.includes('/api/recipe')) {
        return Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                id: '1',
                title: 'Mock Recipe',
                name: 'Mock Recipe',
                duration: 30,
                image: 'mock.jpg', 
                difficulty: 2,
                categories: [],
              },
            ]),
        });
      }
  
      if (url.includes('/api/category')) {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
  
      return Promise.reject(new Error('Unknown API route'));
    });
  });
  
  describe('RecipePage', () => {
    it('fetches a recipe array and displays recipes', async () => {
      render(<RecipePage />);
  
      await waitFor(() => {
        expect(screen.getByText('Mock Recipe')).toBeInTheDocument();
      });
    });
  });