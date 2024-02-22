"use client";

import { useSearchParams } from "next/navigation";
import useSWR from 'swr';

const fetchPosts = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};

const SearchPage = () => {
    const search = useSearchParams();
    const searchQuery = search ? search.get('query') : null;
    const {data, isLoading, error, isValidating} = useSWR(`/api/search?query=${searchQuery}`, fetchPosts);

    console.log('HERE IS DATA', data, searchQuery);

    return (
        <div>SEARCH PAGE</div>
    );
};

export default SearchPage;