"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/users/login", user);
      if (res.status === 200) {
        router.push("/profile");
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <h1>Sign Up Here</h1>

      <div>
        <div className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            className="border-2 border-red-200 p-2 rounded"
            placeholder="Enter your email..."
            type="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <label htmlFor="email">Password</label>
          <input
            type="password"
            className="border-2 border-red-200 p-2 rounded"
            placeholder="*************"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />

          <button
            onClick={() => {
              handleSubmit();
            }}
            className="border-2 border-red-200 rounded p-2 mt-2"
          >
            Login
          </button>
          <Link href="/signup">
            New Here?
            <span className="text-blue underline">Create an account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
