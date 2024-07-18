import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerTable.css";

const CustomerTable = ({
  filteredCustomers,
  filterTransactions,
  selectedCustomer,
  handleCustomerClick,
}) => {
  return (
    <table className="table table-hover table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {filteredCustomers.map((customer) => {
          const customerTransactions = filterTransactions(customer.id);
          if (customerTransactions.length === 0) {
            return null;
          }
          return (
            <>
              <tr
                className={`customer-row ${
                  selectedCustomer?.id === customer.id ? "table-active" : ""
                }`}
                onClick={() => handleCustomerClick(customer)}
              >
                <td rowSpan={customerTransactions.length + 1}>
                  {customer.name}
                </td>
              </tr>
              {customerTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td>${tx.amount}</td>
                </tr>
              ))}
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomerTable;
