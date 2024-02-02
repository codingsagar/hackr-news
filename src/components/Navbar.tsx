"use client";

import { useEffect } from "react";
import useAuthStore from "../../store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase_app from "@/lib/firebase/firebase-config";
import LogOutButton from "./LogOutButton";
import { useRouter } from "next/navigation";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Nav() {
  const router = useRouter();
  const { isAuthenticated, setUser, user }: any = useAuthStore();
  const auth = getAuth(firebase_app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      setUser(newUser);
    });

    if(isAuthenticated) router.push("/dashboard");

    return () => {
      unsubscribe();
    };
  }, [auth, setUser]);

  return (
    <Navbar isBordered isBlurred={false}>
      <NavbarBrand>
        <Link href="/">
          <h1 className="font-bold text-inherit text-primary">HackrNews</h1>
        </Link>
      </NavbarBrand>
    
      <NavbarContent justify="end">
        {isAuthenticated ? (
          <LogOutButton />
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login" size="sm">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat" size="sm">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
