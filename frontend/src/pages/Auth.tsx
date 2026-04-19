import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link, Outlet, useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);



export default function AuthLayout(){
    return(
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="border-2 rounded-sm flex flex-col px-4 py-8 gap-6">
                <Outlet/>
                </div>
            </div>
        </>
    )
};

export function SignUp() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
  
    async function signUpNewUser(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }
        navigate("/dashboard");
        console.log(data.session);
        console.log("User has signed up Successfully");
        setLoading(false);
        setEmail("");
        setPassword("");
    }

    return (
        <>
            <div className="">
              <h1 className="text-center text-2xl ">Sign Up</h1>
              <p className="text-center text-gray-800">Register an account!</p>
            </div>
            <form
              className="flex flex-col justify-center items-center gap-3"
              onSubmit={signUpNewUser}
            >
              <input
                className="w-[80%] border-2 opacity-50 rounded-sm px-2 py-0.5"
                type="name"
                placeholder="Full Name"
                value={fullName}
                required={true}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                className="w-[80%] border-2 opacity-50 rounded-sm px-2 py-0.5"
                type="email"
                placeholder="Your Email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-[80%] border-2 opacity-50 rounded-sm px-2 py-0.5"
                type="password"
                placeholder="Password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="mt-2 border-2 border-b-gray-700 opacity-80 rounded-sm px-6 py-0.5"
                disabled={loading}
              >
                {loading ? <span>Loading</span> : <span>Register</span>}
              </button>
              <p><Link to="/auth/signin">Already have an account yet!</Link></p>
            </form>
        </>
    );
}

export function LogIn(){
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function signInWithEmail(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }
        navigate("/dashboard");
        console.log(data.session);
        console.log("User has logged in Successfully");
        setLoading(false);
        setEmail("");
        setPassword("");
    };

    return (
        <>
            <div className="">
              <h1 className="text-center text-2xl ">Sign In</h1>
              <p className="text-center text-gray-800">Log in to your account!</p>
            </div>
            <form
              className="flex flex-col justify-center items-center gap-3"
              onSubmit={signInWithEmail}
            >
              <input
                className="w-[80%] border-2 opacity-50 rounded-sm px-2 py-0.5"
                type="email"
                placeholder="Your Email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-[80%] border-2 opacity-50 rounded-sm px-2 py-0.5"
                type="password"
                placeholder="Password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="mt-2 border-2 border-b-gray-700 opacity-80 rounded-sm px-6 py-0.5"
                disabled={loading}
              >
                {loading ? <span>Loading</span> : <span>Log in</span>}
              </button>
              <p><Link to="/auth/signup">Don't have an account yet!</Link></p>
            </form>
        </>
    )
}
