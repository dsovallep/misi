import React, { useEffect, useState } from "react";
import { getPortfolios } from "../services/api_misi_back.js";

const PortfolioList = () => {
    const [portfolios, setPortfolios] = useState([]);
    
    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            const response = await getPortfolios();
	    setPortfolios(response.data);
	} catch (error){
            console.error("Error fetching portfolios:", error);
	}
    };

    return(
	    <div>
	        <h2>Portfolios</h2>
	        <ul>
	            {portfolios.map((portfolio) => (
                        <li key={portfolio.id}>
			    {portfolio.name} - {portfolio.description}
			</li>
		    ))}
	        </ul>
	    </div>
    );
};

export default PortfolioList;
