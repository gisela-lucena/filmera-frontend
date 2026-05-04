import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "../../pages/Index.jsx";
import NotFound from "../../pages/NotFound/NotFound.jsx";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
);

export default App;
