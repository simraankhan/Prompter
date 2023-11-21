"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import Logo from "../public/assets/images/logo.svg";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<any>();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setAuthProviders = async () => {
      const authProviders = await getProviders();
      setProviders(authProviders);
    };

    setAuthProviders();
  }, []);

  const renderProviders = () => {
    return (
      <>
        {providers &&
          Object.values(providers).map((provider: any) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => signIn(provider.id)}
              className="outline_btn"
            >
              Sign In
            </button>
          ))}
      </>
    );
  };
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
        <Image
          src={Logo}
          alt="Prompter logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Prompter</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              className="outline_btn"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={String(session.user.image)}
                width={37}
                height={37}
                alt="Profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>{renderProviders()}</>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={String(session.user.image)}
              width={37}
              height={37}
              alt="Profile"
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown ? (
              <div className="dropdown">
                <Link
                  href="/profile"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                  className="dropdown_link"
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                  className="dropdown_link"
                >
                  Create Post
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropdown((prev) => !prev);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <>{renderProviders()}</>
        )}
      </div>
    </nav>
  );
};

export default Nav;
