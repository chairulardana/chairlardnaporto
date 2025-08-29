import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./Router";
import Router from "./Router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Router />
    </QueryClientProvider>
  );
}

export default App;
