import React from "react";

import { connect } from "react-redux";

import {
  increaseCounterPersist,
  decreaseCounterPersist,
} from "../redux/CounterPersist/counterPersist.actions";

function CounterPersist(props) {
  return (
    <div>
      <h4>Contoh Dasar Belajar Redux Store Persist</h4>
      <div>Count: {props.count}</div>

      <button type="button" className="btn btn-danger mr-2" onClick={() => props.decreaseCounterPersist()}>Kurang</button>
      <button type="button" className="btn btn-success" onClick={() => props.increaseCounterPersist()}>Tambah</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.counterPersist.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCounterPersist: () => dispatch(increaseCounterPersist()),

    decreaseCounterPersist: () => dispatch(decreaseCounterPersist()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterPersist);
