import React, { useState } from "react";
import styled from "styled-components";
import { FaUpload } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [initAvatar, setInitavatar] = useState("/assets/illustration.jpg");
  const [avatar, setAvatar] = useState();

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    const imageUrl = await URL.createObjectURL(file);
    setInitavatar(imageUrl);
    setAvatar(file);
  };

  const formSchema = yup.object().shape({
    fullname: yup.string().required("This field must not be empty"),
    email: yup.string().email().required("This field must not be empty"),
    password: yup.string().required("This field must not be empty"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password does not match"),
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
    const { fullname, email, password } = data;
    console.log(data);
    const form = new FormData();
    form.append("fullname", fullname);
    form.append("email", email);
    form.append("password", password);
    form.append("avatar", avatar);

    const url = `https://saveet-backend.herokuapp.com/api/user`;
    const url2 = "http://127.0.0.1:1110/api/user";

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        const percent = Math.floor((loaded * 100) / total);
        console.log(percent);
      },
    };

    await axios.post(url, form, config).then((res) => {
      console.log(res);
    });
    reset();
    navigate("/signin");
  });
  return (
    <Container>
      <ImageDiv>
        <img src="/assets/illustration.jpg" />
      </ImageDiv>
      <Content>
        <Wrap>
          <Text>
            <h2>Signup </h2>
            <span>Please fill the details below</span>
          </Text>
          <Form onSubmit={handleFormSubmit}>
            <AvatarHold>
              <img src={initAvatar} />
              <Label htmlFor="avatar">
                <FaUpload fontSize="25px" style={{ color: "white" }} />
              </Label>
            </AvatarHold>

            <input
              id="avatar"
              type="file"
              style={{ display: "none" }}
              onChange={handleAvatar}
            />

            <span style={{ color: "red", width: "100%" }}>
              {errors.fullname && errors.fullname.message}
            </span>
            <input
              type="text"
              placeholder="Enter Fullname"
              {...register("fullname")}
            />

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

            <span style={{ color: "red", width: "100%" }}>
              {errors.confirm && errors.confirm.message}
            </span>
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirm")}
            />
            <button type="submit">Submit</button>
          </Form>
          <Option>
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "var(--blue)" }}>
              Login here
            </Link>
          </Option>
        </Wrap>
      </Content>
    </Container>
  );
}

export default SignUp;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  padding: 30px 0 50px;
`;

const ImageDiv = styled.div`
  flex: 0.5;
  height: 100%;

  img {
    width: 100%;
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
    border-radius: 5px;
    margin-bottom: 20px;
  }

  button {
    background-color: rgb(0, 125, 254);
    border: 0;
    outline: none;
    padding: 15px 30px;
    color: white;
    font-size: 18px;

    width: 90%;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.35s;

    :hover {
      transform: scale(1.025);
      background-color: rgba(0, 125, 254, 0.5);
    }
  }
`;

const AvatarHold = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  border: 1px solid var(--blue);
  margin-bottom: 30px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Label = styled.label`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const Option = styled.div`
  text-align: center;
  margin-top: 10px;
`;
// const Container = styled.div``
