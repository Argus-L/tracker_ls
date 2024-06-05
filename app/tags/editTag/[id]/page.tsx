"use client";

import React, { useEffect } from 'react';
import {useRouter} from 'next/navigation'
import {Fragment, useRef} from 'react';
import { NEXT_URL } from '@/app/components/rootURL';
type UpdateTagParams = {
    id: number,
    name: string
}

const getTagById = async (id:number) => {
    const res = await fetch(`${NEXT_URL}/api/tags/${id}`);
    const data = await res.json();
    return data.tag;
}

const updateTag = async (data: UpdateTagParams) => {
    const res = fetch(`${NEXT_URL}/api/tags/${data.id}`, {
      method: "PUT", 
      body: JSON.stringify({name: data.name}),
      //@ts-ignore
      "Content-Type":"application/json",
    });
    return (await res).json();
}

const deleteTag = async (id: number) => {
    const res = fetch(`${NEXT_URL}/api/tags/${id}`, {
      method: "DELETE", 
      //@ts-ignore
      "Content-Type":"application/json",
    });
    return (await res).json();
}

export default function EditPost({params}:{params:{id:number}}) {
    const router = useRouter();
    const nameRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        getTagById(params.id).then((data) => {
            if(nameRef.current) {
                nameRef.current.value = data.name;
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, [params.id])

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (nameRef.current) {
            await updateTag({
            id:params.id,
            name: nameRef.current?.value
          });
          router.push('/tags/showTags');
          router.refresh();
        }
    };

    const handleDelete = async () => {
        await deleteTag(params.id);
        router.push('/tags/showTags');
        router.refresh();
    }

    return <Fragment>
    <div className="w-1/3 m-auto flex my-4">
      <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-200 font-bold p-3">Edit this tag</p>
        <form onSubmit={handleSubmit}>
          <input ref={nameRef} placeholder="Enter programming language" type="text" className="rounded-md px-4 py-2 w-full my-2"/>
          <div className="text-center">
            <button className="font-semibold px-3 py-1 shadow-xl bg-slate-300 rounded-lg mt-1 hover:bg-slate-100">Update</button>
          </div>
        </form>
        <button onClick={handleDelete} className="font-semibold px-4 py-1 shadow-xl bg-red-400 rounded-lg my-3 hover:bg-red-700">Delete</button>
      </div>
    </div>
    </Fragment>
}