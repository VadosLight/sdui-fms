import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { DndProvider } from "react-dnd/dist/core/DndProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ConstructorPage } from "@pages/constructor-page/ui/ConstructorPage";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        <ConstructorPage />
      </QueryClientProvider>
    </DndProvider>
  );
}

export default App;
