"use client"
import axios from "axios";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const doLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1>Profile Page</h1>
      <h1>User Name</h1>

      <div className="mt-5">
        <button className="p-2 border-2 border-red-200" onClick={doLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
