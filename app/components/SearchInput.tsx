"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
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
    const locationArr = [''];
    const companiesArr = [''];
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const {data: locationData} = useSWR(`${NEXT_URL}/api/filter/location`, fetchFilterOptions)
    const {data: companyData} = useSWR(`${NEXT_URL}/api/filter/company`, fetchFilterOptions)

    locationData?.locations.forEach((obj:any) => {
        locationArr.push(obj.location);
    });

    companyData?.companies.forEach((obj:any) => {
        companiesArr.push(obj.company);
    });

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
                <label>
                    Min Salary:
                    <input 
                        type = "number"
                        className = "text-black py-1 px-1 text-center rounded-md m-1"
                        onChange={setMinSalary}
                    />
                </label>
                <label>
                    Max Salary:
                    <input 
                        type = "number"
                        className = "text-black py-1 px-1 text-center rounded-md m-1"
                        onChange={setMaxSalary}
                    />
                </label>
            </div>
        </div>
    )
}