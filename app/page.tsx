export const dynamic = "force-dynamic";
import SearchInput from './components/searchInput';
import { Suspense } from 'react';
import Table from '@/app/components/table';
import Toggle from '@/app/components/toggle';
import ListView from '@/app/components/listView';

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?:string;
    page?:string;
    sortBy?:string;
    locationFilter?:string;
    companyFilter?:string;
    minSalary?:string;
    maxSalary?:string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const sortBy = searchParams?.sortBy || '';
  const locationFilter = searchParams?.locationFilter || '';
  const companyFilter= searchParams?.companyFilter || '';
  const minSalary = searchParams?.minSalary || '';
  const maxSalary = searchParams?.maxSalary || '';
  

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg bg-slate-800 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold font-family[verdana]">Job Tracker</h1>
      </div>
      <div className="flex flex-col items-center w-full">
          <SearchInput placeholder="Search..." />
      </div>
      <Toggle>
        <Suspense key={query + currentPage + sortBy + locationFilter + companyFilter + minSalary + maxSalary}>
          <Table query={query} currentPage={currentPage} sortBy={sortBy} locationFilter = {locationFilter} companyFilter = {companyFilter} minSalary = {minSalary} maxSalary = {maxSalary}/>          
        </Suspense>
        <Suspense key={query + currentPage + sortBy + locationFilter + companyFilter + minSalary + maxSalary}>
          <ListView query={query} currentPage={currentPage} sortBy={sortBy} locationFilter = {locationFilter} companyFilter = {companyFilter} minSalary = {minSalary} maxSalary = {maxSalary}/>
        </Suspense>
      </Toggle>
    </main>
  );
}
