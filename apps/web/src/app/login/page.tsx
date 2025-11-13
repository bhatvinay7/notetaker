'use client'
import { LoginForm } from "../../components/login-form"
import Header from '../../components/ui/header'
export default function Page() {
  const handleGoogleSignIn = async () => {
  try {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL!}/api/auth/googleAuth`;
  } catch (error: any) {
    console.log({ error: error.message });
  }
};

  return (
    <div className="flex h-screen overflow-hidden w-full  flex-col bg-blue-50 dark:bg-blue-900/50 p-4 sm:p-0 ">
      <div className=" w-full sticky top-0 hidden sm:block">
      <Header/>
      </div>
      <div className="w-full h-full my-auto flex justify-center items-center">
         <div className="w-full max-w-md">
         <LoginForm 
         googleLogin={()=>handleGoogleSignIn()}
         />
          </div>
      </div>
    </div>
  )
}
