"use client";
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();
    return (
        <nav className="flex space-x-2 mt-2 mb-4">
            <div>
                <button className="rounded-md p-2 m-auto bg-slate-300 hover:bg-slate-50" type="button" onClick={() => router.push("/")}>Home</button>
            </div>
            <div>
                <button className="rounded-md p-2 m-auto bg-slate-300 hover:bg-slate-50" type="button" onClick={() => router.push("/blog/addPost")}>Add Job</button>
            </div>
            <div>
                <button className="rounded-md p-2 m-auto bg-slate-300 hover:bg-slate-50" type="button" onClick={() => router.push("/tags/showTags")}>Edit Tags</button>
            </div>
        </nav>
    );
}