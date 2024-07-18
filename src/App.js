import React, { useEffect, useState } from "react";
import { fetchCustomers, fetchTransactions } from "./services/api";
import TransactionGraph from "./components/TransactionGraph/TransactionGraph";
import CustomerTable from "./components/CustomerTable/CustomerTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  useEffect(() => {
    fetchCustomers().then((response) => {
      setCustomers(response.data);
    });
    fetchTransactions().then((response) => {
      setTransactions(response.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMinAmountChange = (e) => {
    setMinAmount(e.target.value);
  };

  const handleMaxAmountChange = (e) => {
    setMaxAmount(e.target.value);
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filterTransactions = (customerId) => {
    const parsedCustomerId = Number(customerId);
    return transactions.filter((tx) => {
      const withinAmountRange =
        (minAmount === "" || tx.amount >= parseFloat(minAmount)) &&
        (maxAmount === "" || tx.amount <= parseFloat(maxAmount));
      return tx.customer_id === parsedCustomerId && withinAmountRange;
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Customer Transactions</h1>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by customer name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="d-flex mb-4">
        <input
          type="number"
          className="form-control mr-2"
          placeholder="Min amount"
          value={minAmount}
          onChange={handleMinAmountChange}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Max amount"
          value={maxAmount}
          onChange={handleMaxAmountChange}
        />
      </div>
      <CustomerTable
        filteredCustomers={filteredCustomers}
        filterTransactions={filterTransactions}
        selectedCustomer={selectedCustomer}
        handleCustomerClick={handleCustomerClick}
      />
      {selectedCustomer && (
        <TransactionGraph
          transactions={filterTransactions(selectedCustomer.id)}
        />
      )}
      <footer className="footer">
        <p>&copy;Aya Adel 2024 All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
