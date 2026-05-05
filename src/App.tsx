import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Shop from "./pages/Shop.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import BrandPage from "./pages/BrandPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import IntroVideo from "./components/IntroVideo";
import { useCartSync } from "@/hooks/useCartSync";

const queryClient = new QueryClient();

const CartSyncBoundary = ({ children }: { children: React.ReactNode }) => {
  useCartSync();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <IntroVideo />
      <BrowserRouter>
        <CartSyncBoundary>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/brand/:slug" element={<BrandPage />} />
            <Route path="/product/:handle" element={<ProductPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartSyncBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
