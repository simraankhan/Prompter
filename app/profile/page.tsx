"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "../../components/Profile";
import { IPost } from "@/components/PromptCard";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/${(session?.user as any).id}/posts`
      );
      const data = await response.json();

      setMyPosts(data);
    };

    if ((session?.user as any)?.id) fetchPosts();
  }, [(session?.user as any)?.id]);

  const handleEdit = (post: IPost) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: IPost) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
