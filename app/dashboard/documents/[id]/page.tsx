"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export default function DocumentEditor(){

 const params = useParams()
 const documentId = params.id as string

 const [loading,setLoading] = useState(true)

 const editor = useEditor({
  extensions:[StarterKit],
  content:"",
  immediatelyRender:false
 })

 useEffect(()=>{

  if(!editor) return

  const loadDocument = async()=>{

   const { data,error } = await supabase
    .from("documents")
    .select("*")
    .eq("id",documentId)
    .maybeSingle()

   if(error){
    console.error(error)
    return
   }

   if(!data){
    alert("Document could not be loaded")
    return
   }

   editor.commands.setContent(data.content || "")

   setLoading(false)

  }

  loadDocument()

 },[editor,documentId])


 const saveDocument = async()=>{

  if(!editor) return

  const content = editor.getHTML()

  const { error } = await supabase
   .from("documents")
   .update({content})
   .eq("id",documentId)

  if(error){
   console.error(error)
   alert("Save failed")
   return
  }

  alert("Document saved")

 }


 if(loading){
  return <div className="p-10 text-white">Loading document...</div>
 }


 return(

  <div className="p-10 bg-black text-white min-h-screen">

   <h1 className="text-xl mb-6">Edit Document</h1>

   <div className="border border-gray-700 p-4 mb-6">
    <EditorContent editor={editor}/>
   </div>

   <button
    onClick={saveDocument}
    className="bg-blue-600 px-4 py-2 rounded"
   >
    Save Document
   </button>

  </div>

 )

}