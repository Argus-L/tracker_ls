import Link from 'next/link'
import DeleteButton from './components/DeleteButton';
export const dynamic = "force-dynamic";
import SearchInput from './components/SearchInput'
import { Suspense } from 'react';
import Table from '@/app/components/table'
import Toggle from '@/app/components/toggle'
import ListView from '@/app/components/listView'

async function fetchPosts() {
  const res = await fetch("http://localhost:3000/api/blog", { 
    next: {
      revalidate: 0,
    },
  });
  const data = await res.json();
  return data.posts;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?:string;
    page?:string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const posts = await fetchPosts();
  

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg bg-slate-800 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold font-family[verdana]">Job Tracker: {posts.length}</h1>
      </div>
      <div className="flex flex-col items-center w-full">
          <SearchInput placeholder="Search..." />
      </div>
      <Toggle>
        <Suspense key={query + currentPage}>
          <Table query={query} currentPage={currentPage} />          
        </Suspense>
        <Suspense key={query + currentPage}>
          <ListView query={query} currentPage={currentPage}/>
        </Suspense>
      </Toggle>

      {/* <div className ="w-full flex flex-col justify-center items-center">
        {posts?.map((post:any) => (
          <div key={post.id} className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center">
            <h3>{post.title}</h3>
            <p>Location: {post.location}</p>
            <p>Skills: {post.skills}</p>
            <p>Salary: {post.salary}</p>
            <p>Company: {post.company}</p>
            <p>Description: {post.description}</p>
            <p>Created At: {new Date (post.createdAt).toDateString()}</p>
            <p>Updated At: {new Date (post.updatedAt).toDateString()}</p>
            <div className="text-right">
              <Link href={`/blog/editPost/${post.id}`} className="px-3 py-1.5 mx-2 text-center bg-slate-900 rounded-md font-semibold text-slate-200">Edit</Link>
              <DeleteButton id={post.id} />
            </div>
          </div>
        ))}
      </div> */}
    </main>
  );
}
