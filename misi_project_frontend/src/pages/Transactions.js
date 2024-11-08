import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { getTransactions } from '../services/api_misi_back';

function Transactions() {
    const [transactions, setTransactions] = useState([]);

    // Fetch transactions on component mount
    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await getTransactions();
            setTransactions(response.data.reverse()); // Most recent transactions first
        } catch (error) {
            console.error("Error fetching transactions", error);
        }
    };

    // Function to refresh the transaction list after a new transaction is added
    const handleNewTransaction = () => {
        fetchTransactions(); // Fetch transactions again after form submission
    };

    return (
        <Container>
            <Box sx={{ textAlign: 'center', padding: '20px 0' }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Transactions
                </Typography>
            </Box>

            <Grid container spacing={2}>
                {/* Left Half: TransactionList */}
                <Grid item xs={12} md={7}>
                    <TransactionList transactions={transactions} />
                </Grid>

                {/* Right Half: TransactionForm */}
                <Grid item xs={12} md={5}>
                    <TransactionForm onNewTransaction={handleNewTransaction} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Transactions;
