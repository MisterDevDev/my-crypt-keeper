import React, { useEffect, useState } from "react";
import axios from "axios";

const Landing = (props) => {
    const [coinbaseUser, setCoinbaseUser] = useState(() => [])
    const [coinbaseAcc, setCoinbaseAcc] = useState(() => [])
  
  
    useEffect(() => fetchCoinbaseUser(), [])
    useEffect(() => fetchCoinbaseAcc(), [])
    
    async function fetchCoinbaseUser() {
      try {
        const {data} = await axios.get(`/auth/user/${props.match.params.id}`)
        setCoinbaseUser(data)
        console.log('Look at the user!!', data)
      } catch (error) {
        console.log(error)
      }
    } 
  
    async function fetchCoinbaseAcc() {
      try {
        const {data} = await axios.get(`/auth/account/${props.match.params.id}`)
        setCoinbaseAcc(data)
        console.log('Look at the acc!!', data)
      } catch (error) {
        console.log(error)
      }
    } 

    console.log('landing user', coinbaseUser)
    console.log('landing acc', coinbaseAcc)
    return (
        <div>
            {coinbaseAcc.data ? 
                coinbaseAcc.data.filter((wallet) => wallet.balance.amount > 0)
                .map((wallet) => {
                    return(
                    <div class="box">
                    <h4 id="const" class="title is-3">{wallet.name}</h4>
                    <article class="message is-light">
                        <span class="icon has-text-light">
                            <i class="fab fa-js"></i>
                        </span>
                        <div class="message-body">
                            {`Current Ballance: ${wallet.balance.amount}(${wallet.currency.code})`}
                        </div>
                    </article>
                    <div class="buttons">
                    <button class="button is-warning">{`Buy ${wallet.currency.code}`}</button>
                    <button class="button is-warning">{`Send ${wallet.currency.code}`}</button>
                    </div>
                </div>
                )})
                :
                ""
            }
        </div>
    )
}

export default Landing