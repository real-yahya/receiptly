import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  async function signInWithEmail(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error(error);
    }
    window.location.href = "/dashboard";
    console.log(data.session);
    console.log("User has logged in Successfully");
    setLoading(false);
    setEmail("");
    setPassword("");
  }

  async function signUpNewUser(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error(error);
    }
    window.location.href = "/dashboard";
    console.log(data.session);
    console.log("User has signed up Successfully");
    setLoading(false);
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {isLogin ? (
        <div className="border-2 rounded-sm flex flex-col px-4 py-8 gap-6">
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
              type="Password"
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
            <p
              onClick={() => {
                setIsLogin(false);
              }}
            >
              Don't have an account yet!
            </p>
          </form>
        </div>
      ) : (
        <div className="border-2 rounded-sm flex flex-col px-4 py-8 gap-6">
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
              type="Password"
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
            <p
              onClick={() => {
                setIsLogin(true);
              }}
            >
              Already have an account yet!
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
