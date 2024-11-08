import React from "react";
import { Card, CardContent, Typography, List, ListItem, Divider } from "@mui/material";

const TransactionList = ({ transactions }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Transactions
        </Typography>
        <List>
          {transactions.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <ListItem>
                <Typography variant="body1">
                  <strong>Share ID:</strong> {transaction.share_id} <br />
                  <strong>Share Name:</strong> {transaction.share_name} <br />
                  <strong>Type:</strong> {transaction.transaction_type} <br />
                  <strong>Quantity:</strong> {transaction.quantity} <br />
                  <strong>Price per Share:</strong> {transaction.max_price_per_share} <br />
                  <strong>Total Price:</strong> {transaction.total_shares_price} <br />
                  <strong>Creation:</strong> {transaction.created_at}
                </Typography>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
