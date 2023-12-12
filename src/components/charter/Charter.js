import React, { useEffect, useMemo, useRef, useState } from "react"
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useParams } from "react-router-dom"


const Charter = ({handleIsShowCharter}) =>{
    const [charterInfo, setCharterInfo] = useState({});
    const charterRef = useRef();
    const params = useParams()

   const outsideClick=(e)=>{
        if(!charterRef.current.contains(e.target)){
            handleIsShowCharter(e,false)
        }
    }

    useEffect(()=>{
        (async()=>{
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=3`)
        const result = await response.json();
        setCharterInfo(result)
        })()
        document.addEventListener('click',outsideClick) 
        return () =>{
            document.removeEventListener('click',outsideClick)
        }
    },[])

    useEffect(()=>{
            return ()=>{

            }
    },[])

    const options = useMemo(()=>{
        const { prices } = charterInfo
        if(!prices){
            return null
        }
        const priceModel = prices.map(item => item[1]);
        return  { 
                        series: [ {name:'Price',data:priceModel }]
                } 
    },[charterInfo])
    

        return(
            <div ref={charterRef}>
                {options && <HighchartsReact highcharts={Highcharts} options={options}/>}
            </div>
        )
}
export default Charter