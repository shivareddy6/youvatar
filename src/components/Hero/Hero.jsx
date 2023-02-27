import React, { useEffect, useState } from "react";
import landingPhoto from "../../assets/landingPhoto.png";
import progress0 from "../../assets/progress0.png";
import { mainHeading, mainHeadingMobile } from "../../style";
import CustButton from "../custButton";
import LandingPageForm from "./LandingPageForm";
import "./styles.css";
import qs from "qs";
import axios, { formToJSON } from "axios";
import Curriculum from "../Curriculum/Curriculum";

import { storageRef } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Hero() {
  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5";
  const [isLandingPage, setIsLandingPage] = useState(true);
  const [modules, setModules] = useState([]);
  const [formData, setFormData] = useState({
    school_id: "27",
    course_title: "",
    course_subtitle: "",
    course_description: "",
    course_language: "Select One Option",
    course_difficulty_level: "Select One Option",
    course_category: "1",
    course_intro_file: "",
    course_thumbnail: "",
  });
  const [thumbnail, setThumbnail] = useState("");

  const fields = [
    "course_title",
    "course_subtitle",
    "course_description",
    "course_language",
    "course_difficulty_level",
    "course_category",
    "course_intro_file",
    "course_thumbnail",
  ];

  const initialData = {
    school_id: "27",
    course_title: "",
    course_subtitle: "",
    course_description: "",
    course_language: "Select One Option",
    course_difficulty_level: "Select One Option",
    course_category: "1",
    course_intro_file: "",
    course_thumbnail: "",
  };

  const getFieldValue = (s) => {
    s = s.split("_");
    let value = "";
    s.forEach(
      (string) =>
        (value += string.charAt(0).toUpperCase() + string.slice(1) + " ")
    );
    return value;
  };

  const uploadFileToFirebase = (e) => {
    const file = e.target.files[0];
    // console.log("uploading", file);
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
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: downloadURL,
        }));
        // setIsLandingPage(false);
        if (e.target.name === "course_thumbnail") setThumbnail(downloadURL);
      }
    );
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    // console.log("change triggered", name);
    if (
      name === fields[fields.length - 2] ||
      name === fields[fields.length - 1]
    ) {
      uploadFileToFirebase(event);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleBackClick = () => {
    setIsLandingPage(true);
  };

  const handleProceedClick = () => {
    // setIsLandingPage(false);
    // return;
    if (isLandingPage === false) return;
    for (var i = 0; i < fields.length - 2; i++) {
      if (formData[fields[i]].length === 0) {
        alert(`fill the data in ${getFieldValue(fields[i])}`);
        return;
      }
    }
    // console.log(tempData);
    // console.log(formData);
    var data = qs.stringify(formData);
    // console.log(data);
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.youvatar.in/courses/create_course/landing_page",
      headers: {},
      data: data,
    };
    // console.log(data);
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert(response.data.msg);
        setIsLandingPage(false);
        setFormData(initialData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  return (
    <>
      <div className="mb-20 xs:flex flex-col p-5 mx-[10%] xs:mx-[10%] md:mx-[20%] lg:mx-[30%]">
        <h1 className="pb-2" style={mainHeading}>
          {isLandingPage ? "Course Landing Page" : "Cirriculum"}
        </h1>
        <div className="flex justify-between gap-2">
          <img
            src={thumbnail === "" ? landingPhoto : thumbnail}
            className="xs:w-[48%] lg:w-[45%] w-[100%]"
            alt="Course Thumbnail"
            style={{ aspectRatio: "2/1" }}
          />
          <img src={progress0} className="w-[48%] lg:w-[45%] xs:flex hidden" />
        </div>

        {isLandingPage ? (
          <LandingPageForm
            handleFormChange={handleFormChange}
            formData={formData}
          />
        ) : (
          <Curriculum modules={modules} setModules={setModules} />
        )}

        <div className="hero-bottom flex flex-row justify-between w-[100%] my-2">
          <CustButton
            onClick={handleBackClick}
            // noPaddingLeft="true"
            background="none"
            className="w-20"
            label="Back"
          />
          <CustButton
            onClick={handleProceedClick}
            className="w-20"
            label="Proceed"
          />
        </div>
      </div>

      {/* <div className="xs:hidden gap-1 flex flex-col p-5 mx-[10%] lg:mx-[25%] justify-between ">
        <h1 className="pb-2" style={mainHeadingMobile}>
          Course Landing Page
        </h1>
        <div className="flex justify-between gap-2">
          <img
            src={landingPhoto}
            style={{ width: "250px", maxWidth: "100%" }}
          />
        </div>

        {isLandingPage ? (
          <LandingPageForm
            size="small"
            handleFormChange={handleFormChange}
            formData={formData}
          />
        ) : (
          <Curriculum size="small" modules={modules} setModules={setModules} />
        )}
        <div className="hero-bottom flex w-[100%] flex-row justify-between">
          <CustButton
            size="small"
            onClick={handleBackClick}
            noPaddingLeft="true"
            background="none"
            className="w-20"
            label="Back"
          />
          <CustButton
            size="small"
            onClick={handleProceedClick}
            className="w-20"
            label="Proceed"
          />
        </div>
      </div> */}
    </>
  );
}

export default Hero;
