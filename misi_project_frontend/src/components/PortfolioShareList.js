import React, { useState, useEffect } from 'react';
import { getPortfolioShare } from '../services/api_misi_back.js';
import { Card, CardContent, Typography, List, ListItem, Divider, TextField, Box } from '@mui/material';

const PortfolioShareList = () => {
    const [portShares, setPortShares] = useState([]);
    const [currentPrices, setCurrentPrices] = useState({});

    const fetchPortfolioShare = async () => {
        try {
            const response = await getPortfolioShare();
	    setPortShares(response.data);
        } catch (error) {
            console.error('Error fetching data from PortfolioShareList: ', error);
        }
    };

    useEffect(() => {
        fetchPortfolioShare();
    }, []);

    const handlePriceChange = (id, value) => {
        setCurrentPrices({
            ...currentPrices,
            [id]: parseFloat(value) || 0,
        });
    };

    const calculateProfitability = (averagePrice, numberShare, currentPrice) => {
        return (currentPrice - averagePrice) * numberShare;
    };

    const formattedNumber = (number) => {
        return Number(number).toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };
    
    const sortedPortShares = [...portShares].sort((a,b) => b.profit_loss - a.profit_loss);
    
    const calculateTotalProfitLoss = () => {
        return portShares.reduce((total, ps) => {
            const profitLoss = parseFloat(ps.profit_loss);
	    const fees = parseFloat(ps.fees);
	    const validProfitLoss = isNaN(profitLoss) ? 0 : profitLoss;
            const validFees = isNaN(fees) ? 0 : fees;		
            return total + validProfitLoss - validFees;
        }, 0);
    };
    
    
    return (
        <Card>
            <CardContent>
                <Typography variant='h5' gutterBottom>
                    Summary Investments
                </Typography>
	        <Typography variant='h6' gutterBottom>
	            <strong>Total Profit/Loss (after fees):</strong> {formattedNumber(calculateTotalProfitLoss())}
	        </Typography>
                <List>
                    {sortedPortShares.map((ps) => (
	  	        <React.Fragment key={ps.id}>
                            <ListItem>
                                <Box>
			            <Typography variant="body1">
			                <strong>share simbol:</strong> {ps.share_symbol}
			            </Typography>
                                    <Typography variant="body1">
                                        <strong>share name:</strong> {ps.share_name}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>number share:</strong> {formattedNumber(ps.number_share)}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>amount:</strong> {formattedNumber(ps.amount)}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>average price per share:</strong> {formattedNumber(ps.average_price_per_share)}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>profit/loss:</strong> {formattedNumber(ps.profit_loss)}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>total in fees:</strong> {formattedNumber(ps.total_in_fees)}
                                    </Typography>

                                    <Box mt={2}>
                                        <TextField
                                            label="Current Price"
                                            variant="outlined"
                                            size="small"
                                            type="number"
                                            value={currentPrices[ps.id] || ''}
                                            onChange={(e) => handlePriceChange(ps.id, e.target.value)}
                                        />
                                    </Box>

                                    <Box mt={2}>
                                        <Typography variant="body2" color="primary">
                                            <strong>Calculated profitability:</strong> {
                                                currentPrices[ps.id]
                                                    ? formattedNumber(calculateProfitability(ps.average_price_per_share, ps.number_share, currentPrices[ps.id]))
                                                    : 'Enter current price to calculate'
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default PortfolioShareList; 
