"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { questionSchema } from "@/lib/validation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { useTheme } from "@/context/ThemeProvider";

interface Props {
  authorId:string 
  type:string 
  questionDetail?:string
}
const QuestionForm = ({ authorId ,type,questionDetail}: Props) => {
  const router = useRouter();
  const { mode } = useTheme();
  const [listTag, setListTag] = useState<any>([]);
  const [isSubmiting, setSubmiting] = useState<boolean>(false);
  const editorRef = useRef(null);

  const parseQuestionDetail = questionDetail && JSON.parse(questionDetail || '') 
  const tagsDetail = parseQuestionDetail?.tags?.map((item: { name: string; }) => item.name)
  const log = () => {
    if (editorRef.current) {
      // @ts-ignore
      console.log(editorRef.current?.getContent());
    }
  };

  const getThemeStyle = () => {
    if (mode === "dark") {
      return "oxide-dark";
    } else {
      return "oxide";
    }
  };

  const getSkinStyle = () => {
    return mode === "dark" ? "dark" : "light";
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: parseQuestionDetail?.title|| "",
      explantion: parseQuestionDetail?.content|| "",
      tags: tagsDetail || [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof questionSchema>) {
    setSubmiting(true);
    try {
      if(type === "Create") {
        await createQuestion({
          title: values.title,
          content: values.explantion,
          tags: values.tags,
          author: JSON.parse(authorId),
        });
      }

      if(type === "Edit") {
        await editQuestion({
          title: values.title,
          content: values.explantion,
          questionId:parseQuestionDetail._id
        });
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddNewTags = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      // @ts-ignore
      let valueInput = e.target.value;
      console.log("valueInput : ", valueInput);
      console.log("field : ", field);

      if (valueInput.length <= 2 || valueInput.trim().length > 15) {
        return form.setError("tags", {
          type: "required",
          message: "Tag must be greater 2 and less than 15 characters.",
        });
      }

      if (!field.value.includes(valueInput)) {
        form.setValue("tags", [...field.value, valueInput]);
        form.clearErrors("tags");
        valueInput = "";
      } else {
        return form.setError("tags", {
          type: "required",
          message: "This tag has already exist",
        });
      }
    }
  };

  const handleRemoveTagByTagName = (tagName: string) => {
    const newList = listTag.filter((item: string) => item !== tagName);
    if (newList !== listTag) {
      setListTag(newList);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 text-xs">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="background-light700_dark300 text-dark300_light700 no-focus light-border-2 min-h-[56px] border"
                  {...field}
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

        <FormField
          control={form.control}
          name="explantion"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 text-xs">
                Detail of your question content{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
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
                    skin: getThemeStyle(),
                    content_css: getSkinStyle(),
                  }}
                  initialValue={questionDetail ? parseQuestionDetail.content || "" : ""}
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

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 text-xs">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    disabled={type === "Edit"}
                    onKeyDown={(e) => handleAddNewTags(e, field)}
                    placeholder="Add tags"
                    className="background-light900_dark300 text-dark300_light700 no-focus light-border-2 min-h-[56px] border"
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    {field.value?.length > 0 &&
                      field.value.map((item: any) => (
                        <div
                          key={item}
                          className="background-light800_dark400 text-light400_light500 flex items-center gap-2 rounded-md p-2 text-xs"
                        >
                          <p>{item}</p>
                          {type !== "Edit" && <>
                          <Image
                            onClick={() => handleRemoveTagByTagName(item)}
                            src="/assets/icons/close.svg"
                            width={12}
                            height={12}
                            alt="close"
                            className="cursor-pointer object-contain dark:invert "
                          />
                          </>}
                        </div>
                      ))}
                  </div>
                </>
              </FormControl>
              <FormDescription className="body-regular text-xs text-light-500">
                Be specific and imagine you&apos;re asking a question for other
                person
              </FormDescription>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <div className="mt-10 flex justify-center">
          <Button
            className="primary-gradient min-h-[46px] min-w-[120px] p-5  text-light-900"
            onClick={log}
            type="submit"
          >
            {!isSubmiting ? (type === "Create" ? "Ask a question" : "Edit question") :
            (type === "Edit"? "Editing..." : "Posting...")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
