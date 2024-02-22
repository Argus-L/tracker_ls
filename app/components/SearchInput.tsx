"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import { ReactHTML, ReactHTMLElement } from "react";

export default function SearchInput({placeholder}: {placeholder:string}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
        //router.push(`/search?${params.toString()}`);
    }, 400);

    return (
        <div className ="flex justify-center w-2/5">
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
    )
}