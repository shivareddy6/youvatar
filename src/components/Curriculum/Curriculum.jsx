import { Card } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustButton from "../custButton";
import Modal from "../Modal";
import NewModule from "./NewModule";
import qs from "qs";
import "./styles.css";

const Curriculum = ({ size = "large", modules, setModules }) => {
  // console.log(modules)
  const [openAddModule, setOpenAddModule] = useState(false);
  const [newModuleName, setNewModuleName] = useState("");

  const getNextModuleNumber = () => {
    if (modules.length === 0) return 0;
    return Math.max(...modules.map((curModule) => curModule.module_number)) + 1;
  };

  const deleteModule = (module_number) => {
    // console.log("delete", module_number);
    // console.log(modules.filter((mod) => mod.module_name));
    setModules((prev) =>
      prev.filter((curModule) => curModule.module_number !== module_number)
    );
  };

  // useEffect(() => console.log(modules), [modules]);

  const addModule = (event) => {
    event.preventDefault();
    // console.log("module added");
    // console.log(newModuleName);
    const nextModuleNumber = getNextModuleNumber();
    const newModule = {
      module_number: nextModuleNumber,
      module_name: newModuleName,
      course_id: "4",
    };
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = "https://api.youvatar.in/courses/create_course/module/";
    const sessionToken = "60d0e366-bae3-47e1-b093-abc5fe3bc360";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(newModule),
    };

    fetch(proxyUrl + url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert(data.msg);
        setModules((prev) => [...prev, newModule]);
        setOpenAddModule(false);
        setNewModuleName("");
        console.log(data);
      })
      .catch((error) => console.error(error));
    // var data = qs.stringify(newModule);
    // var config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "https://api.youvatar.in/courses/create_course/module",
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
    //     // console.log(response.data);
    //     alert(response.data.msg);
    //     setModules((prev) => [...prev, newModule]);
    //     setOpenAddModule(false);
    //     setNewModuleName("");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  // useEffect(() => console.log(modules), [modules]);
  return (
    <>
      <div className="curriculum flex flex-col gap-2 my-2">
        <p className="mb-2 text-sm xs:text-base">
          Start putting together your course by creating sections, lectures and
          practice
        </p>
        {modules.map((module, index) => (
          <NewModule
            size={size}
            module_title={module.module_name}
            index={module.module_number}
            key={`module-${index}`}
            handleModuleDelete={() => deleteModule(module.module_number)}
          />
        ))}
      </div>
      <div style={{ width: "230px !important", marginBottom: "3px" }}>
        <CustButton
          size={size}
          onClick={() => setOpenAddModule(true)}
          label="Add New Module"
        />
      </div>
      <Modal open={openAddModule} handleClose={() => setOpenAddModule(false)}>
        <form onSubmit={(e) => addModule(e)}>
          <label>
            Enter Module's Name: <br />
            <input
              className="my-3"
              placeholder="Enter The Modules Name"
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
              type="text"
            />
          </label>
          <CustButton size={size} type="submit" label="Add Module" />
        </form>
      </Modal>
    </>
  );
};

export default Curriculum;
