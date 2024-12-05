import React from 'react';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db'; // Import the database 


const RecipePage = async ({ params }: { params: { recipeId: string }}) => {

    // Fetch the city data from the database including its POIs (Points of Interest) and their categories
    const country = await db.recipe.findUnique({
        where: {
            id: params.recipeId,
        },
        // include: {
        //     cities: true,
        //   },
    });

    if(!country) {
        redirect('/home')
    }

    return (
        <div>
            <h1>Recipe : {country.name}</h1>
            {/* <h2>List towns : </h2>
            <div>
                { country && country.cities.length > 0 ? (
                    country.cities.map((city: any) => (
                        <div key={city.id}>
                            <Link href={`/city/${city.id}`}>{city.name}</Link>
                        </div>
                    ))
                ) : (
                    <div >No Cities available</div>
                )}
            </div> */}
        </div>

        
    );
}

// Export the CountryPage component as the default export
export default RecipePage;