"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import { NEXT_URL } from '@/app/components/rootURL';
import AsyncSelect from 'react-select'
import useSWR from 'swr';

const fetchData = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error ("Failed to fetch")
    }
    return res.json();
};

export default function SearchInput({placeholder}: {placeholder:string}) {
    const locationArr = [''];
    const companiesArr = [''];
    const tagArr: string [] = [];
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const {data: locationData} = useSWR(`${NEXT_URL}/api/filter/location`, fetchData)
    const {data: companyData} = useSWR(`${NEXT_URL}/api/filter/company`, fetchData)
    const {data: tagData} = useSWR(`${NEXT_URL}/api/tags`, fetchData)

    locationData?.locations.forEach((obj:any) => {
        locationArr.push(obj.location);
    });

    companyData?.companies.forEach((obj:any) => {
        companiesArr.push(obj.company);
    });

    tagData?.tags.forEach((obj:any) => {
        tagArr.push(obj.name);
    })

    const finalTagArr = tagArr.map(str => ({label: str, value: str}));

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    const updateSelectedSortBy = async (e:any) => {
        const params = new URLSearchParams(searchParams);
        params.set("sortBy", e.target.value);
        replace(`${pathname}?${params.toString()}`);
    }

    const updateLocationFilter = async (e:any) => {
        const params = new URLSearchParams(searchParams);
        params.set("locationFilter", e.target.value);
        replace(`${pathname}?${params.toString()}`);
    }

    const updateCompanyFilter = async (e:any) => {
        const params = new URLSearchParams(searchParams);
        params.set("companyFilter", e.target.value);
        replace(`${pathname}?${params.toString()}`);
    }

    const setMinSalary = useDebouncedCallback(async  (e:any) => {
        const params = new URLSearchParams(searchParams);
        params.set("minSalary", e.target.value);
        replace(`${pathname}?${params.toString()}`);
    }, 500)

    const setMaxSalary = useDebouncedCallback(async (e:any) => {
        const params = new URLSearchParams(searchParams);
        params.set("maxSalary", e.target.value);
        replace(`${pathname}?${params.toString()}`);
    }, 500)

    const updateTagFilter = async (selectedOption:any) => {
        const params = new URLSearchParams(searchParams);
        const tagNames: string[] = [];
        selectedOption.forEach((obj:any) => {
            tagNames.push(obj.value)
        })
        params.set("tags", tagNames.join(' '));
        replace(`${pathname}?${decodeURIComponent(params.toString())}`);
    }

    return (
        <div className ="flex justify-center w-full flex-col">
            <div className ="flex w-3/5 m-auto">
                <input 
                    className="py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-slate-200 bg-slate-800 focus:bg-black rounded-lg focus:outline-none focus:ring-[1px] focus:ring-slate-500 placeholder:text-slate-200"
                    placeholder={placeholder}
                    onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
                />
            </div>
            <div className = "flex w-full m-auto">
                <label className="text-slate-200">
                    {/*get list of jobs and order by option*/}
                    Sort by:
                    <select 
                        className = "text-black py-1 text-center rounded-md m-1"
                        onChange={(updateSelectedSortBy)}>
                            <option value="id">All</option>
                            <option value="location">Location</option>
                            <option value="salary">Salary</option>
                            <option value="company">Company</option>
                            <option value="createdAt">Date Created</option>
                            <option value="updatedAt">Date Updated</option>
                    </select>
                </label>
                <label className="text-slate-200">
                    Location:
                    {/*Location Filter Dropdown*/}
                        <select
                            className = "text-black py-1 px-1 text-center rounded-md m-1"
                            onChange={updateLocationFilter}>
                                {locationArr.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                </label>
                <label className="text-slate-200">
                    Company:
                    {/*Location Filter Dropdown*/}
                        <select
                            className = "text-black py-1 px-1 text-center rounded-md m-1"
                            onChange={updateCompanyFilter}>
                                {companiesArr.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                </label>
                <label className="text-slate-200">
                    Min Salary:
                    <input 
                        type = "number"
                        className = "text-black py-1 px-1 text-center rounded-md m-1"
                        onChange={setMinSalary}
                    />
                </label>
                <label className="text-slate-200">
                    Max Salary:
                    <input 
                        type = "number"
                        className = "text-black py-1 px-1 text-center rounded-md m-1"
                        onChange={setMaxSalary}
                    />
                </label>
                <div className="w-1/5">
                <label className="text-slate-200 flex">
                    Tags:
                        <AsyncSelect
                            isMulti
                            options = {finalTagArr}
                            className = "text-black py-1 px-1 text-center rounded-md w-3/5"
                            onChange = {updateTagFilter}
                        />
                </label>
                </div>
            </div>
        </div>
    )
}