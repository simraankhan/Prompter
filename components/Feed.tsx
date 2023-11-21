"use client";

import { useState, useEffect, FC } from "react";
import PromptCard from "./PromptCard";

const PromptCardList: FC<{ data: any[]; handleTagClick: any }> = ({
  data,
  handleTagClick,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState<any[]>([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch("/api/prompt");
        if (!response.ok) {
          setPost([]);
          return;
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.log(error);
        setPost([]);
      }
    };
    getPost();
  }, []);

  const handleSearch = () => {};
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearch}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={post} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
