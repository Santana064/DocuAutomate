"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function DocumentsPage() {

 const [documents,setDocuments] = useState<any[]>([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  const loadDocuments = async()=>{

   const { data,error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at",{ascending:false})

   if(error){
    console.error(error)
   }

   if(data){
    setDocuments(data)
   }

   setLoading(false)

  }

  loadDocuments()

 },[])


 if(loading){
  return <div className="p-10 text-white">Loading documents...</div>
 }


 return(

  <div className="p-10 bg-black text-white min-h-screen">

   <h1 className="text-2xl mb-6">Documents</h1>

   {documents.length === 0 && (
    <div>No documents yet</div>
   )}

   {documents.map(doc=>(
    <Link
     key={doc.id}
     href={`/dashboard/documents/${doc.id}`}
     className="block mb-3 p-3 border border-gray-700 rounded hover:bg-gray-800"
    >
     {doc.title}
    </Link>
   ))}

  </div>

 )

}