import React, { useState } from "react";

const LandingPageForm = ({ formData, handleFormChange, size = "large" }) => {
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5";
  const [file, setFile] = useState("");
  return (
    <div className="form ">
      <form className="flex gap-5 my-2 flex-col">
        <label className="">
          Course Title <br />
          <input
            name="course_title"
            value={formData.course_title}
            onChange={(e) => handleFormChange(e)}
            type="text"
            className={inputClass}
            placeholder="course title"
          />
        </label>
        <label>
          Course Subtitle <br />
          <input
            name="course_subtitle"
            value={formData.course_subtitle}
            onChange={(e) => handleFormChange(e)}
            type="text"
            className={inputClass}
            placeholder="Course subtitle"
          />
        </label>
        <label>
          Course Description <br />
          <textarea
            name="course_description"
            value={formData.course_description}
            onChange={(e) => handleFormChange(e)}
            className={inputClass}
            placeholder="Message: Congratulations in completing coursename."
            rows={3}
          />
        </label>

        <div className="flex flex-col gap-2 xs:flex-row">
          <label>
            Language <br />
            <select
              name="course_language"
              value={formData.course_language}
              onChange={(e) => handleFormChange(e)}
              className={inputClass}
            >
              <option>Select One Option</option>
              <option>Telugu</option>
              <option>Hindi</option>
              <option>English</option>
            </select>
          </label>

          <label>
            Level <br />
            <select
              name="course_difficulty_level"
              //   value={formData.course_difficulty_level}
              onChange={(e) => handleFormChange(e)}
              className={inputClass}
            >
              <option>Select One Option</option>
              <option>Begginer</option>
              <option>Intermediate</option>
              <option>Professional</option>
            </select>
          </label>

          <label>
            Category <br />
            <select
              value={formData.course_category}
              onChange={(e) => handleFormChange(e)}
              className={inputClass}
            >
              <option>1</option>
            </select>
          </label>
        </div>

        <label htmlFor="upload-ppt">
          Upload Video or PPT
          <div
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              {file1 === "" ? (
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
              ) : (
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  {"Uploaded " + file1}
                </p>
              )}
            </div>
            <input
              name="course_intro_file"
              //   value={file1}
              onChange={(e) => {
                setFile1(e.target.files[0].name);
                // console.log(e.target.files[0]);
                // console.log(URL.createObjectURL(e.target.files[0]));
                // setFile(URL.createObjectURL(e.target.files[0]));
                handleFormChange(e);
              }}
              id="upload-ppt"
              type="file"
              class="hidden"
            />
          </div>
        </label>

        <label htmlFor="upload-landing">
          Upload Landing Photo
          <div
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              {file2 === "" ? (
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
              ) : (
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  {"Uploaded " + file1}
                </p>
              )}
            </div>
            <input
              name="course_thumbnail"
              //   value={formData.course_thumbnail}
              onChange={(e) => {
                setFile2(e.target.files[0].name);
                handleFormChange(e);
              }}
              id="upload-landing"
              type="file"
              class="hidden"
            />
          </div>
        </label>
      </form>
      {/* <img src={file} /> */}
    </div>
  );
};

export default LandingPageForm;
