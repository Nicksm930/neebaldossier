// src/app/context/UserClientProvider.tsx
"use client";

import { UserProvider } from "./UserContext";

export default function UserClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
