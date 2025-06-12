"use client";

import { redirect, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import "../globals.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const query = useSearchParams();
  const { id } = params;
  const user_role = query.get("user-role");

  const logoutHandler = () => {
    localStorage.removeItem("user");
    redirect(`/`);
  };

  return (
    <html lang="en">
      <body className="bg-[#111827] min-h-screen flex flex-col text-white font-sans">
        <div className="min-h-screen bg-[#111827]">
          {/* User Dashboard Header */}
          <header className="bg-[#1f2937] shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-8 py-5 flex justify-between items-center">
              <h1 className="text-3xl font-extrabold text-[#2563eb] tracking-wide">
                User Dashboard
              </h1>

              <nav>
                <ul className="flex space-x-8 font-medium">
                  <li className="hover:text-[#60a5fa] transition">
                    <Link href={`/user/${id}?user-role=${user_role}`}>
                      Home
                    </Link>
                  </li>
                  <li className="hover:text-[#60a5fa] transition">
                    <Link href={`/user/${id}/dossiers?user-role=${user_role}`}>
                      My Dossiers
                    </Link>
                  </li>
                  <li className="hover:text-[#60a5fa] transition">
                    <Link href={`/user/${id}/profile`}>Profile</Link>
                  </li>
                  <li className="hover:text-[#60a5fa] transition">
                    <Link href={`/user/${id}/aisearch?user-role=${user_role}`}>
                      AI Search
                    </Link>
                  </li>
                  <li className="hover:text-[#60a5fa] transition">
                    <button onClick={logoutHandler}>Logout</button>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="container flex mx-auto px-8 py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
