import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { SupabaseProvider } from "./contexts/SupabaseContext";

function App() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_API;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return <div>Loading...</div>;
  }

  return (
    <SupabaseProvider supabaseUrl={supabaseUrl} supabaseKey={supabaseKey}>
      {/* <Home /> */}
      <Signup />
    </SupabaseProvider>
  );
}

export default App;
