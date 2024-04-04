"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect, useRef } from 'react';
import { NEXT_URL } from '@/app/components/rootURL';
import useSWR from 'swr';


const fetchFilterOptions = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error ("Failed to fetch")
    }
    return res.json();
};


export default function SearchInput({placeholder}: {placeholder:string}) {
    const [selectedSortBy, setSelectedSortBy] = useState('id');
    const [selectedFilterBy, setSelectedFilterBy] = useState('');
    const [selectedFilterOptions, setSelectedFilterOptions] = useState('');
    const [initOptions, setInitOptions] = useState(['']);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const {data} = useSWR(`${NEXT_URL}/api/filter?filterBy=${selectedFilterBy}`, fetchFilterOptions)

    useEffect(()=> {
        if(selectedFilterBy == '') {
            setInitOptions([''])
        } else if (selectedFilterBy == 'location') {
            const arr:any = [];
            data?.optionsByFilter.forEach((obj:any) => {
                arr.push(obj.location);
            })
            setInitOptions(arr);
        } else if (selectedFilterBy == 'company') {
            const arr:any = [];
            data?.optionsByFilter.forEach((obj:any) => {
                arr.push(obj.company);
            })
            setInitOptions(arr);
        }
    }, [selectedFilterBy, data?.optionsByFilter]);

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 400);

    const updateSelectedSortBy = (e:any) => {
        const params = new URLSearchParams(searchParams);
        setSelectedSortBy(e.target.value);
        params.set("sortBy", e.target.value);
        replace(`${pathname}?${params.toString()}`);
    }

    const updateSelectedFilterBy = async (e:any) => {
        const params = new URLSearchParams(searchParams);
        setSelectedFilterBy(e.target.value);
        params.set("filterBy", e.target.value);
        params.set("filterOption", "");
        replace(`${pathname}?${params.toString()}`);
    }

    const updateSelectedFilterOptions = async (e:any) => {
        const params = new URLSearchParams(searchParams);
        setSelectedFilterOptions(e.target.value);
        params.set("filterOption", e.target.value);
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className ="flex justify-center w-2/5 flex-col">
            <div className ="flex justify-center w-full">
                <label htmlFor="search" className="sr-only">Search</label>
                <input 
                    className="py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-slate-200 bg-slate-800 focus:bg-black rounded-lg focus:outline-none focus:ring-[1px] focus:ring-slate-500 placeholder:text-slate-200"
                    placeholder={placeholder}
                    onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
                />
            </div>
            <div className = "flex justify-center w-3/4 m-auto">
                <label className="text-slate-200">
                    {/*get list of jobs and order by option*/}
                    Sort by:
                    <select 
                        className = "text-black py-1 text-center rounded-md m-1"
                        value={selectedSortBy}
                        onChange={(e=> updateSelectedSortBy(e))}>
                            <option value="id">All</option>
                            <option value="location">Location</option>
                            <option value="salary">Salary</option>
                            <option value="company">Company</option>
                            <option value="createdAt">Date Created</option>
                            <option value="updatedAt">Date Updated</option>
                    </select>
                </label>
                <label className="text-slate-200">
                    {/*select the category by which you will filter, loop through category and return an array of the unique values for the options of the next drop down*/}
                    Filter by:
                    <select 
                        className = "text-black py-1 text-center rounded-md m-1"
                        value={selectedFilterBy}
                        onChange={(e=> updateSelectedFilterBy(e))}
                        >
                            <option value="">All</option>
                            <option value="location">Location</option>
                            <option value="company">Company</option>
                    </select>
                </label>
                <label className="text-slate-200">
                    {/*filters by category*/}
                    <select 
                        className = "text-black py-1 px-1 text-center rounded-md m-1"
                        value={selectedFilterOptions}
                        onChange={updateSelectedFilterOptions}>
                            {initOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                    </select>
                </label>
            </div>
        </div>
    )
}