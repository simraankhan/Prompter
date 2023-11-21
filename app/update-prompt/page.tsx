"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IPost } from "../create-prompt/page";

const UpdatePrompt = () => {
  const searchParam = useSearchParams();
  const promptId = searchParam.get("id");
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPost>({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (response.ok) {
          const data = await response.json();
          setPost({
            prompt: data["prompt"],
            tag: data["tag"],
          });
        } else {
          setPost({
            prompt: "",
            tag: "",
          });
        }
      } catch (error) {
        setPost({
          prompt: "",
          tag: "",
        });
      }
    };
    if (promptId) getPost();
  }, [promptId]);

  const updatePrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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
      type="Update"
      handleSubmit={updatePrompt}
      post={post}
      setPost={setPost}
      submitting={submitting}
    />
  );
};

export default UpdatePrompt;
