import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { BaseScreen } from "@screen/BaseScreen/BaseScreen";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BaseScreen endpoint="/asd/asd" designSystem="AIO" />;
    </QueryClientProvider>
  );
}

export default App;
