"use client";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  async function deleteJob(id: number) {
    try {
        await fetch(`http://localhost:3000/api/blog/${id}`, {
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
