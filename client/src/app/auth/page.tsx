'use client'

import AuthForm from "@/components/AuthForm/AuthForm";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { useState } from "react";

export default function Auth() {
  const [formState, setFormState] = useState(1);
  
  const handleFormSwitch = (state: number) => {
    setFormState(state);
  };
  return (
    <>
      <div className="mx-auto p-6 ">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => handleFormSwitch(1)}
            className={`py-2 px-4 rounded-lg ${formState === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Вхід
          </button>
          <button
            onClick={() => handleFormSwitch(2)}
            className={`py-2 px-4 rounded-lg ${formState === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Реєстрація
          </button>
        </div>

        <div className="items-center min-h-screen">
            {formState === 1 ? (
            <AuthForm />
            ) : (
                <RegisterForm />
            )}
        </div>      
      </div>
    </>
    );
}