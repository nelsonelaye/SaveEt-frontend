import React from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../ReduxState/GlobalState";
const Header = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.currentUser);

  return (
    <Container>
      <Wrapper>
        <Logo>
          <img src="/assets/logo1.png" />
        </Logo>

        {userData ? (
          <User>
            <Link
              to="/creatediary"
              style={{ color: "black", textDecoration: "none" }}
            >
              <span>Create memory</span>
            </Link>
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              <span
                onClick={() => {
                  dispatch(signOut());
                }}
              >
                logout
              </span>
            </Link>
            <Username>{userData?.fullname}</Username>
            <Avatar>
              <img src={userData?.avatar} />
            </Avatar>

            <ArrowDownIcon />
          </User>
        ) : (
          <Buttons>
            <Link
              to="/creatediary"
              style={{ color: "black", textDecoration: "none" }}
            >
              <span>Create memory</span>
            </Link>
            <Link
              to="/signin"
              style={{ color: "black", textDecoration: "none" }}
            >
              <span>Login</span>
            </Link>
            <Link
              to="/signup"
              style={{ color: "white", textDecoration: "none" }}
            >
              {" "}
              <button>Register</button>
            </Link>
          </Buttons>
        )}
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgb(230, 230, 250);
`;

const Wrapper = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 10px;
  }
`;

const Logo = styled.div`
  width: 80px;

  img {
    width: 100%;
  }
`;
const Buttons = styled.div`
  display: flex;
  // display: none;
  align-items: center;
  span {
    font-weight: 500;
    margin-left: 20px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.35s;
    :hover {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  button {
    border: 0;
    margin-left: 20px;
    outline: none;
    background-color: var(--blue);
    padding: 10px 25px;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.35s;
    :hover {
      transform: scale(1.05);
      background-color: rgba(0, 125, 254, 0.7);
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

const User = styled.div`
  display: flex;
  // display: none;
  align-items: center;

  span {
    font-weight: 500;
    cursor: pointer;
    transition: all 0.35s;
    margin: 0 10px;
    :hover {
      color: rgba(0, 0, 0, 0.6);
    }
  }

  @media screen and (max-width: 768px) {
    margin: 0 8px;
  }
`;

const ArrowDownIcon = styled(BiChevronDown)`
  font-size: 25px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin: 0 10px 0 20px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
const Username = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
// const Container = styled.div``
// const Container = styled.div``
