"use client";

import React, { useState } from "react";
import Form from "../../components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface IPost {
  prompt: string;
  tag: string;
}

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPost>({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: (session?.user as any).id,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      handleSubmit={createPrompt}
      post={post}
      setPost={setPost}
      submitting={submitting}
    />
  );
};

export default CreatePrompt;
