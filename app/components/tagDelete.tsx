"use client";
import { useRouter } from "next/navigation";
import {NEXT_URL} from '@/app/components/rootURL'

export default function TagDelete({ id }: { id: number }) {
  const router = useRouter();

  async function deleteTag(id: number) {
    try {
        await fetch(`${NEXT_URL}/api/tags/${id}`, {
            method: "DELETE",
            //@ts-ignore
            "Content-Type":"application/json",
        });
        location.reload();
        } catch (error) {
            console.error(error);
        }
    }
  
  return <button className="px-2 py-1 text-center bg-red-900 rounded-md font-semibold text-slate-200" onClick={() => deleteTag(id)}>Delete</button>;
}