import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { storageRef } from "../../firebase";
import CustButton from "../custButton";
import CustomModal from "../Modal";
import qs from "qs";

const Lecture = ({
  lecture_name = "Lecture",
  handleDeleteLecture,
  size = "large",
  lecture_number = "1",
}) => {
  const [isResourceSubmitted, setIsResourceSubmitted] = useState(false);
  const [openViewResource, setViewResource] = useState(false);
  const [openAddResource, setAddResource] = useState(false);
  const [resource, setResource] = useState("");
  const [resourceLink, setResourceLink] = useState(
    "https://picsum.photos/200/300"
  );
  const [disableSubmit, setDeisableSubmit] = useState(true);

  const uploadFileToFirebase = (e) => {
    const file = e.target.files[0];
    console.log("uploading", file);
    const fileRef = ref(storageRef, file.name);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
      (error) => {
        console.error(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at:", downloadURL);
        setResourceLink(downloadURL);
        setDeisableSubmit(false);
        setIsResourceSubmitted(true);
      }
    );
  };

  const handleResourceSubmit = (event) => {
    event.preventDefault();
    if (disableSubmit) return;
    const data = {
      resource_file: resourceLink,
      lecture_id: lecture_number,
    };
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url =
      "https://api.youvatar.in/courses/create_course/lecture/resource/";
    const sessionToken = "60d0e366-bae3-47e1-b093-abc5fe3bc360";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(data),
    };

    fetch(proxyUrl + url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert(data.msg);
        console.log(data);
      })
      .catch((error) => console.error(error));
    // var data = qs.stringify({
    //   resource_file: resourceLink,
    //   lecture_id: lecture_number,
    // });
    // var config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "https://api.youvatar.in/courses/create_course/lecture/resource",
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
    //     console.log(JSON.stringify(response.data));
    //     alert(response.data.msg);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    console.log(resourceLink);
    setAddResource(false);
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center border-2 border-[#C7C9D9] my-1 p-2">
        <div className="flex items-center gap-2">
          <p className="text-sm xs:text-base">{lecture_name}</p>
          <div className="icons flex items-center">
            <IconButton style={{ color: "black" }}>
              <Edit />
            </IconButton>
            <IconButton
              style={{ color: "black" }}
              onClick={handleDeleteLecture}
            >
              <Delete />
            </IconButton>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <CustButton
            noPaddingLeft="true"
            size={size}
            background="none"
            label="Add Assignments"
          />
          {isResourceSubmitted ? (
            <a
              className="text-sm xs:text-base border-2 border-[#3949AB] bg-[#3949AB] text-white  px-2 py-1 "
              href={resourceLink}
              target="_blank"
              style={{ borderRadius: "3px" }}
            >
              View Resource
            </a>
          ) : (
            <CustButton
              onClick={() => setAddResource(true)}
              noPaddingLeft="true"
              size={size}
              label="Add Resources"
            ></CustButton>
          )}
        </div>
      </div>
      <CustomModal
        open={openAddResource}
        handleClose={() => {
          console.log("close");
          setAddResource(false);
        }}
        style={{ width: "0" }}
      >
        <form
          onSubmit={(e) => handleResourceSubmit(e)}
          className="flex flex-col gap-4 items-center"
        >
          <label>
            <p className="font-bold">Select Resource:</p>
            <br />
            <input
              value={resource}
              onChange={(e) => {
                setResource(e.target.value);
                uploadFileToFirebase(e);
              }}
              type="file"
              name="resource file"
            />
          </label>
          <CustButton
            disabled={disableSubmit}
            onClick={handleResourceSubmit}
            label="Add Resource"
          />
        </form>
      </CustomModal>
    </>
  );
};

export default Lecture;
