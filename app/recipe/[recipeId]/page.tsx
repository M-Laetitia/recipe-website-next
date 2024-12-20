'use client'
import { z } from "zod";
import { useForm ,} from "react-hook-form";
import React, { useEffect, useState } from 'react'

import { formatDate } from '@/lib/utils'
import { getCldImageUrl } from 'next-cloudinary';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Image from 'next/image';
import CursiveLabel from '@/components/CursiveLabel';
import Tag from '@/components/Tag';
import Button from '@/components/Button';
import DifficultyRating from '@/components/DifficultyRating';
import FavoriteIcon from '@/components/FavoriteIcon';
import { Clock4, MessageSquareText  } from 'lucide-react';
import RecipePdf from '@/components/RecipePdf';
import { PDFDownloadLink} from '@react-pdf/renderer';
// import { useRouter } from 'next/router';


//& TYPE ------------------------------------------------------------------
type Recipe = {
    id: string;
    name: string;
    instruction: string;
    createdAt: Date; 
    duration: number;
    difficulty: number;
    image: string;
    ingredients: [];
    tools: [];
    steps: [];
    reviews: [];
    categories: RecipeCategory[];
    user: User;
};

type RecipeCategory = {
    category: Category;
}


type Ingredient = {
    id: string;
    quantity: number;
    unit: string;
    ingredient: {
        name: string;
    };
};

type Review = {
    title: string;
    id: string;
    content: string;
    createdAt: Date;
    user : User;
  };

type Tool = {
    id: string;
    tool: {
        name: string;
    };
};

type Category = {
    id: string;
        name: string;
        isPrimary : boolean;

    
};
type Step = {
    id: string;
    number: string;
    duration: number;
    description: string;
    title: string;
};

type User = {
    id: string,
    username: string,
    imageUrl : string;
}

type Props = {
    params: Promise<{ recipeId: string }>
}


const reviewSchema = z.object({
    // title: z.string().nonempty(),
    title: z.string().min(5, { message: "Title must be at least 10 characters long" }).min(1,{ message: "Title is required" }),
    content: z.string().min(1, {message: "Content is required"}),
});

type reviewSchema = z.infer<typeof reviewSchema>;


const RecipePage = ({ params }: Props)  => {
    const [recipe, setRecipe] = useState<Recipe | null>(null); // Initialisation avec null
    const [recipeId, setRecipeId] = useState<string | null>(null);
    const [stepCount, setStepCount] = useState(0); 
    const [reviewCount, setReviewCount] = useState(0);
    const [allRecipes, setAllRecipes] = useState([]);
    const [similarRecipes, setSimilarRecipes] = useState([]);

    const {
        register,
        handleSubmit,
        setError, 
        clearErrors,
        setValue,
        formState: { errors }
      } = useForm({
        defaultValues: {
          title: "",
          content: "",
        }
    });
    
    useEffect(() => {
        const fetchRecipeId = async () => {
          const resolvedParams = await params;
          setRecipeId(resolvedParams.recipeId); 
        };
        
        fetchRecipeId();
      }, [params]); 

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`/api/recipe/${recipeId}`);
            const data = await response.json();
            setRecipe(data);


            setStepCount(data.steps.length);
            setReviewCount(data.reviews.length);

        };

        if (recipeId) {
            fetchRecipe();
        }

    }, [recipeId]);

    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const response = await fetch('/api/recipe');
                // const data: Recipe[] = await response.json();
                const data = await response.json();
                setAllRecipes(data);
    
                if (recipe) {
                    const primaryCategory = recipe.categories.find((categ: RecipeCategory) => categ.category.isPrimary)?.category.name;
                    const secondaryCategories = recipe.categories
                        .filter((categ: RecipeCategory) => !categ.category.isPrimary)
                        .map((categ: RecipeCategory) => categ.category.name);
    
                    if (primaryCategory) {
                        const similar = data.filter((otherRecipe: Recipe) => {
                            // Vérifier que ce n'est pas la recette actuelle
                            if (otherRecipe.id === recipeId) return false;

                            // Vérifier la catégorie primaire
                            const otherPrimaryCategory = otherRecipe.categories.find((categ: RecipeCategory) => categ.category.isPrimary)?.category.name;
                            if (otherPrimaryCategory !== primaryCategory) return false;
    
                            // Vérifier une catégorie secondaire similaire
                            const otherSecondaryCategories = otherRecipe.categories
                                .filter((categ: RecipeCategory) => !categ.category.isPrimary)
                                .map((categ: RecipeCategory) => categ.category.name);
    
                            return otherSecondaryCategories.some((categ) => secondaryCategories.includes(categ));
                        });
    
                        setSimilarRecipes(similar.slice(0, 4)); // Limiter à 4 suggestions
                        
                    }
                }
            } catch (error) {
                console.error('Error when fetching the recipes datas :', error);
            }
        };
    
        fetchAllRecipes();
    }, [recipe]);
    
    // if(!recipe) {
    //     redirect('/')
    // }



    // datas pour les onglets 
    // S'assurer que `recipe` n'est pas null avant d'accéder à ses propriétés
    const tabsDataTools = recipe
        ? [
            {
                name: "Ingredients",
                items: recipe.ingredients.map(
                    (ing: Ingredient) =>
                        `${ing.ingredient.name} - ${ing.quantity} ${ing.unit ? ing.unit : ""} `  //.trim() : Supprime les espaces inutiles si unit est absent.
                ) || [],
                
            },
            // {
            //     name: "Ingredients",
            //     items: recipe.ingredients.map(
            //         (ing: Ingredient) => ` ${ing.quantity}${ing.unit} ${ing.ingredient.name}`
            //     ) || [],
            // }
            {
                name: "Tools",
                items: recipe.tools.map((tool: Tool) => tool.tool.name) || [],
            }

           
            
            ]
    : [];


        const onSubmit = async (formData: reviewSchema) => {
            try {

                const validateData = reviewSchema.parse(formData);
                const response = await fetch(`/api/review`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...validateData, recipeId }), // Include recipeId here
                });

                if (response.ok) {
                    console.log('Review added');
                } else {
                    console.error('Error when adding the review');
                }
            } catch (error) {
                console.error('Error when adding the review:', error);
        }

        
    }
    
    if (!recipe) {
        return <p>Loading recipe...</p>;
    }


    // & RETURN ----------------------------------------------------------------
    return (
        <div className='bg-darkGrey w-[65%]  m-auto pt-24'>
            <div className=' flex flex-col items-center justify-center mb-20 '>
                <CursiveLabel text="Let's cook !" />
                <div className='flex items-center justify-center gap-4'>
                    <h1 className='text-4xl font-normal uppercase tracking-[3px]'>{recipe.name}</h1>
                    <Image 
                    src = "/img/zigzag.svg"
                    width={120}
                    height={30}
                    objectFit="contain"
                    alt= "zigzag icon"
                    />
                </div>
            </div>


            {/* //& TOP ----------------------------------------------------- */}
            <div className='w-full h-[550px] flex gap-24'>
                
                <div className='w-[60%] h-full relative'>
                    {/* //~ Description --------------------------------------------- */}
                    <div className='text-xl font-light mb-9'>
                        {recipe.instruction}
                    </div>

                    
                    {/* //~ Tags ---------------------------------------------------- */}
                    <div className='flex gap-5'>
                        { recipe && recipe.categories.length > 0 ? (
                            recipe.categories.map((category: RecipeCategory, index: number) => (
                                <Tag 
                                key={category.category.id || index}
                                text={`#${category.category.name}`} 
                                bgColor={category.category.isPrimary ? "var(--accentColor)" : "var(--darkGrey)"} 
                            />
                            ))
                        ) : (
                            <div >No categories available</div>
                        )}
                    </div>

                    {/* //~ Infos --------------------------------------------------- */}
                    <div className='bg-lightGrey w-[calc(100%+16rem)] h-36 flex flex-row z-10 absolute bottom-16 '>
                        <div className='w-[80%] grid gap-4 grid-cols-3'>

                            <div className='flex flex-col items-center justify-center'>
                                <p className='text-accentColor uppercase text-xl mb-2'>Cooking time</p>
                                <div className='flex gap-2 text-xl'><Clock4 /><p>{recipe.duration}min</p> </div>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='text-accentColor uppercase text-xl mb-2'>Difficulty</p>
                                <div ><DifficultyRating difficulty= {recipe.difficulty} /></div>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='text-accentColor uppercase text-xl mb-2'>Comments</p>
                                <div className='flex gap-2 text-xl'> <MessageSquareText /><p> {reviewCount}  </p></div>
                            </div>
                            
                        </div>

                        <div className=' w-[20%]  flex items-center justify-center'>
                            <FavoriteIcon />
                        </div>
                    </div>


                    <div className='absolute bottom-6 gap-3 cursor-pointer hover:text-accentColor transition duration-300 ease-out'>
                        <div className='flex items-center justify-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                            <p className='translate-y-1 '>
                                <PDFDownloadLink
                                    document={<RecipePdf recipeId={recipeId as string} />}
                                    fileName={`${recipe.name}-recipe.pdf`}
                                    >
                                    DOWNLOAD PDF
                                </PDFDownloadLink>
                            </p>
                        </div>
                    </div>

                </div>

                {/* //~ Image --------------------------------------------------- */}
                <div className="w-[40%] h-full">
                    <figure className="w-full h-full relative">
                        <Image
                            src={getCldImageUrl({
                                src: recipe.image,
                                width: 960,
                                height: 600,
                                crop: 'fit',
                            })}
                            alt={recipe.name}
                            fill
                            className="object-cover"
                        />
                    </figure>
                </div>
            </div>

            {/* //& STEPS / TOOLS / INGREDIENTS ----------------------------- */}

            <div className='w-full h-[22rem] mt-14 flex gap-24'>
                <div className='w-[60%] h-full'>
                    <div>
                        <h2 className='uppercase text-xl text-light py-2 '>{`STEPS (${stepCount})`} </h2>
                    </div>

                    <div className='w-full h-[85%] bg-lightGrey border-t border-accentColor relative'>
                    
                        <TabGroup>
                            {/* étapes */}
                            <TabPanels className="mt-4 h-[80%]">
                            {recipe.steps.map((step: Step, index: number)=> (
                                <TabPanel key={index} className="p-4  rounded shadow-none">
                                    <div className='flex items-center mb-6'>
                                        <p className='border border-accentColor rounded-full w-6 h-6 mr-5 text-center'>{step.number}</p>
                                        <p className='text-xl mr-7'>{step.title}</p>
                                        <p className='text-lg text-gray-400 font-light'>{step.duration} min</p>

                                    </div>

                                
                                <p className='font-light text-lg'>{step.description}</p>
                                </TabPanel>
                            ))}
                            </TabPanels>

                            {/* dots de navigation */}
                            <TabList className="flex justify-center items-center mt-4 space-x-2 h-[20%] absolute bottom-0 left-0 right-0">
                            {recipe.steps.map((_, index: number) => (
                                <Tab
                                key={index}
                                className={({ selected }) =>
                                    `w-3 h-3 rounded-full focus:outline-none ${
                                    selected ? 'bg-accentColor' : 'bg-gray-500'
                                    }`
                                }
                                ></Tab>
                            ))}
                            </TabList>
                        </TabGroup>
                       
                    </div>

                </div>

                <div className= 'w-[40%] '>
                    <div>
                        <TabGroup>
                        {/* Onglets */}
                        <TabList className="flex  border-b border-accentColor">
                        {tabsDataTools.map((tab, index) => (
                            <Tab
                            key={index}
                            className={({ selected }) =>
                                `px-4 py-2 focus:outline-none ${
                                selected
                                    ? "uppercase text-xl bg-accentColor border-t border-l border-r border-accentColor  "
                                    : "uppercase text-xl bg-lightGrey border-t border-l border-r border-accentColor "
                                }`
                            }
                            >
                            {tab.name}
                            </Tab>
                        ))}
                        </TabList>

                        {/* Contenu des onglets */}
                        <TabPanels className="h-full">
                        {tabsDataTools.map((tab, index) => (
                            <TabPanel key={index} className="p-4 bg-lightGrey ">
                            <ul className="list-disc list-inside ">
                                {tab.items.map((item: string, i: number) => (
                                <li className='text-whiteColor' key={i}>{item}</li>
                                ))}
                            </ul>
                            </TabPanel>
                        ))}
                        </TabPanels>
                        </TabGroup>
                    </div>
                </div>

            </div>

            {/* //& REVIEWS ------------------------------------------------- */}

            <div className='flex flex-col justify-center items-center mt-24 '>
                <CursiveLabel text="Share your thoughts !" />

                <div className=' w-full  border-b border-accentColor'>
                    <p className='text-2xl'> {reviewCount} Comments</p>
                </div>

                <div className='w-full mt-14'>
                    { recipe && recipe.reviews.length > 0 ? (
                        recipe.reviews.map((review: Review, index: number) => (
                            <div key={review.id || index} className='flex mb-10 gap-10 bg-lightGrey p-5'>
                                <div>
                                    <div className='w-[100px] h-[100px]'>
                                      <Image
                                            src= {review.user.imageUrl}
                                            alt="User avatar"
                                            layout="responsive"
                                            width={100} 
                                            height={100}
                                            // cover
                                            objectFit="contain"
                                        />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <p className='text-accentColor text-xl mb-5'>{review.user.username}</p>
                                    <p className='text-xl mb-3'>{review.title}</p>
                                    <p className='font-light text-lg mb-5'>{review.content}</p>
                                    <div className='w-full flex justify-end font-light text-lg text-gray-300'>
                                        <p>{formatDate(review.createdAt)}</p>
                                    </div>
                                
                                </div>
                                
                            </div>
                        ))
                    ) : (
                        <div >No comments</div>
                    )}
                </div>

            </div>

            {/* //& FORM ADD REVIEW ----------------------------------------- */}
            <div>
                <div className=' w-full  border-b border-accentColor mb-14'>
                    <p className='text-2xl'> Leave a comment : </p>
                </div>
                <form className='bg-lightGrey py-10 px-7 w-full'>
                    <div className='flex flex-col mb-6 w-[50%]'>
                        <label htmlFor="title" className='text-xl'>Title <span className='text-accentColor'>*</span></label>
                        <input type="text" name="title" id="title" className='text-black bg-gray-200 focus:outline-none p-2' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label htmlFor="content" className='text-xl'>Content <span className='text-accentColor'>*</span></label>
                        <textarea name="content" id="content" cols={30} rows={5} className='text-black bg-gray-200 focus:outline-none p-2'></textarea>
                    </div>
                    <div>

                    <Button text="SEND" className="text-center" />
                    </div>
                </form>
            </div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}
                onChange= {() => clearErrors("title")}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" {...register("title")} />
                        {errors.title && <p>{errors.title.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="content">Content</label>
                        <textarea id="content" {...register("content")} />
                        {errors.content && <p>{errors.content.message}</p>}
                    </div>
                    <button type="submit">Add review</button>
                </form>
            </div>

            {/* //& SUGGESTIONS --------------------------------------------- */}

            <div className='flex flex-col justify-center items-center mt-24 '>
                <CursiveLabel text="Suggestions!" />
                {similarRecipes && similarRecipes.length > 0 ? (
                        <div className='w-full flex gap-10 mt-10'>
                            {similarRecipes.map((similarRecipe: Recipe, index: number) => (
                                <div key={similarRecipe.id || index} className='w-[20%] h-[300px]'>
                                    <div className='w-full h-[200px]'>
                                        {/* <Image
                                            src={getCldImageUrl({
                                                src: similarRecipe.image,
                                                width: 300,
                                                height: 200,
                                                crop: 'fit',
                                            })}
                                            alt={similarRecipe.name}
                                            fill
                                            className="object-cover"
                                        /> */}
                                    </div>
                                    <p className='text-xl'>{similarRecipe.name}</p>
                                </div>
                                ))}
                            </div>
                        ) : (
                        <div>No similar recipes found</div>
                    )}
            </div>



            {/* <p>Creation date: {new Date(recipe.createdAt).toLocaleDateString()}</p> */}
            <p> Date: {formatDate(recipe.createdAt)}</p>
           
        
            <p>Created by: {recipe.user?.username || 'Unknown'}</p>
            <p></p>

    

        </div>
    );
}

export default RecipePage;