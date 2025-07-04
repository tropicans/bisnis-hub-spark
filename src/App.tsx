import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/Layout"
import Dashboard from "@/pages/Dashboard"
import Sales from "@/pages/Sales"
import Inventory from "@/pages/Inventory"
import Accounting from "@/pages/Accounting"
import NotFound from "@/pages/NotFound"
import NewSalePage from "@/pages/NewSalePage" // Import halaman baru
import NewInventoryPage from "@/pages/NewInventoryPage" // Import halaman baru
import AccountingReportsPage from "@/pages/AccountingReportsPage" // Import halaman baru
import NewAccountingTransactionPage from "@/pages/NewAccountingTransactionPage" // Import halaman baru
import SettingsPage from "@/pages/SettingsPage" // Import halaman baru

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/sales/new" element={<NewSalePage />} /> {/* Route baru */}
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/new" element={<NewInventoryPage />} /> {/* Route baru */}
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/accounting/reports" element={<AccountingReportsPage />} /> {/* Route baru */}
            <Route path="/accounting/new-transaction" element={<NewAccountingTransactionPage />} /> {/* Route baru */}
            <Route path="/settings" element={<SettingsPage />} /> {/* Route baru */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App