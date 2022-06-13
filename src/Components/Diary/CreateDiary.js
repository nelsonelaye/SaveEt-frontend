import React, { useState } from "react";
import styled from "styled-components";
import { FaUpload } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function CreateDiary() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUser);
  const userId = user._id;
  const [initAvatar, setInitavatar] = useState("/assets/illustration.jpg");
  const [avatar, setAvatar] = useState();

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    const imageUrl = await URL.createObjectURL(file);
    setInitavatar(imageUrl);
    setAvatar(file);
  };

  const formSchema = yup.object().shape({
    title: yup.string().required("This field must not be empty"),
    note: yup.string().required("This field must not be empty"),
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
    const { title, note } = data;
    console.log(data);

    const form = new FormData();
    form.append("title", title);
    form.append("note", note);
    form.append("photo", avatar);

    const url = `https://saveet-backend.herokuapp.com/api/user/${userId}/diary/photo`;
    const url2 = `http://127.0.0.1:1110/api/user/${userId}/diary/photo`;

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

    const res = await axios.post(url, form, config);

    if (res.data.data) {
      Swal.fire(
        "Successful!",
        "You've added a new memory. Now view all.",
        "success"
      );
      reset();
      navigate("/");
    } else {
      Swal.fire("Failed!", "Please details correctly", "warning");
    }
  });

  return (
    <Container>
      <Content>
        <Wrap>
          <Text>
            <h2>Create a new memory </h2>
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
              {errors.title && errors.title.message}
            </span>
            <input type="text" placeholder="Title" {...register("title")} />

            <span style={{ color: "red", width: "100%" }}>
              {errors.note && errors.note.message}
            </span>
            <textarea
              type="text"
              placeholder="Enter your message here"
              {...register("note")}
            />

            <button type="submit">Submit</button>
          </Form>
        </Wrap>
      </Content>
    </Container>
  );
}

export default CreateDiary;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: calc(100vh - 180px);
  padding: 20px 0;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrap = styled.div`
  width: 400px;
`;
const Text = styled.div`
  margin-bottom: 30px;
  text-align: center;

  h2 {
    font-size: 30px;
    font-weight: 500;
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
    height: 35px;
    padding: 0 10px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid grey;
    border-radius: 3px;
    margin-bottom: 20px;
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 0 10px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid grey;
    border-radius: 3px;
    margin-bottom: 20px;
  }

  button {
    background-color: rgb(0, 125, 254);
    border: 0;
    outline: none;
    padding: 15px 30px;
    color: white;
    font-size: 16px;
    width: 70%;
    border-radius: 8px;
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
  width: 250px;
  height: 150px;
  border-radius: 10px;
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
