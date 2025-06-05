"use client";
import { useFormStatus } from 'react-dom'
export const Submit = () => {

    const { pending , data , action , method } = useFormStatus();
    console.log("pending",pending);
    console.log("data",data);
    console.log("action",action);
    console.log("method",method);
    
  return (
    <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
          disabled={pending}
        >
          {pending ? 'Registering...' :  'Register'}
    </button>
  )
}

 