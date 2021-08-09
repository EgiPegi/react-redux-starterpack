import React, { Component } from "react";
import Counter from "../components/Counter";
import CounterPersist from "../components/CounterPersist";

import UserService from "../services/auth/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div>
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          <hr className="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <button className="btn btn-primary btn-lg">
            Learn more
          </button>
        </header>
        <Counter />
        <div className="mt-5" />
        <CounterPersist />

        <p className="mt-5">Klik Button tambah atau kurang dari dua contoh diatas. Refresh buat lihat bedanya</p>
      </div>
    );
  }
}
