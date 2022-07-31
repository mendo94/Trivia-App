import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import * as actionCreators from "../../store/creators/actionCreators";
import styled from "styled-components";
import "./Menu.css";

const COLORS = {
  primaryDark: "#374e49",
  primaryLight: "#B6EDC8",
};

const MenuLabel = styled.label`
  background-color: ${COLORS.primaryLight};
  position: fixed;
  top: 1.7rem;
  right: 2rem;
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
  text-align: center;
`;

const NavBackground = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  background-image: radial-gradient(
    ${COLORS.primaryDark},
    ${COLORS.primaryLight}
  );
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  z-index: 600;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.8s;
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "black")};
  width: 3rem;
  height: 2px;
  display: inline-block;
  margin-top: 2rem;
  transition: all 0.3s;
  &::before,
  &::after {
    content: "";
    background-color: black;
    width: 3rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-1rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "1rem")};
  }
`;

const Navigation = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 600;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
  transition: width 0.8s, opacity 0.8s;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;
const ItemLink = styled(NavLink)`
  display: inline-block;
  font-size: 2rem;
  font-weight: 300;
  text-decoration: none;
  color: ${COLORS.primaryLight};
  padding: 1rem 2rem;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fff 50%
  );
  background-size: 240%;
  transition: all 0.4s;
  &:hover,
  &:active {
    background-position: 100%;
    color: ${COLORS.primaryDark};
    transform: translateX(1rem);
  }
`;

function HamburgerMenu(props) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  let Navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jsonwebtoken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    props.onLogOut();
    // Navigate("/login");
  };
  return (
    <>
      <MenuLabel htmlFor="navi-toggle" onClick={handleClick}>
        <Icon clicked={click}>&nbsp;</Icon>
      </MenuLabel>
      <NavBackground clicked={click}>&nbsp;</NavBackground>

      <Navigation clicked={click}>
        <List>
          <li>
            <ItemLink onClick={handleClick} to="/homepage">
              Return to Quarters
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/trivia">
              Start Trivium
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/rankings">
              Rankings
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/challenge-friends">
              Challenge Kinsman
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={(handleLogout, handleClick)} to="/login">
              Bid Thee Farewell
            </ItemLink>
          </li>
        </List>
      </Navigation>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(actionCreators.loadAuth(null)),
  };
};

export default connect(null, mapDispatchToProps)(HamburgerMenu);
