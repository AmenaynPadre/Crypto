import React, { useEffect,useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from '../../configs'
import { query } from "../../core/helpers/query";
import Loading from "../common/Loading";
import Pagination from "./Pagination";
import Table from "./Table";
import './Table.css'

const List = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [error, setError] = useState(null);
    const totalPages = 5;
    const location = useLocation();
    let {page} = query(location.search);

    const navigate = useNavigate()

   useLayoutEffect(()=>{
        if(!page){  
            navigate({
                pathname: '/',
                search: `?page=1`,
              })    
        }
       fetchCurrency(page || 1)
    },[page])


   const fetchCurrency = (page) =>{
        setIsLoading(true)
        fetch(`${API_URL}&page=${page || 1}&per_page=20`)
            .then(data => {
                if (data.status === 200) {
                    return data.json()
                }
                throw Error()
            })
            .then((currencies) => {
                setCurrencies(currencies);
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false)
            })
    }
    
    const  handleChangePagination = (direction)=>{
       let nextPage = direction === 'next' ? +page + 1 : +page - 1
        navigate({
            pathname: '/',
            search: `?page=${nextPage}`,
          })
    }


        if (error) { 
            return <div>Error</div>
        }
        if (isLoading) {
            return <div className="loading-container">
                <Loading />
            </div>
        }
        return (
            <>
            <Table currencies={currencies}/>
            <Pagination 
            page={+page || 1} 
            totalPages={totalPages}
            handleChangePagination={handleChangePagination}
            />
            </>
            )
}
export default List