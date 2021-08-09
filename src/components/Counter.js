import React from "react";

import { connect } from "react-redux";

import {
  increaseCounter,
  decreaseCounter,
} from "../redux/Counter/counter.actions";

function Counter(props) {
  return (
    <div>
      <h4>Contoh Dasar Belajar Redux Store</h4>
      <div>Count: {props.count}</div>

      <button type="button" className="btn btn-danger mr-2" onClick={() => props.decreaseCounter()}>Kurang</button>
      <button type="button" className="btn btn-success" onClick={() => props.increaseCounter()}>Tambah</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.counter.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCounter: () => dispatch(increaseCounter()),

    decreaseCounter: () => dispatch(decreaseCounter()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
