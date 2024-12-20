"use client"
import { z } from "zod";
import { useForm ,} from "react-hook-form";
import React, { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';
import { getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';
import Tag from '@/components/Tag';
import CursiveLabel from '@/components/CursiveLabel';
import toast, { Toaster } from 'react-hot-toast';

// type Params = {
//     articleId: string;
//   };

type Article = {
    id: string;
    title: string;
    content: string;
    createdAt: Date; 
    image: string;
    user: User;
    comments : Comment[];
    tags:  {
        tag: {
            id: string;
            name: string;
        }
    }[];
};
type Tag = {
    id?: string;
    tag: {
      name: string;
    };
};

type Comment = {
    id: string;
    content: string;
    createdAt: Date;
    user : User;
};

type User = {
    id: string,
    username: string,
    imageUrl : string;
    publicMetadata: {
        bio: string;
        quote: string;
    }
};

type Props = {
    params: Promise<{ articleId: string }>
}

const commentSchema = z.object({
    content: z.string().min(1, {message: "Content is required"}),
});

type commentSchema = z.infer<typeof commentSchema>;
  
const ArticlePage = ({ params }: Props) => {
    const [article, setArticle] = useState<Article | null>(null); // Initialisation avec null
    // const { articleId } = params; 
    const [articleId, setArticleId] = useState<string | null>(null); // Ajouter un état pour articleId
    const [commentCount, setCommentCount] = useState(0);

    const {
        register,
        handleSubmit,
        setError, 
        clearErrors,
        setValue,
        formState: { errors }
        } = useForm({
        defaultValues: {
            content: "",
        }
    });

    useEffect(() => {
        // Résoudre la promesse de params et extraire articleId
        const fetchArticleId = async () => {
          const resolvedParams = await params;
          setArticleId(resolvedParams.articleId); // Mettre à jour articleId
        };
        
        fetchArticleId();
      }, [params]); // Mettre à jour l'effet lorsque params change

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`/api/article/${articleId}`);
            const data = await response.json();
            console.log(data); 
            setArticle(data);
            console.log('data article', data);

            setCommentCount(data.comments.length);
        };

        if (articleId) {
        fetchRecipe();
        }

    }, [articleId]);
    // }, [params.recipeId]);

    const onSubmit = async (formData: commentSchema) => {
        try {

            const toastId = toast.loading('Your comment is being added...');

            const validateData = commentSchema.parse(formData);
            const response = await fetch(`/api/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...validateData, articleId }), 
            });

            if (response.ok) {
                toast.success('Your comment has been added !', {
                    id: toastId,
                    duration: 3000, 
                });
                
                setTimeout(() => {
                    location.reload();
                }, 4000);

            } else {
                console.error('Error when adding the comment');
            }
        } catch (error) {
            console.error('Error when adding the comment:', error);
        }

    }


    if (!article) {
        return <p>Loading article...</p>;
    }

    return (
        <>
        <section className='bg-blackColor'>
            <div className='w-full h-[600px]'>
            <figure className="bg-blackColor w-full h-full relative">
                <Image
                    src={getCldImageUrl({
                        src: article.image,
                        width: 2000,
                        height: 1441,
                        crop: 'fit',
                    })}
                    alt={article.title}
                    fill
                    className="object-cover filter brightness-75"
                />
                {/* inset-0 positionne le div sur toute la surface de la figure */}
                {/* <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div> */}
            </figure>
            </div>

            <article className=' w-[65%] m-auto translate-y-[-100px] '>
                <div className='bg-[#162429]  py-12 px-14 '>
                    <div className='flex items-center justify-center gap-4 mt-6'>
                        <h1 className='text-4xl font-light uppercase tracking-[3px]'>{article.title}</h1>
                        <Image 
                        src = "/img/zigzag.svg"
                        width={120}
                        height={30}
                        objectFit="contain"
                        alt= "zigzag icon"
                        />
                    </div>

                    <p className='text-lg uppercase font-light text-accentColor mt-10 mb-7'>{formatDate(article.createdAt)}</p>

                    <div className='text-xl font-light'>
                        <p>{article.content}</p><br />
                        <p>Et eveniet mollitia sit enim labore qui harum totam et minus nemo sed iste maxime. Cum accusantium consequuntur sed sapiente nobis est reiciendis eius. Non vitae quasi id nisi tempore et voluptatem error ut voluptatum temporibus id iusto omnis ut voluptatem dicta ab voluptas optio. Et corrupti delectus et consequuntur illum sit cumque commodi.vel sequi excepturi. In voluptatem eveniet sit aperiam praesentium ab internos corrupti quo nobis quibusdam est assumenda dignissimos qui maxime ullam est facere dolor.</p><br />
                        <p>Lorem ipsum dolor sit amet. Qui illo velit et ipsam dolor 33 cupiditate omnis et quos dolore. At reiciendis tempora non quod veniam ut galisum velit et vero nostrum sed dicta iusto vel voluptatem doloribus vel sequi excepturi. In voluptatem eveniet sit aperiam praesentium ab internos corrupti quo nobis quibusdam est assumenda dignissimos qui maxime ullam est facere dolor.Est saepe error vel incidunt corrupti ut expedita veritatis et saepe necessitatibus. In veritatis veritatis qui consequuntur animi At laboriosam eaque qui quisquam voluptate a voluptatum quibusdam? Ea quasi quia sed facilis quasi sit voluptatem delectus et voluptatem dolorem ut repudiandae maiores. Qui autem ullam ex quod quia sit quasi quia ut repellendus mollitia.</p><br />
                        <p>Ea consequatur maxime aut obcaecati libero vel nihil ipsum aut quasi iste qui recusandae earum non suscipit dolore. Aut fuga perspiciatis et voluptatum debitis et error voluptas est esse error!</p>
                    </div>

                    
                    <div className='flex gap-3 mt-12 mb-16'>
                        { article && article.tags.length > 0 ? (
                            article.tags.map((tag: Tag, index: number) => (
                            <Tag 
                                key={tag.id || index}
                                text={`#${tag.tag.name}`} 
                            />
                            ))
                        ) : (
                            <div >No tags available</div>
                        )}
                    </div>

                </div>

                <div className=' w-full mt-5 border-t pt-8 border-accentColor flex gap-11 items-center'>
                   
                    <div className='w-[150px] h-[150px] rounded-full overflow-hidden'>
                        <Image
                            src= {article.user.imageUrl}
                            alt="User avatar"
                            layout="responsive"
                            width={150} 
                            height={150}
                            objectFit="contain"
                        />
                    </div>

                    <div>
                        <div className='text-2xl uppercase font-light '>{article.user.username}</div>
                        <p className='text-xl font-light'>{article.user.publicMetadata.bio}</p>
                        <div className='flex mt-3 gap-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accentColor)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote -scale-x-100"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>
                            <p className='italic'>{article.user.publicMetadata.quote}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accentColor)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>
                        </div>
                        
                    </div>
                 
                </div>
                    
            </article>

            {/* //& COMMENTS ------------------------------------------------ */}
            <div className='w-[65%] m-auto flex flex-col justify-center items-center mt-7 '>
               
                    <CursiveLabel text="Share your thoughts !" />
                    <div className=' w-full  border-b border-accentColor'>
                        <p className='text-2xl'> {commentCount} Comments</p>
                    </div>

                    <div className='w-full mt-14'>
                        { article && article.comments.length > 0 ? (
                            article.comments.map((comment: Comment, index: number) => (
                                <div key={comment.id || index} className='flex mb-10 gap-10 bg-lightGrey p-5'>
                                    <div>
                                        <div className='w-[100px] h-[100px]'>
                                            <Image
                                                src= {comment.user.imageUrl}
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
                                        <p className='text-accentColor text-xl mb-5'>{comment.user.username}</p>
                                        <p className='font-light text-lg mb-5'>{comment.content}</p>
                                        <div className='w-full flex justify-end font-light text-lg text-gray-300'>
                                            <p>{formatDate(comment.createdAt)}</p>
                                        </div>
                                    
                                    </div>
                                    
                                </div>
                            ))
                        ) : (
                            <div >No comments</div>
                        )}
                    </div>

                

                 {/* //& FORM ADD REVIEW ----------------------------------------- */}
            
                <div className=' w-full  border-b border-accentColor mb-14'>
                    <p className='text-2xl'> Leave a comment : </p>
                </div>
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    // onChange= {() => clearErrors("title")}
                    className='bg-lightGrey py-10 px-7 w-full'
                >
                    <div className='flex flex-col mb-6'>
                        <label htmlFor="content" className='text-xl'>Content <span className='text-accentColor'>*</span></label>
                        <textarea id="content" cols={30} rows={5} {...register("content")} 
                        className='text-black bg-gray-200 focus:outline-none p-2'></textarea>
                        {errors.content && <p>{errors.content.message}</p>}
                    </div>
                    <div>
                    <button
                        className='bg-accentColor inline-block px-6 py-3.5 font-medium uppercase text-base tracking-widest cursor-pointer hover:bg-[#E59B62] transition ease-in-out delay-150'
                        type="submit">
                        Add comment
                        </button>
                    {/* <Button text="ADD REVIEW" className="text-center" /> */}

                    </div>
                </form>
            </div>

            <div>

            </div>

        </section>

        </>
    )
}

export default ArticlePage