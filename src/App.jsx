import "./App.css";
import Home from "./screens/Home";
import Signup from "./screens/Signup";
import { SupabaseProvider } from "./contexts/SupabaseContext";
// import Subscribe from "./pages/Subscribe";

function App() {
  // eslint-disable-next-line no-undef
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_API;
  // eslint-disable-next-line no-undef
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return <div>Loading...</div>;
  }

  console.log(supabaseKey, supabaseUrl);

  return (
    <SupabaseProvider supabaseUrl={supabaseUrl} supabaseKey={supabaseKey}>
      <Home />
      {/* <Signup /> */}
      {/* <Subscribe /> */}
    </SupabaseProvider>
  );
}

export default App;
