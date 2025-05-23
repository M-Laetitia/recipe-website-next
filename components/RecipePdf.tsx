import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';

interface Props {
  recipeId: string;
}

type Recipe = {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string;
};


const RecipePdf = ({ recipeId }: Props) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`/api/recipe/${recipeId}`);
      const data = await response.json();
      setRecipe(data);
      console.log("data pdf", data)
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
    },
    name: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
    section: {
      marginBottom: 15,
    },
    header: {
      fontSize: 18,
      marginBottom: 10,
    },
    text: {
      fontSize: 12,
      lineHeight: 1.5,
    },
    ingredientList: {
      marginTop: 10,
    },
    ingredient: {
      fontSize: 12,
      marginBottom: 5,
    },
  });

  if (!recipe) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>loading...</Text>
        </Page>
      </Document>
    );
  }



  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Titre */}
        <Text style={styles.name}>{recipe.name}</Text>

        {/* Ingrédients */}
        <View style={styles.section}>
            <Text style={styles.header}>Ingrédients :</Text>
            {/* {recipe.ingredients.map((ingredient: { ingredient: { name: string }; quantity: number; unit: string }, index: number) => (
                <Text key={index} style={styles.ingredient}>
                - {ingredient.ingredient.name} ({ingredient.quantity} {ingredient.unit})
                </Text>
            ))} */}
        </View>

        
      </Page>
    </Document>
  );
};

export default RecipePdf;
