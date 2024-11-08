import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import PortfolioShareList from '../components/PortfolioShareList';


function Home() {
    return(
	<Container>
            <Box sx={{ textAling: 'center', padding: '20px 0' }}>
	        <Typography variant="h3" component="h1" gutterBottom>
	            Welcome to Stock Portfolio Tracker
	        </Typography>
	    </Box>

	    <Grid>
	        <Box>
	            <PortfolioShareList />
	        </Box>
	    </Grid>
        </Container>        
    );
}


export default Home;
