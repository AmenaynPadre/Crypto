import React, { useEffect, useState } from "react";
import { API_URL } from "../../configs";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import './Search.css'

const Search = () => {
  const [currencies, setCurrencies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    (async()=>{
      setIsLoading(true)
       try {
           const response = await fetch(API_URL);
           const result = await response.json();
          setCurrencies(result);
          setIsLoading(false)
          } catch (error) {
        console.log(error);   
       }
    })()
  },[])

  const handleChangeInput = (e) =>{
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery)

    if(!searchQuery){
        setSearchResult([])
        return
    }
    const charFromQuery = searchQuery.split('');
    setIsLoading(true)

    setTimeout(()=>{
        const searchResult = currencies.filter(item =>{
            return charFromQuery.every(char => item.id.includes(char))
        });
        setSearchResult(searchResult)
        setIsLoading(false)
    },500)
   }

 const handleRedirect = (id) =>{
       navigate({
           pathname: `/currency/${id}`
       })
       setSearchQuery('');
       setSearchResult([])
      }

 const  renderSearchResults = ()=>{
    if(!searchQuery){
        return ''
    }  
    if(searchResult.length){
        return (
            <div className="Search-result-container">
            {searchResult.map(result =>
              <div
                key={result.id}
                className="Search-result"
                onClick={()=>handleRedirect(result.id)}
              >
                {result.name} ({result.symbol})
              </div>
            )}
          </div>
        )
    }

    if(!isLoading){
        return (
            <div className="Search-result-container">
                <div className="Search-no-result">
                  No results found.
                </div>
              </div>
        )
    }
   }

        return (
            <div className='Search'>
            <div>
              <span className="Search-icon" />
              <input 
                type="text"
                className="Search-input"
                placeholder="Currency name"
                value={searchQuery}
                onChange={handleChangeInput}
              />
               {
          isLoading &&
            <div className="Search-loading">
              <Loading
                width="12px"
                height="12px"
              />
            </div>}
            </div>
       {renderSearchResults()}     
          </div>
        )
}
export default Search