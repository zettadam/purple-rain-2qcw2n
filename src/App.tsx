import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Todos } from "./Todos";
import { Page } from "./UI";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Page>
        <Todos />
      </Page>
    </QueryClientProvider>
  );
};
export default App;
