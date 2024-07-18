import axios from "axios";

const API_URL = "http://localhost:3001";

export const fetchCustomers = () => axios.get(`${API_URL}/customers`);
export const fetchTransactions = () => axios.get(`${API_URL}/transactions`);
