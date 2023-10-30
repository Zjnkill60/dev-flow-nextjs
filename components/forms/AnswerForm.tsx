"use client";

import { answerSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import { createAnswer } from "@/lib/actions/answer.actions";

const AnswerForm = ({
  authorId,
  questionById,
}: {
  authorId: string;
  questionById: string;
}) => {
  const { mode } = useTheme();
  const [isSubmiting, setSubmiting] = useState<boolean>(false);
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof answerSchema>) {
    setSubmiting(true);
    console.log(values);
    try {
      await createAnswer({
        content: values.content,
        author: JSON.parse(authorId),
        question: JSON.parse(questionById),
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmiting(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                  onEditorChange={(e) => {
                    field.onChange(e);
                  }}
                  // @ts-ignore
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "preview",

                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px}",
                    content_css: mode === "dark" ? "dark" : "light",
                    skin: mode === "dark" ? "oxide-dark" : "oxide",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular text-xs text-light-500">
                Be specific and imagine you&apos;re asking a question for other
                person
              </FormDescription>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />
        <div className="mt-10 flex justify-end">
          <Button
            className="primary-gradient min-h-[46px] min-w-[120px] p-5  text-light-900"
            type="submit"
          >
            {!isSubmiting ? "Post Answer" : "Posting..."}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AnswerForm;
