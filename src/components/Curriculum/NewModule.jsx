import { Delete, Edit, NestCamWiredStandTwoTone } from "@mui/icons-material";
import { Card, IconButton } from "@mui/material";
import React, { useState } from "react";
import CustButton from "../custButton";
import Lecture from "./Lecture";
import qs from "qs";
import axios from "axios";
import CustomModal from "../Modal";

const NewModule = ({
  index = 1,
  module_title = "introduction",
  handleModuleDelete,
  size = "large",
}) => {
  const [lectures, setLectures] = useState([]);
  const [newLecture, setNewLecture] = useState("");
  const [openNewLecture, setOpenNewLecture] = useState(false);
  //   console.log(module_title, index);

  const getNextLectureNumber = () => {
    if (lectures.length === 0) return 0;
    return Math.max(...lectures.map((lecture) => lecture.lecture_number)) + 1;
  };
  const addLecture = (event) => {
    event.preventDefault();
    const nextLectureNumber = getNextLectureNumber();
    const newCreatedLecture = {
      lecture_number: nextLectureNumber,
      lecture_name: newLecture,
      module_id: "1",
    };
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = "https://api.youvatar.in/courses/create_course/lecture/";
    const sessionToken = "60d0e366-bae3-47e1-b093-abc5fe3bc360";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(newCreatedLecture),
    };

    fetch(proxyUrl + url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert(data.msg);
        setOpenNewLecture(false);
        setLectures((prev) => [...prev, newCreatedLecture]);
        console.log(data);
      })
      .catch((error) => console.error(error));
    // var data = qs.stringify(newCreatedLecture);
    // var config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "https://api.youvatar.in/courses/create_course/lecture",
    //   headers: {
    //     "content-type": "application/json;charset=UTF-8",
    //     "Access-Control-Allow-Origin": "*",
    //     "postman-token": "35a5235e-655d-2496-27a8-a83be2ff370f",
    //     "cache-control": "no-cache",
    //   },
    //   data: data,
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log(response.data);
    //     alert(response.data.msg);
    //     setOpenNewLecture(false);
    //     setLectures((prev) => [...prev, newCreatedLecture]);
    //     console.log(lectures);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  const deleteLecture = (lecture_number) => {
    console.log(lecture_number);
    setLectures((prev) =>
      prev.filter((lecture, index) => lecture.lecture_number !== lecture_number)
    );
  };
  return (
    <>
      <Card className="xs:p-5 p-2 flex flex-col">
        <div className="flex justify-start align-middle items-center">
          <p className="font-bold xs:text-base">
            Module {index}: {module_title}
          </p>
          <div className="icons">
            <IconButton style={{ color: "black" }}>
              <Edit />
            </IconButton>
            <IconButton style={{ color: "black" }} onClick={handleModuleDelete}>
              <Delete />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col">
          {lectures.map((lecture) => (
            <Lecture
              size={size}
              key={lecture.lecture_number}
              lecture_name={lecture.lecture_name}
              lecture_number={lecture.lecture_number}
              handleDeleteLecture={() => deleteLecture(lecture.lecture_number)}
            />
          ))}
        </div>
        <div>
          <CustButton
            size={size}
            onClick={() => setOpenNewLecture(true)}
            label="Add Next Lecture"
          />
        </div>
      </Card>
      <CustomModal
        open={openNewLecture}
        handleClose={() => setOpenNewLecture(false)}
      >
        <form onSubmit={(e) => addLecture(e)}>
          <label>
            Enter Lecture's Name: <br />
            <input
              className="my-3"
              placeholder="Enter The Lecture's Name"
              value={newLecture}
              onChange={(e) => setNewLecture(e.target.value)}
              type="text"
            />
          </label>
          <CustButton size={size} type="submit" label="Add Module" />
        </form>
      </CustomModal>
    </>
  );
};

export default NewModule;
