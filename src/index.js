import React from 'react';
import ReactDom from 'react-dom';
import { NotFound, List, Header, Detail } from './components';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'

const App = () =>{
  return (
    <BrowserRouter>
    <div>
      <Header/>
      <Routes>
        <Route path={'/'} element={<List/>} />
        <Route path={'/currency/:id'} element={<Detail/>} />
        <Route element={<NotFound/>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}


ReactDom.render(
   <App/>,
  document.getElementById('root')
)