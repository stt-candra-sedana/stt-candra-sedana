"use client";
import { useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { supabase } from "@/lib/supabase/client";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const [modal, setModal] = useState<{ type: "link" | null; input: string }>({
    type: null,
    input: "",
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Tulis deskripsi di sini..." }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const btnClass = (active: boolean) =>
    `px-2 py-1 rounded text-sm border ${
      active
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
    }`;

  // Upload gambar ke Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`; // nama unik pakai timestamp

      const { error } = await supabase.storage
        .from("images")
        .upload(fileName, file, { upsert: false });

      if (error) throw error;

      // Ambil public URL
      const { data } = supabase.storage.from("images").getPublicUrl(fileName);

      // Insert gambar ke editor
      editor.chain().focus().setImage({ src: data.publicUrl }).run();
    } catch (err) {
      alert("Gagal upload gambar. Coba lagi.");
      console.error(err);
    } finally {
      setUploading(false);
      // Reset input biar bisa upload file yang sama lagi
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleModalConfirm = () => {
    if (modal.type === "link" && modal.input) {
      editor.chain().focus().setLink({ href: modal.input }).run();
    }
    setModal({ type: null, input: "" });
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white text-black">
      {/* Input file hidden — trigger dari tombol */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Modal Link */}
      {modal.type && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h3 className="font-semibold mb-3 text-gray-800">
              Masukkan URL Link
            </h3>
            <input
              type="url"
              autoFocus
              placeholder="https://..."
              value={modal.input}
              onChange={(e) =>
                setModal((m) => ({ ...m, input: e.target.value }))
              }
              onKeyDown={(e) => e.key === "Enter" && handleModalConfirm()}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModal({ type: null, input: "" })}
                className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100">
                Batal
              </button>
              <button
                type="button"
                onClick={handleModalConfirm}
                className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700">
                Tambahkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-300">
        <select
          onChange={(e) => {
            const val = e.target.value;
            if (val === "p") editor.chain().focus().setParagraph().run();
            else
              editor
                .chain()
                .focus()
                .toggleHeading({ level: parseInt(val) as 1 | 2 | 3 })
                .run();
          }}
          className="px-2 py-1 rounded text-sm border border-gray-300 bg-white text-gray-700">
          <option value="p">Paragraf</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}>
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}>
          <i>I</i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={btnClass(editor.isActive("underline"))}>
          <u>U</u>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btnClass(editor.isActive("strike"))}>
          <s>S</s>
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={btnClass(editor.isActive({ textAlign: "left" }))}>
          ≡L
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={btnClass(editor.isActive({ textAlign: "center" }))}>
          ≡C
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={btnClass(editor.isActive({ textAlign: "right" }))}>
          ≡R
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive("bulletList"))}>
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive("orderedList"))}>
          1. List
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => setModal({ type: "link", input: "" })}
          className={btnClass(editor.isActive("link"))}>
          Link
        </button>

        {/* Tombol upload gambar */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`px-2 py-1 rounded text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}>
          {uploading ? "Uploading..." : "Upload Gambar"}
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={btnClass(editor.isActive("codeBlock"))}>
          {"</>"}
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className={btnClass(false)}>
          ↩ Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className={btnClass(false)}>
          Redo ↪
        </button>
      </div>

      {/* Area Tulis */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-50 prose max-w-none focus:outline-none"
      />
    </div>
  );
}
