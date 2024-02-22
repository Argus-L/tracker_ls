import { basicSearch } from '@/app/components/basicSearch'
import DeleteButton from '@/app/components/DeleteButton';
import Link from 'next/link'


export default async function JobsTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage:number;
}) {
    const jobs = await basicSearch(query, currentPage);
    const data = await jobs?.json();

    return (
        <div className="flex min-w-full align-middle p-5">
            <table className="hidden min-w-full text-gray-100 md:table border">
                <thead className="text-left border">
                    <tr>
                        <th scope="col" className="border">
                            Title
                        </th>
                        <th scope="col" className="border">
                            Location
                        </th>
                        <th scope="col" className="border">
                            Skills
                        </th>
                        <th scope="col" className="border">
                            Salary
                        </th>
                        <th scope="col" className="border">
                            Company
                        </th>
                        <th scope="col" className="border">
                            Description
                        </th>
                        <th scope="col" className="border">
                            Created At
                        </th>
                        <th scope="col" className="border">
                            Updated At
                        </th>
                        <th scope="col" className="border">
                            Change
                        </th>
                    </tr>
                </thead>
                <tbody >
                    {data.jobs.map((job:any) => (
                        <tr key = {job.id} className="border">
                            <td className="border">
                                <p>{job.title}</p>
                            </td>
                            <td className="border">
                                <p>{job.location}</p>
                            </td>
                            <td className="border">
                                <p>{job.skills}</p>
                            </td>
                            <td className="border">
                                <p>{job.salary}</p>
                            </td>
                            <td className="border">
                                <p>{job.company}</p>
                            </td>
                            <td className="border">
                                <p>{job.description}</p>
                            </td>
                            <td className="border">
                                <p>{new Date (job.createdAt).toDateString()}</p>
                            </td>
                            <td className="border">
                                <p>{new Date (job.updatedAt).toDateString()}</p>
                            </td>
                            <td className="border">
                                <Link href={`/blog/editPost/${job.id}`} className="px-3 py-1.5 mx-2 text-center bg-slate-200 rounded-md font-semibold text-black">Edit</Link>
                               <DeleteButton id={job.id}/>
                            </td>
                        </tr>
                    ))

                    }
                </tbody>
            </table>
        </div>
    )
}