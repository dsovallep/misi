import React, { useState, useEffect } from "react";
import { createTransaction, getPortfolios, getShares } from "../services/api_misi_back";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, Typography, Box } from "@mui/material";

const TransactionForm = ({ onNewTransaction }) => {
  const [portfolios, setPortfolios] = useState([]);
  const [shares, setShares] = useState([]);
  const [transactionData, setTransactionData] = useState({
    portfolio_id: "",
    share_id: "",
    transaction_type: "BUY",
    quantity: "",
    max_price_per_share: "",
    total_shares_price: "",
    fees: "",
    orden_number: "",
    notes: "",
    transaction_date: "",
  });

  useEffect(() => {
    fetchPortfolios();
    fetchShares();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await getPortfolios();
      setPortfolios(response.data);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  const fetchShares = async () => {
    try {
      const response = await getShares();
      setShares(response.data);
    } catch (error) {
      console.error("Error fetching shares:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransactionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createTransaction(transactionData);
      alert("Transaction created successfully!");
      // Llamar a la función que refresca las transacciones
      if (onNewTransaction) {
        onNewTransaction();
      }
      // Opcionalmente, resetear el formulario
      setTransactionData({
        portfolio_id: "",
        share_id: "",
        transaction_type: "BUY",
        quantity: "",
        max_price_per_share: "",
        total_shares_price: "",
        fees: "",
        orden_number: "",
        notes: "",
        transaction_date: "",
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Failed to create transaction.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Create a Transaction
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="portfolio-label">Portfolio</InputLabel>
              <Select
                labelId="portfolio-label"
                name="portfolio_id"
                value={transactionData.portfolio_id}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Select Portfolio</em>
                </MenuItem>
                {portfolios.map((portfolio) => (
                  <MenuItem key={portfolio.id} value={portfolio.id}>
                    {portfolio.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="share-label">Share</InputLabel>
              <Select
                labelId="share-label"
                name="share_id"
                value={transactionData.share_id}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Select Share</em>
                </MenuItem>
                {shares.map((share) => (
                  <MenuItem key={share.id} value={share.id}>
                    {share.name} ({share.symbol})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
              <Select
                labelId="transaction-type-label"
                name="transaction_type"
                value={transactionData.transaction_type}
                onChange={handleChange}
              >
                <MenuItem value="BUY">Buy</MenuItem>
                <MenuItem value="SELL">Sell</MenuItem>
              </Select>
            </FormControl>
          </Grid>

           <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Quantity"
              type="number"
              name="quantity"
              value={transactionData.quantity}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Max Price per Share"
              type="number"
              step="0.01"
              name="max_price_per_share"
              value={transactionData.max_price_per_share}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Total Shares Price"
              type="number"
              step="0.01"
              name="total_shares_price"
              value={transactionData.total_shares_price}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Fees"
              type="number"
              step="0.01"
              name="fees"
              value={transactionData.fees}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Transaction Date"
              type="date"
              name="transaction_date"
              value={transactionData.transaction_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Order Number"
              type="text"
              name="orden_number"
              value={transactionData.orden_number}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={4}
              name="notes"
              value={transactionData.notes}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Transaction
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default TransactionForm;  
