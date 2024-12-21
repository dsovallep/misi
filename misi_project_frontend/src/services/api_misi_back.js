import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/investment';

export const getPortfolios = () => {
    return axios.get(`${API_BASE_URL}/portfolio/`);
};

export const getPortfolio = () => {
    return axios.get(`${API_BASE_URL}/portfolio/{id}`);
};

export const getShares = () => {
    return axios.get(`${API_BASE_URL}/share/`);
};

export const getTransactions = () => {
    return axios.get(`${API_BASE_URL}/transaction/`);
};

export const createTransaction = (data) => {
    return axios.post(`${API_BASE_URL}/transaction/`, data);  
};

export const getPortfolioShare = () => {
    return axios.get(`${API_BASE_URL}/portfolioshare/`);
};
