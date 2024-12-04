import Image from "next/image";
import Login from "./Components/Login";
import Header from "./Components/Header";

export default function Home() {
  return (
   <>
   
   
   <div className=" loginscreen absolute inset-0 bg-cover bg-blue-500 bg-center opacity-50"></div>
   <div className="absolute inset-0 bg-blue-200 opacity-25"></div>
   <div className=" w-full h-full  relative z-10     ">
   <Header/>
   <Login/>
   </div>
   
   </>
  );
}
