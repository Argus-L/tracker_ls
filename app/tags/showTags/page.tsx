"use client";
import { NEXT_URL } from '@/app/components/rootURL';
import React, {useState} from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import TagDelete from '@/app/components/tagDelete';
import useSWR from 'swr';


const getTags = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error ("Failed to fetch")
    }
    return res.json();
};

const createTag = async ({name}: {name:string}) => {
    const res = fetch(`${NEXT_URL}/api/tags`, {
        method: "POST",
        body: JSON.stringify({name}),
        //@ts-ignore
        "Content-Type":"application/json",
    });
    return (await res).json();
}

export default function ShowTags () {
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            await createTag({name: inputValue})
            location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    const {data: tagData, isLoading} = useSWR(`${NEXT_URL}/api/tags`, getTags)

    if (isLoading) {
        return <div>Loading data...</div>
    }

    return (
        <div className="flex flex-col min-w-full align-middle p-5">
            EDIT TAGS PAGE
            <form onSubmit={handleSubmit}>
                <input 
                    className="py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-slate-200 bg-slate-800 focus:bg-black rounded-lg focus:outline-none focus:ring-[1px] focus:ring-slate-500 placeholder:text-slate-200" 
                    type="text"
                    onChange = {(e)=> {setInputValue(e.target.value)}}
                />
                <button className="font-semibold px-3 py-1 shadow-xl bg-slate-300 rounded-lg m-auto my-3 hover:bg-slate-100" type = "submit">Add Tag</button>
            </form>
            <table className="min-w-full text-gray-100 md:table">
                <thead className="text-left border">
                    <tr>
                        <th scope = "col" className="border">
                            Programming Language Tag
                        </th>
                        <th scope = "col" className="border">
                            Edit/Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tagData.tags.map((tag:any) => (
                        <tr key = {tag.id} className="border">
                            <td className="border">
                                <p>{tag.name}</p>
                            </td>
                            <td className="border">
                                <Link href={`/tags/editTag/${tag.id}`} className="px-3 py-1.5 mx-2 text-center bg-slate-200 rounded-md font-semibold text-black">Edit</Link>
                                <TagDelete id={tag.id}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}