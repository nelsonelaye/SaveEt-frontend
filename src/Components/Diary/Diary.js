import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const Diary = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.currentUser);
  const userId = user._id;

  const showDiary = async () => {
    const url = `http://127.0.0.1:1110/api/user/${userId}/diary`;

    await axios
      .get(url)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteMemory = async (diaryId) => {
    const url = `http://127.0.0.1:1110/api/user/${userId}/diary/${diaryId}`;

    await axios
      .delete(url)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    Swal.fire("Deleted!", "Goodbye sweet sweet memory. 😥", "success");
  };
  useEffect(() => {
    showDiary();
  }, [data]);

  return (
    <Wrapper>
      <Container>
        {data?.map((props) => {
          return (
            <Card key={props._id}>
              <ImageHold>
                <img src={props.photo} />
              </ImageHold>
              <Bottom>
                <Text>
                  <Title>{props.title}</Title>
                  <Note>{props.note}</Note>
                </Text>
                <Icons>
                  <SaveIcon />
                  <EditIcon />
                  <DeleteIcon
                    onClick={() => {
                      console.log(props._id);
                      deleteMemory(props._id);
                    }}
                  />
                </Icons>
              </Bottom>
            </Card>
          );
        })}
      </Container>
    </Wrapper>
  );
};

export default Diary;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;
const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
  margin: 30px 0;
`;
const Card = styled.div`
  width: 250px;
  height: 100%;
  min-height: 280px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin: 10px;
`;
const ImageHold = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 5px 5px 0px 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  margin-top: 20px;
  box-sizing: border-box;
`;
const Text = styled.div`
  padding: 10px;
  width: 100%;
`;
const Title = styled.div`
  font-weight: 600;
  width: 100%;

  margin-bottom: 5px;
`;
const Note = styled.div`
  font-size: 13px;
  color: grey;
  word-break: break-all;
  width: 100%;
`;
const Icons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;
const DeleteIcon = styled(MdDelete)`
  font-size: 20px;
  color: red;
  cursor: pointer;
  transition: all 350ms;
  :hover {
    color: grey;
    transform: scale(1.2);
  }
`;
const EditIcon = styled(AiFillEdit)`
  font-size: 20px;
  color: blue;
  cursor: pointer;
  display: none;
  transition: all 350ms;
  :hover {
    color: grey;
    transform: scale(1.2);
  }
`;

const SaveIcon = styled(BsBookmarkHeartFill)`
  font-size: 20px;
  color: orange;
  display: none;
  cursor: pointer;
  transition: all 350ms;
  :hover {
    color: grey;
    transform: scale(1.2);
  }
`;
