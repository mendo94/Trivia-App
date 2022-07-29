import React, { useEffect } from "react";
// import * as actionCreators from "../store/creators/actionCreators";
import { connect } from "react-redux";

function Rankings(props) {
  useEffect(() => {
    getRankings();
  }, []);
  const getRankings = () => {
    fetch("http://localhost:2000/rankings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((ranking) => {
        if (ranking) {
          console.log(ranking);
          //   props.onQuestionLoaded(question);
        }
      });
  };
  return <div>Rankings</div>;
}

// const mapStateToProps = (state) => {
//   return {
//     books: state.bookReducer.books,
//     userId: state.userReducer.userId,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: (favorite) => dispatch(actionCreators.loadCart(favorite)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Rankings);
export default Rankings;
