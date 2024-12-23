// import "./App.css";

import { Toaster } from "sonner";
import ProductPage from "./pages/ProductPage";
import { Route, Routes } from "react-router";
import CustomerPage from "./pages/CustomerPage";
import TransactionPage from "./pages/TransactionPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";

function App() {
    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/product" element={<ProductPage />} />
                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/transaction" element={<TransactionPage />} />
                <Route
                    path="/transaction/:id"
                    element={<TransactionHistoryPage />}
                />
            </Routes>
        </>
    );
}

export default App;
