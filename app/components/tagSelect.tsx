"use client";

import AsyncCreatableSelect from 'react-select/creatable'
import useSWR from 'swr';
import { NEXT_URL } from '@/app/components/rootURL';
import { useEffect } from 'react';
import {useRouter} from 'next/navigation'


const fetchData = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error ("Failed to fetch")
    }
    return res.json();
  };

const createTag = async (name:string) => {
    const res = fetch(`${NEXT_URL}/api/tags`, {
        method: "POST",
        body: JSON.stringify({name}),
        //@ts-ignore
        "Content-type": "application/json",
    });
    return (await res).json();
}

const getTags= async () => {
    const res = fetch(`${NEXT_URL}/api/tags`, {
        method: "GET"
    });
    const data = (await res).json();
    return data;
}

export default function TagSelect() {

    const router = useRouter();
    const tagOptions: string[] = [];
    const {data: tagData} = useSWR(`${NEXT_URL}/api/tags`, fetchData)

    tagData?.tags.forEach((obj:any) => {
        tagOptions.push(obj.name)
    })
    const usableTagOptions = tagOptions.map(str => ({label: str, value: str}));

    const onChange = async (value: any, metaAction:any) => {
        console.log("updateTags", value);
    };

    const handleCreateAPI = async (inputValue: string) => {
        await createTag(inputValue);
    }

    const handleCreateOption = (inputValue: string) => (
        {
            label: inputValue,
            value: inputValue,
        }
    )

    const defV = {label: "CSS", value: "CSS"}

    return (
        <AsyncCreatableSelect 
            isMulti
            isClearable
            placeholder = "Add or create programming language tags"
            onChange = {onChange}
            getNewOptionData = {handleCreateOption}
            //onCreateOption={handleCreateAPI}
            options = {usableTagOptions}
            defaultValue={defV}
            />
    )
}