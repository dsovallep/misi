import React, { useEffect, useState } from "react";
import { getShares } from "../services/api_misi_back.js"


const ShareList = () => {
        const[shares, setShares] = useState([])

	useEffect(() => {
		fetchShares();
        
	}, []);

	const fetchShares = async () => {
		try {
			const response = await getShares();
			setShares(response.data);                
		}catch (error) {
			console.error("Error fetching share", error);                    
		}

	};

	return(
		<div>
                    <h2>Shares</h2>
		    <ul>
		        {shares.map((share) => (
                            <li key={share.id}>
			        {share.name} ({share.symbol}) - {share.current_price}
			    </li>
			))}
		    </ul>
		</div>
	);

};

export default ShareList;
