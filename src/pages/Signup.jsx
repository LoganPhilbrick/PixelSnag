import Background from "../components/Background";
import { z } from "zod";
import { useState, use } from "react";
import { SupabaseContext } from "../contexts/SupabaseContext";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { auth } = use(SupabaseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    try {
      const validatedFields = signupSchema.safeParse({ email, password });
      if (!validatedFields.success) {
        setError("Invalid fields");
        setIsLoading(false);
        setIsError(true);
        return;
      }
      const { data, error } = await auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setIsError(true);
        setIsSuccess(false);
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        setIsSuccess(true);
        setIsError(false);
        setError("");
        setEmail("");
        setPassword("");
        setIsLoading(false);
        // navigate("/editor");
      } else {
        setError("No user data returned");
        setIsError(true);
        setIsSuccess(false);
        setIsLoading(false);
      }
    } catch (error) {
      setError("An error occurred:", error);
      setIsError(true);
      setIsSuccess(false);
      setIsLoading(false);

      return;
    }
  };

  return (
    <>
      <div className="relative z-40 flex justify-center items-center w-full h-screen">
        <div className="container mx-auto max-w-xl h-4/5 px-4 md:px-0">
          <div className="w-full h-full flex flex-col items-center justify-center px-4 bg-zinc-700 rounded-xl shadow-2xl shadow-black/50">
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold text-neutral-300 mb-4 self-start">
                  Sign Up
                </h1>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-neutral-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none  shadow-inset"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-neutral-300">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none mb-4 shadow-inset"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing you up..." : "Sign up"}
                </button>
              </div>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {isSuccess && <p className="text-green-500">Sign up successful</p>}
            {isError && <p className="text-red-500">Sign up failed</p>}
          </div>
        </div>
      </div>

      <Background />
    </>
  );
}
