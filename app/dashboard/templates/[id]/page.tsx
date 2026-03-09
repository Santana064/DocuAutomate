"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function TemplatePage() {

 const params = useParams()
 const router = useRouter()
 const templateId = params.id as string

 const [template, setTemplate] = useState<any>(null)
 const [loading, setLoading] = useState(true)

 useEffect(() => {

  const loadTemplate = async () => {

   const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("id", templateId)
    .maybeSingle()

   if (error) {
    console.error(error)
   }

   if (data) {
    setTemplate(data)
   }

   setLoading(false)

  }

  loadTemplate()

 }, [templateId])


 if (loading) {
  return (
   <div className="p-10 text-white">
    Loading template...
   </div>
  )
 }

 if (!template) {
  return (
   <div className="p-10 text-white">
    Template not found
   </div>
  )
 }

 return (

  <div className="p-10 bg-black text-white min-h-screen">

   <h1 className="text-2xl mb-6">{template.name}</h1>

   <div className="mb-6 whitespace-pre-wrap">
    {template.content}
   </div>

   <button
    onClick={() => router.push(`/dashboard/templates/${template.id}/generate`)}
    className="bg-blue-600 px-4 py-2 rounded"
   >
    Generate Document
   </button>

  </div>

 )

}