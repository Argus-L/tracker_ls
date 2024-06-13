"use client";
import { useRouter } from "next/navigation";
import {NEXT_URL} from '@/app/components/rootURL'

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  async function deleteJob(id: number) {
    try {
        await fetch(`${NEXT_URL}/api/blog/${id}`, {
            method: "DELETE",
            //@ts-ignore
            "Content-Type":"application/json",
        });
        console.log(id);
        router.push("/");
        router.refresh();
        } catch (error) {
            console.error(error);
        }
    }
  
  return <button className="px-2 py-1 text-center bg-red-900 rounded-md font-semibold text-slate-200" onClick={() => deleteJob(id)}>Delete</button>;
}
