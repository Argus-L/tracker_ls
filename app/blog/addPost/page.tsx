"use client";

import React from 'react'
import {Fragment, useRef} from 'react'
import {Toaster, toast} from 'react-hot-toast'
import {useRouter, usePathname} from 'next/navigation'

const submitPost = async ({title, location, skills, salary, company, description} : {title:string, location:string, skills:string, salary:number, company:string, description:string}, url: string) => {
  //const rootURL = url[0];
  const res = fetch(`/api/blog`, {
    method: "POST", 
    body: JSON.stringify({title, location, skills, salary, company, description}),
    //@ts-ignore
    "Content-Type":"application/json",
  });
  return (await res).json();
}

const AddPost = () => {
  
  const titleRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const skillsRef= useRef<HTMLInputElement | null>(null);
  const salaryRef = useRef<HTMLInputElement | null>(null);
  const companyRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (titleRef.current && locationRef.current && skillsRef.current && salaryRef.current && companyRef.current && descriptionRef.current) {
      toast.loading("Sending Request...", {id: "1"})
      await submitPost({
        title: titleRef.current?.value,
        location: locationRef.current?.value,
        skills: skillsRef.current?.value,
        salary: salaryRef.current?.valueAsNumber,
        company: companyRef.current?.value,
        description: descriptionRef.current?.value,
      }, pathname);
      toast.success("Job Posted Successfully", {id: "1"})
      router.push('/');
      router.refresh();
    }
  };

  return <Fragment>
    <Toaster />
    <div className="w-1/3 m-auto flex my-4">
      <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-200 font-bold p-3">Add a new job</p>
        <form onSubmit={handleSubmit}>
          <input ref={titleRef} placeholder="Enter job title" type="text" className="rounded-md px-4 py-2 w-full my-2"/>
          <input ref={locationRef} placeholder="Enter location" type="text" className="rounded-md px-4 py-2 w-full my-2"/>
          <input ref={skillsRef} placeholder="Enter skills" type="text" className="rounded-md px-4 py-2 w-full my-2"/>
          <input ref={salaryRef} placeholder="Enter salary" type="number" className="rounded-md px-4 py-2 w-full my-2"/>
          <input ref={companyRef} placeholder="Enter company" type="text" className="rounded-md px-4 py-2 w-full my-2"/>
          <textarea ref={descriptionRef} placeholder="Enter description" className="rounded-md px-4 w-full my-2"></textarea>
          <button className="font-semibold px-3 py-1 shadow-xl bg-slate-300 rounded-lg m-auto hover:bg-slate-100">Submit</button>
        </form>
      </div>
    </div>
  </Fragment>
}

export default AddPost