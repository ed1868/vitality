import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserAside from "./UserAside";
import Moment from "react-moment";
import "./community.css";

import Pulse from "../images/messagePulse.png";

const messagesApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/community`
});

export default class Messages extends Component {
  constructor() {
    super();
    this.state = {
      messages: null
    };
  }

  componentDidMount() {
    messagesApi
      .get()
      .then(responseFromAPI => {
        this.setState({
          ...this.state,
          messages: responseFromAPI.data.messages
        });
        console.log("Response from API is: ", responseFromAPI.data);
      })
      .catch(err => {
        console.log("Error is: ", err);
      });
  }

  render() {
    return (
      <div>
        <h2 id="tweetHeader">Our Pulse </h2>
        <Link to="/community/messages/new" >
        <ion-icon size="large" name="add-circle-outline"></ion-icon>
        </Link>
        {/* <UserAside getUser={this.getUser}/> */}

        {this.state.messages !== null &&
          this.state.messages.map(messages => {
            let username = messages.user ? messages.user.username : "unknown";
            let url = messages.user ? messages.user.url : "unknown";
            return (
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <div style={{ border: "3px solid gray" }}>
                      <div className="message-area">
                        <div>
                          <img id="tweetPic" src={url} />
                        </div>
                        <Link to="/">
                          <ion-icon size="large" name="finger-print" /> @
                          {username} &nbsp;
                        </Link>

                        <h3>{messages.title}</h3>
                        <p>
                           <span>{messages.text} </span>
                        </p>
                        <Link to="/"><button className="btn btn-danger">Delete</button></Link>
                        <br></br>
                        <span className="text-muted">
                          <Moment className="text-muted" format="Do MMM YYYY">
                            {messages.createdAt}
                          </Moment>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}