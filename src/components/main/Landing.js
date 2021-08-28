import React, { useEffect, useState } from "react";
import axios from "axios";

const Landing = (props) => {
  const [coinbaseUser, setCoinbaseUser] = useState(() => []);
  const [coinbaseAcc, setCoinbaseAcc] = useState(() => []);
  const [toCompare, setToCompare] = useState(() => []); 

  useEffect(() => {
    fetchCoinbaseUser();
    return fetchCoinbaseAcc();
  }, []);

  async function fetchCoinbaseUser() {
    try {
      const { data } = await axios.get(`/auth/user/${props.match.params.id}`);
      setCoinbaseUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCoinbaseAcc() {
    try {
      const { data } = await axios.get(
        `/auth/account/${props.match.params.id}`
      );
      setCoinbaseAcc(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCard(currency) {
    setToCompare([...toCompare, currency])
  }

  async function handleCompare(){
    if(toCompare.length === 2){
    const {data} = await axios.get('/auth/send')
    console.log('compare', data)
    }
  }

  console.log('user info', coinbaseUser)
  console.log('acc info', coinbaseAcc)

  return (
    <div>
      {toCompare[0] ? <div class="box">
                  <h4 id="const" class="title is-3">
                    {toCompare.length === 2 ? '':'Select another currency'}
                  </h4>
                  <article class="message is-light">
                    <span class="icon has-text-light">
                      <i class="fab fa-js"></i>
                    </span>
                    <div class="message-body">
                      {toCompare.length === 2 ? `Compare exchange rates for ${toCompare[0]} & ${toCompare[1]}`
                      : `Compare exchange rates for ${toCompare[0]} &` }
                    </div>
                  </article>
                  <div class="buttons">
                    <button onClick={() => handleCompare()} 
                    class={toCompare.length === 2 ? "button is-primary" :"button is-light"}>
                      {toCompare.length === 2 ? 'Click to Compare!' : 'Select Another Currency'}</button>
                  </div>
                </div>:''}
      {coinbaseAcc.data
        ? coinbaseAcc.data
            .filter((wallet) => wallet.balance.amount > 0)
            .map((wallet) => {
              return (
                <div key={wallet.id} class="box">
                  <h4 id="const" class="title is-3">
                    {wallet.name}
                  </h4>
                  <article class="message is-light">
                    <span class="icon has-text-light">
                      <i class="fab fa-js"></i>
                    </span>
                    <div class="message-body">
                      {`Current Ballance: ${wallet.balance.amount}(${wallet.currency.code})`}
                    </div>
                  </article>
                  <div class="buttons">
                    <button onClick={() => handleCard(wallet.currency.code)} class="button is-warning">{`Select ${wallet.currency.code}`}</button>
                    <button class="button is-warning">{`Exchange ${wallet.currency.code}`}</button>
                  </div>
                </div>
              );
            })
        : ""}
    </div>
  );
};

export default Landing;
