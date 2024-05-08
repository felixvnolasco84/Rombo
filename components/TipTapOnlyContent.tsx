"use client";

import "../app/styles/editor.scss";

import React from "react";
import { Color } from "@tiptap/extension-color";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";

import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  onStateChange?: (state: any) => void;
  content: string;
};

const TipTapOnlyContent = ({ onStateChange, content }: Props) => {
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.extend({
      types: [ListItem.name],
    }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
    Dropcursor,
    Image,
    Link.configure({
      openOnClick: false,
      autolink: true,
    }),
  ];

  return (
    <div className="flex flex-col gap-2">
      <EditorProvider
        slotBefore={<></>}
        extensions={extensions}
        content={content}
        editable={false}
        onUpdate={({ editor }) => {
          if (editor) {
            onStateChange && onStateChange(editor.getHTML());
          }
        }}
        editorProps={{
          attributes: {
            class:
              "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl  focus:outline-none  rounded-md px-3 py-2  overflow-y-auto  dark:text-white border border-gray-200",
          },
        }}
      >
        <></>
      </EditorProvider>
    </div>
  );
};

export default TipTapOnlyContent;
