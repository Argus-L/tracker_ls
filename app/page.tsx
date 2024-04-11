export const dynamic = "force-dynamic";
import SearchInput from './components/SearchInput';
import { Suspense } from 'react';
import Table from '@/app/components/table';
import Toggle from '@/app/components/toggle';
import ListView from '@/app/components/listView';
import { NEXT_URL } from '@/app/components/rootURL';

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?:string;
    page?:string;
    sortBy?:string;
    filterBy?:string;
    filterOption?:string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const sortBy = searchParams?.sortBy || '';
  const filterBy = searchParams?.filterBy || '';
  const filterOption = searchParams?.filterOption || '';
  

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg bg-slate-800 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold font-family[verdana]">Job Tracker</h1>
      </div>
      <div className="flex flex-col items-center w-full">
          <SearchInput placeholder="Search..." />
      </div>
      <Toggle>
        <Suspense key={query + currentPage + sortBy + filterBy + filterOption}>
          <Table query={query} currentPage={currentPage} sortBy={sortBy} filterBy={filterBy} filterOption={filterOption}/>          
        </Suspense>
        <Suspense key={query + currentPage + sortBy + filterBy + filterOption}>
          <ListView query={query} currentPage={currentPage} sortBy={sortBy} filterBy={filterBy} filterOption={filterOption}/>
        </Suspense>
      </Toggle>
    </main>
  );
}
