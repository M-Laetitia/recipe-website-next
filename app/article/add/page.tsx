'use client'

import { z } from "zod";
import { useForm ,} from "react-hook-form";
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image';
import { useState } from 'react';

const articleSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters long" }).min(1,{ message: "Title is required" }),
    content: z.string().min(1, {message: "Content is required"}),
    image: z.string().optional(),
});

type ArticleSchema = z.infer<typeof articleSchema>

const AddArticle = () => {
    const {
        register,
        handleSubmit,
        setError, 
        clearErrors,
        watch, 
        setValue,
        formState: { errors }
      } = useForm({
        defaultValues: {
          title: "",
          content: "",
          image: "",
        }
    });
    
    console.log(watch("title"));

    // État pour stocker temporairement l'image sélectionnée
    const [selectedImage, setSelectedImage] = useState<any>(null);
    // État pour l'aperçu de l'image
    const [previewUrl, setPreviewUrl] = useState<string>('');
     // État pour stocker le nom de l'image Cloudinary
     const [imagename, setImageName] = useState<string>('');

    const onSubmit = async (formData: ArticleSchema) => {
        try {

           // Si une image est sélectionnée, on l'upload d'abord
           let imageData = null;
           if (selectedImage) {
               // Création d'une FormData pour l'upload
               const uploadData = new FormData();
               uploadData.append('file', selectedImage);
               uploadData.append('upload_preset', 'recipe-website-preset');
               
               // Upload vers Cloudinary
               const uploadResponse = await fetch(
                   `https://api.cloudinary.com/v1_1/dnaj562e7/image/upload`,
                   {
                       method: 'POST',
                       body: uploadData
                   }
               );

               imageData = await uploadResponse.json();

               console.log("imgData", imageData)
               
               // On ajoute l'URL de l'image aux données du formulaire
               formData.image = imagename; 
           }


            const validateData = articleSchema.parse(formData);

            const response = await fetch("/api/article", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validateData),
            });

            console.log("step à valider", validateData)

            if (!response.ok) {
                throw new Error("Failed to add article");
              }
            
            alert("Article added successfully!");
            
        } catch (error) {
            if (error instanceof z.ZodError) {
              // Gérer les erreurs de validation Zod
              error.errors.forEach((err) => {
                if (err.path[0] === "title") {
                  setError("title", { message: err.message });
                }
                if (err.path[0] === "content") {
                  setError("content", { message: err.message });
                }
                if (err.path[0] === "image") {
                  setError("image", { message: err.message });
                }
              });
            } else {
              console.error(error);
            }
          }
    };

    // Gestion de la sélection d'image
    const handleImageSelect = (result: any) => {
      // On stocke les informations de l'image temporairement
      setSelectedImage(result.info);
      // On affiche un aperçu
      setPreviewUrl(result.info.secure_url);
      setImageName(result.info.original_filename);
      setValue('image', result.info.public_id); // Met à jour le champ image du formulaire
    };
  
   
    return (
        <>
        <h1>Add an article</h1>
        <div className=" border border-solid border-[red">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                onChange= {() => clearErrors("title")}
                >
                <label>Title</label>
                <input 
                    {...register("title")}
                    placeholder="Enter the article title"
                    className="text-black"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}

                <label>Content</label>
                <input 
                    {...register("content")}
                    placeholder="Enter the article content"
                    className="text-black"
                />
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            
                <label>Image</label>
                    <CldUploadWidget
                        uploadPreset="recipe-website-preset"
                        onSuccess={handleImageSelect}
                    >
                      {({ open }) => (
                          <div>
                              <button 
                                  type="button" // Important : type="button" pour éviter le submit du form
                                  onClick={() => open()}
                                  className="border p-2 rounded-md hover:bg-gray-100"
                              >
                                  Sélectionner une image
                              </button>
                              
                              {previewUrl && (
                                  <div className="mt-4">
                                      <Image
                                          src={previewUrl}
                                          alt="Image preview"
                                          width={200}
                                          height={200}
                                          className="rounded-md"
                                      />
                                  </div>
                              )}
                          </div>
                      )}
                    </CldUploadWidget>

                   {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}

                <br />
                <button type="submit">Add article</button>


            </form>

        </div>
        </>
    )
}

export default AddArticle;