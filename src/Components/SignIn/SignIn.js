import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createUser } from "../ReduxState/GlobalState";
import Swal from "sweetalert2";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSchema = yup.object().shape({
    email: yup.string().email().required("This field must not be empty"),
    password: yup.string().required("This field must not be empty"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    console.log(data);

    const form = new FormData();
    form.append("email", email);
    form.append("password", password);

    const url = "http://127.0.0.1:1110/api/user/login";

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const res = await axios.post(url, { email, password });
    // .then((res) => {
    //   console.log(res.data.data);
    //   dispatch(createUser(res.data.data));
    //   // Swal.fire("Welcome back!", "Start saving memories!", "info");
    //   reset();
    //   navigate("/");
    // })
    // .catch((err) => {
    //   console.log(err.message);
    //   // Swal.fire("Login failed!", "Try again. ", "warning");
    //   reset();
    // });

    if (res.data.data) {
      console.log(res.data.data);
      dispatch(createUser(res.data.data));
      reset();
      navigate("/");
      Swal.fire("Welcome back!", "Start saving memories!", "success");
    } else {
      Swal.fire(
        "Login failed!",
        "Please check your details and try again. ",
        "warning"
      );
      console.log(res);
      reset();
    }
  });
  return (
    <Container>
      <ImageDiv>
        <img src="/assets/illustration.jpg" />
      </ImageDiv>
      <Content>
        <Wrap>
          <Text>
            <h2>Welcome back</h2>
            <span>Please fill the details below</span>
          </Text>
          <Form onSubmit={handleFormSubmit}>
            <span style={{ color: "red", width: "100%" }}>
              {errors.email && errors.email.message}
            </span>
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email")}
            />

            <span style={{ color: "red", width: "100%" }}>
              {errors.password && errors.password.message}
            </span>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password")}
            />

            <button type="submit">Submit</button>
          </Form>
          <Option>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "var(--blue)" }}>
              Register for free
            </Link>
          </Option>
        </Wrap>
      </Content>
    </Container>
  );
}

export default SignIn;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  min-height: calc(100vh - 200px);
`;

const ImageDiv = styled.div`
  flex: 0.5;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    flex: 1;
  }
`;
const Wrap = styled.div`
  width: 70%;
`;
const Text = styled.div`
  margin-bottom: 30px;

  h2 {
    font-size: 35px;
    margin: 10px 0;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  input {
    width: 100%;
    height: 45px;
    padding: 0 10px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid grey;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  button {
    background-color: var(--blue);
    border: 0;
    outline: none;
    padding: 15px 30px;
    color: white;
    font-size: 18px;

    width: 100%;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.35s;

    :hover {
      transform: scale(1.025);
      background-color: rgba(0, 125, 254, 0.5);
    }
  }
`;

const Option = styled.div`
  text-align: center;
  margin-top: 10px;
`;
// const Container = styled.div``
// const Container = styled.div``
// const Container = styled.div``
