import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";


const Friends = (props) => {
  const [friends, setFriends] = useState(() => []);
  const [send, setSend] = useState(() => false);
  const [success, setSuccess] = useState(() => false);

  useEffect(() => fetchFriends(), []);

  async function fetchFriends() {
    try {
      const { data } = await axios.get(
        `/auth/friends/${props.match.params.id}`
      );
      console.log("fetch friends was called", data);
      return setFriends(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSend = async (evt) => {
    evt.preventDefault();
    const total = evt.target.quantity.value;
    await axios.post(`/auth/send/${props.state.auth.id}`, { quantity:total, receiver:send });
  };

  const switchSend = (id) => {
    return setSend(send ? false : id);
  };

  const switchSuccess = () => {
    return setSuccess(success ? false : true);
  };

  return (
    <div>
      {send ? (
        <div class="modal is-active">
          <form onSubmit={handleSend}>
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Set Send Amount</p>
                <button
                  onClick={() => switchSend()}
                  class="delete"
                  aria-label="close"
                ></button>
              </header>
              <section class="modal-card-body"></section>
              <input type="number" name="quantity" step={0.00001} />
              <footer class="modal-card-foot">
                <button type="submit" value="Submit" class="button is-success">
                  Save changes
                </button>
                <button class="button" onClick={() => switchSend()}>
                  Cancel
                </button>
              </footer>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}

      {success ? (
        <div class="modal is-active">
          <form onSubmit={handleSend}>
            <div class="modal-background is-primary"></div>
            <div class="modal-card is-primary">
              <header class="modal-card-head">
                <p class="modal-card-title">Your Transaction was Successful!</p>
                <button
                  onClick={() => switchSuccess()}
                  class="delete"
                  aria-label="close"
                ></button>
              </header>
              <section class="modal-card-body"></section>
              <footer class="modal-card-foot">
                <button class="button" onClick={() => switchSuccess()}>
                  Close
                </button>
              </footer>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}

      {friends
        ? friends.map((friend) => {
            return (
              <div key={friend.id} class="box">
                <h4 id="const" class="title is-3">
                  {friend.username.toUpperCase()}
                </h4>
                <article class="message is-light">
                  <span class="icon has-text-light">
                    <i class="fab fa-js"></i>
                  </span>
                </article>
                <div class="buttons">
                  <button
                    onClick={() => switchSend(friend.id)}
                    class="button is-warning"
                  >
                    Send Crypto
                  </button>
                  <button class="button is-warning">Request Crypto</button>
                  <button class="button is-warning">Remove Friend</button>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};

const mapState = (state) => {
  return {
    state,
  };
};

export default connect(mapState)(Friends);
