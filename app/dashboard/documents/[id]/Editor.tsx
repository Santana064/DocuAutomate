'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

export default function Editor({
  content,
  onChange,
}: {
  content: string
  onChange: (value: string) => void
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style:
          'min-height:400px;padding:15px;border:1px solid #ccc;border-radius:6px;font-size:16px;line-height:1.6;',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) return null

  return <EditorContent editor={editor} />
}
