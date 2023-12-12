import React, { useEffect, useState } from "react";
import {getCurrencyURL} from '../../configs';
import Loading from "../common/Loading";
import {renderChangePercent} from '../../core/helpers/renderChangePercent'
import { Charter } from "..";
import './Detail.css'
import { useParams } from "react-router-dom";

const Detail = () =>{
    const [currency, setCurrency] = useState({})
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isShowCharter, setIsShowCharter] = useState(false)
    const params = useParams();


    useEffect(()=>{
            getCurrencyInfoById()
    },[params.id])

  const getCurrencyInfoById = async ()=>{
      const url = getCurrencyURL(params.id)
      setIsLoading(true)
      try {
          const response = await fetch(url);
          const result = await response.json()
          setIsLoading(false)
          setCurrency(result[0])
        } catch (error) {
          setError(error)
          setIsLoading(false)
      }
    }

   const handleIsShowCharter = (e,isShow) =>{
      e.stopPropagation()
      setIsShowCharter((prev) =>(
         isShow && !prev.isShowCharter ? true : false
      ))
    }

        if(error){
            return <div>Error...</div>
        }
        if(isLoading){
            return (  
            <div className="loading-container">
            <Loading/>
            </div>)
        }
        return (
         <>
         {isShowCharter && <Charter handleIsShowCharter={handleIsShowCharter}/>}
            <div className="Detail">
            <h1 className="Detail-heading">
                <img 
                src={`${currency.image}`} 
                alt="currency_image" 
                onClick={(e)=> handleIsShowCharter(e,true)}
                />
              {currency.name} ({currency.symbol})
            </h1>
    
            <div className="Detail-container">
              <div className="Detail-item">
                Price <span className="Detail-value">$ {currency.current_price}</span>
              </div>
              <div className="Detail-item">
                Rank <span className="Detail-value">{currency.market_cap_rank}</span>
              </div>
              <div className="Detail-item">
                24H Change
                <span className="Detail-value">{renderChangePercent(currency.market_cap_change_percentage_24h)}</span>
              </div>
                <div className="Detail-item">
                    24H Change
                    <span className="Detail-value">
                        $ {currency.price_change_24h}
                    </span>
                </div>
            
              <div className="Detail-item">
                <span className="Detail-title">Market cap</span>
                <span className="Detail-dollar">$</span>
                {currency.market_cap}
              </div>
              <div className="Detail-item">
                <span className="Detail-title">Total volume</span>
                {currency.total_volume}
              </div>
            </div>
          </div>
         </>
        )
}
export default Detail