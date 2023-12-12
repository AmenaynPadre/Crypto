import React from "react";
import { useNavigate } from "react-router-dom";
import {renderChangePercent} from '../../core/helpers/renderChangePercent'

const Table = ({currencies}) =>{
    const navigate = useNavigate();
    return (
        <div className="Table-container">
        <table className="Table">
            <thead className="Table-head">
                <tr>
                    <th>Cryptocurrency</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>24H Change</th>
                </tr>
            </thead>
            <tbody className="Table-body">
                {
                    currencies.map(({id,name,image, current_price, market_cap, market_cap_change_percentage_24h}) => {
                        return (
                            <tr 
                            key={id}
                            onClick={() => navigate(`/currency/${id}`)}
                            >
                                <td>
                                    <span className="Table-rank">
                                        <img
                                            style={{ width: '50px', height: '50px' }}
                                            src={image}
                                            alt={name}
                                        />
                                    </span>
                                    {name}
                                </td>
                                <td>
                                   <span className="Table-dollar">{current_price}</span>
                                </td>
                                <td>
                                    <span className="Table-dollar">{market_cap}</span>
                                </td>
                                <td>
                                   {
                                       renderChangePercent(market_cap_change_percentage_24h)
                                   }
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
    )
}
export default Table;