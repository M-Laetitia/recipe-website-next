'use client';

// import { useEffect, useState } from 'react';
import { z } from 'zod';
// FieldError, UseFormRegister
import { useForm } from 'react-hook-form';

// crée un schéma de validation pour un objet.
// Validation avec Zod : champ requis et longueur minimum de 3 caractères
const tagSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .min(1, { message: 'Name is required' }),
});

// utilise Zod pour inférer automatiquement le type TypeScript du schéma tagSchema. Cela crée un type TagSchema qui correspond à l'objet que tagSchema valide (ici, un objet avec une propriété name de type string).
// Cette approche garantit que TagSchema correspond à la structure des données validées, et elle permet d'éviter des erreurs de type lors de l'utilisation de ces données dans le reste de l'application.
type TagSchema = z.infer<typeof tagSchema>;

const AddTag = () => {
  // useForm : hook fourni par react-hook-form pour gérer le formulaire.
  const {
    register, // permet de lier les entrées de formulaire aux champs gérés par react-hook-form
    handleSubmit, //  utilisé pour gérer l'envoi du formulaire, et elle prend la fonction onSubmit en paramètre.
    setError, // Permet de définir des erreurs de validation manuellement (ici, si Zod renvoie une erreur, on l'utilise pour afficher le message sous le champ).
    clearErrors, // Permet de supprimer les erreurs
    watch, // Permet de suivre les valeurs des champs du formulaire en temps réel.
    formState: { errors }, // Contient les erreurs du formulaire, permettant de les  afficher si des erreurs sont détectées.
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  console.log(watch('name')); // you can watch individual input by pass the name of the input

  // onSubmit reçoit les données du formulaire sous la forme de formData (de type TagSchema).
  const onSubmit = async (formData: TagSchema) => {
    try {
      //  Cette ligne valide les données du formulaire en les passant par le schéma Zod. Si la validation échoue (par exemple si name a moins de 3 caractères ou est vide), Zod lancera une exception ZodError.
      const validatedData = tagSchema.parse(formData);

      // Si la validation réussit, les données sont envoyées au serveur via fetch. Le corps de la requête est constitué des données validées
      const response = await fetch('/api/tag', {
        // Cette requête envoie les données au serveur en utilisant la méthode POST.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to add tag');
      }

      alert('Tag added successfully!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Gérer les erreurs de validation Zod
        error.errors.forEach((err) => {
          if (err.path[0] === 'name') {
            setError('name', { message: err.message });
          }
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <h1>Add a tag</h1>
      <p>Add the name:</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => clearErrors('name')} // Supprimer les erreurs à la modification
      >
        <label>Name</label>
        <input {...register('name')} placeholder="Enter tag name" />

        {/* <input
                    {...register("exampleRequired", { required: true, maxLength: 10 })}
                />
                {errors.exampleRequired && <p>This field is required</p>}
                <input type="submit" /> */}

        {/* Affiche le message d'erreur Zod sous l'input */}
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}

        <button type="submit">Add Tag</button>
      </form>
    </>
  );
};

export default AddTag;
