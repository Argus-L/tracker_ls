"use client";

import React, { useEffect } from 'react'
import {Fragment, useRef} from 'react'
import {Toaster, toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import { NEXT_URL } from '@/app/components/rootURL';
type UpdatePostParams = {
    id: number,
    title:string, 
    location:string, 
    skills:string, 
    salary:number, 
    company:string, 
    description:string
}

const updatePost = async (data: UpdatePostParams) => {
  const res = fetch(`${NEXT_URL}/api/blog/${data.id}`, {
    method: "PUT", 
    body: JSON.stringify({title: data.title, location: data.location, skills: data.skills, salary: data.salary, company: data.company, description: data.description}),
    //@ts-ignore
    "Content-Type":"application/json",
  });
  return (await res).json();
}

const deletePost = async (id: number) => {
    const res = fetch(`${NEXT_URL}/api/blog/${id}`, {
      method: "DELETE", 
      //@ts-ignore
      "Content-Type":"application/json",
    });
    return (await res).json();
  }

const getPostById = async (id:number) => {
    const res = await fetch(`${NEXT_URL}/api/blog/${id}`);
    const data = await res.json();
    return data.post;
}

const EditPost = ({ params }:{ params:{ id : number }}) => {
    console.log(params.id);
  
  const titleRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const skillsRef= useRef<HTMLInputElement | null>(null);
  const salaryRef = useRef<HTMLInputElement | null>(null);
  const companyRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  useEffect(()=> {
    toast.loading("Fetching Job Details...", {id: "1"});
    getPostById(params.id).then((data) => {
        if(titleRef.current && locationRef.current && skillsRef.current && salaryRef.current && companyRef.current && descriptionRef.current) {
            titleRef.current.value = data.title;
            locationRef.current.value = data.location;
            skillsRef.current.value = data.skills;
            salaryRef.current.value = data.salary;
            companyRef.current.value = data.company;
            descriptionRef.current.value = data.description;
            toast.success("Fetching Complete", {id: "1"});
        }
    })
    .catch((err) => {
        console.log(err);
        toast.error("Error fetching job", {id: "1"});
    });
  }, [params.id])

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (titleRef.current && locationRef.current && skillsRef.current && salaryRef.current && companyRef.current && descriptionRef.current) {
      toast.loading("Sending Request...", {id: "1"})
        await updatePost({
        id:params.id,
        title: titleRef.current?.value,
        location: locationRef.current?.value,
        skills: skillsRef.current?.value,
        salary: salaryRef.current?.valueAsNumber,
        company: companyRef.current?.value,
        description: descriptionRef.current?.value,
      });
      toast.success("Job Posted Successfully", {id: "1"})
      router.push('/');
      router.refresh();
    }
  };

  const handleDelete = async () => {
    toast.loading("Deleting Post", {id: "2"});
    await deletePost(params.id);
    toast.success("Job Deleted", {id: "2"});
    router.push('/');
    router.refresh();
  }

  return <Fragment>
    <Toaster />
    <div className="w-1/3 m-auto flex my-4">
      <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-200 font-bold p-3">Edit this job</p>
        <form onSubmit={handleSubmit}>
          <input ref={titleRef} placeholder="Enter job title" type="text" className="rounded-md px-4 py-2 w-full my-2"/>
          <input ref={locationRef} placeholder="Enter location" type="text" className="rounded-md px-4 py-2 w-full my-2"/>
          <input ref={skillsRef} placeholder="Enter skills" type="text" className="rounded-md px-4 py-2 w-full my-2"/>
          <input ref={salaryRef} placeholder="Enter salary" type="number" className="rounded-md px-4 py-2 w-full my-2"/>
          <input ref={companyRef} placeholder="Enter company" type="text" className="rounded-md px-4 py-2 w-full my-2"/>
          <textarea ref={descriptionRef} placeholder="Enter description" className="rounded-md px-4 w-full my-2"></textarea>
          <div className="text-center">
            <button className="font-semibold px-3 py-1 shadow-xl bg-slate-300 rounded-lg mt-1 hover:bg-slate-100">Update</button>
          </div>
        </form>
        <button onClick={handleDelete} className="font-semibold px-4 py-1 shadow-xl bg-red-400 rounded-lg my-3 hover:bg-red-700">Delete</button>
      </div>
    </div>
  </Fragment>
}

export default EditPost