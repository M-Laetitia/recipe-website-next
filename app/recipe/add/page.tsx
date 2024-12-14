'use client'
import { z } from "zod";
import { useForm ,} from "react-hook-form";
import { CldUploadWidget } from 'next-cloudinary'
import { useEffect, useState } from 'react';

const recipeSchema = z.object({
    name: z.string().min(5, { message: "Name must be at least 5 characters long" }).min(1,{ message: "Name is required" }),
    instruction: z.string().min(1, {message: "Description is required"}),
    duration: z.number({ required_error: "Cooking time field is missing" }).min(1, 'Cooking time must be greater than 0'),
    difficulty: z.string().min(1, { message: "Please select a difficulty" }),
    categoryId: z.string().min(1, 'Category is required'),
    selectedCategories: z.array(
        z.object({
            id: z.string(),
            isPrimary: z.boolean(),
            name: z.string(),
        })
    ).max(3),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

// INTERFACE : 
interface Category {
    id: string;
    name: string;
    isPrimary : boolean; 
}

const AddRecipe = () => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RecipeFormData>({
        defaultValues: {
            name: "",
            instruction: "",
            duration: 0,
            difficulty: "",
            categoryId: "",
            selectedCategories: [], // Type correctement inféré comme Category[]
        },
    });

    // const [secondcategories, setSecondCategories] = useState<{ id: string; name: string }[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [secondcategories, setSecondCategories] = useState<Category[]>([]);

    // État pour gérer les categs sélectionnés
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    // Filtrer les categs  disponibles en excluant ceux déjà sélectionnés
    const availableCategories = secondcategories.filter(
        category => !selectedCategories.some(selected => selected.id === category.id)
    );

    // Gérer l'ajout d'une nouvelle categ
    const handleCategoryAdd = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = event.target.value;
        if (!categoryId || selectedCategories.length >= 3) return;

        const categoryToAdd = secondcategories.find(category => category.id === categoryId);
        if (categoryToAdd) {
            // const newCategories = [...selectedCategories, categoryToAdd];
            const newCategories = [
                ...selectedCategories, 
                { id: categoryToAdd.id, isPrimary: categoryToAdd.isPrimary, name: categoryToAdd.name }
            ];
            setSelectedCategories(newCategories);
            setValue('selectedCategories', newCategories); // On passe l'objet complet
        }
        
        // Réinitialiser le select
        event.target.value = '';
    };

     // Gérer la suppression d'une categ
    const handleCategoryRemove = (categoryToRemove: Category) => {
        const newCategories = selectedCategories.filter(category => category.id !== categoryToRemove.id);
        setSelectedCategories(newCategories);
        setValue('selectedCategories', newCategories); // On passe l'objet complet
    };

    // Fetch datas 
    // category - primary :
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/category?main=true');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchCategories();
    }, []);

    // category - non primary :
    useEffect(() => {
        const fetchSecondCategories = async () => {
            try {
                const response = await fetch('/api/category?main=false');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }

                const data = await response.json();
                setSecondCategories(data);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchSecondCategories();
    }, []);


    const onSubmit = async (formData: RecipeFormData) => {
        console.log("Form Data Submitted:", formData);
        try {
            const validateData = recipeSchema.parse(formData);

            const response = await fetch("/api/recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validateData),
            });

            if (!response.ok) {
                throw new Error("Failed to add article");
              }
              
            console.log('check validateData', validateData )
            console.log('check formData', formData )
            console.log('check response', response )
            
            alert("Recipe added successfully!");

        } catch (error) {
            if (error instanceof z.ZodError) {
              // Gérer les erreurs de validation Zod
              error.errors.forEach((err) => {
                setError(err.path[0] as "name" | "instruction" | "difficulty" | "duration" | "categoryId" | "selectedCategories" , { 
                    message: err.message 
                });
            });
            } else {
                console.error(error);
            }
            
        }
    }

    return (
        <>
            <h1>Add a recipe</h1>

            <div className="flex flex-col">
                <form 
                    className="flex flex-col w-[30%]"
                    onSubmit={handleSubmit(onSubmit)}
                    onChange= {() => clearErrors("name")}
                    >
                    <label htmlFor="name">name:</label>
                    <input 
                    // {...register("name", { required: "Name is required" })} pas besoin de faire ça avec le react-hook-form ici car validation + précise avec Zod
                        {...register("name")}
                        placeholder="Enter the name of the recipe"
                        className="text-black"
                        id="name"
                        type= "text"

                        
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}


                    <label htmlFor="instruction">instruction</label>
                    <input 
                        {...register("instruction")}
                        placeholder="Enter the description"
                        className="text-black"
                        id="instruction"
                    />
                    {errors.instruction && <p className="text-red-500 text-sm mt-1">{errors.instruction.message}</p>}

                    <label htmlFor="duration">duration</label>
                    <input 
                        {...register("duration")}
                        placeholder="Enter the duration in minutes"
                        className="text-black"
                        id="duration"
                        type= "number"
                    />
                    {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}

                    <label htmlFor="difficulty">difficulty</label>
                    <select
                        {...register("difficulty")}
                        className="text-black"
                        id="difficulty"
                        
                        >
                        <option value="" disabled>Select a difficulty</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>   
                        <option value="4">4</option>
                        <option value="5">5</option>   
                    </select>
                    {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty.message}</p>}

                    <label htmlFor="category">Category</label>
                    <select 
                        {...register("categoryId")}
                        className="text-black"
                        id="category"
                    >
                        <option value="" disabled>Choose a category</option>
                        {categories.map((category: { id: string; name: string }) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                        ))}
                    </select>
                    {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}

                    <label htmlFor="categories">Categories</label>
                    <select 
                    onChange={handleCategoryAdd}
                    disabled={selectedCategories.length >= 3}
                    className="text-black"
                    id="categories"
                    >
                    <option value="">Add a category</option>
                    {availableCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                        {category.name}
                        </option>
                    ))}
                    </select>
                    {errors.selectedCategories && <p className="text-red-500 text-sm mt-1">{errors.selectedCategories.message}</p>}

                    <div className="flex gap-2 flex-wrap">
                        {selectedCategories.map((category) => (
                        <div 
                            key={category.id}
                            className="flex items-center gap-1 text-black bg-gray-200 px-2 py-1 rounded"
                        >
                            <span>{category.name}</span>
                            <button
                            type="button"
                            onClick={() => handleCategoryRemove(category)}
                            className="text-red-500"
                            >
                            ×
                            </button>
                        </div>
                        ))}
                    </div>


                    <br />
                    <button type="submit">Add recipe</button>
                </form>

            </div>

            {/* Form > name / instruction / duration / difficulty / image ? / slug / userId / steps / tools / ingredients /  */}


        </>
    )
}

export default AddRecipe