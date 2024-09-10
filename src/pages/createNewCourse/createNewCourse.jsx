import "../../assets/styles/index.css";
import { useFormik } from "formik";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import PlusIcon from "../../components/icons/PlusIcon.jsx";
import { notifySuccess } from "../../components/notify/NotifySuccess.jsx";
import NewModule from "./newModule.jsx";
import TrashIcon from "../../components/icons/TrashIcon.jsx";

function CreateNewCourse() {
  const [whatTraineeWillLearn, setWhatTraineeWillLearn] = useState([{ id: 0 }]);
  const [modules, setModules] = useState([
    {
      moduleId: 0,
      categories: [{ categoryId: 0, lessons: [{ lessonId: 0 }] }],
    },
  ]);
  const [outcomes, setOutcomes] = useState([{ id: 0 }]);
  const [prerequisites, setPrerequisites] = useState([{ id: 0 }]);
  const [image, setImage] = useState("/images/picture.png");
  const validationSchema = () =>
    Yup.object({
      name: Yup.string().required("Required!"),
      description: Yup.string().required("Required!"),
    });
  const handleRemoveWhatTraineeWillLearn = (i) => {
    setWhatTraineeWillLearn(
      whatTraineeWillLearn.filter((item) => item.id !== i)
    );
  };
  const handleRemovePrerequisite = (i) => {
    setPrerequisites(prerequisites.filter((item) => item.id !== i));
  };
  const handleAddPrerequisite = () => {
    setPrerequisites([
      ...prerequisites,
      { id: prerequisites[prerequisites.length - 1].id + 1 },
    ]);
  };
  const handleRemoveModules = (moduleId) => {
    setModules(modules.filter((item) => item.moduleId !== moduleId));
  };
  const handleAddModules = () => {
    setModules([
      ...modules,
      {
        moduleId: modules[modules.length - 1].moduleId + 1,
        categories: [{ categoryId: 0, lessons: [{ lessonId: 0 }] }],
      },
    ]);
  };

  // const handleRemoveCategory = (moduleId, categoryId) => {
  //   setModules(
  //     modules.map((module) =>
  //       module.moduleId === moduleId
  //         ? {
  //             ...module,
  //             categories: module.categories.filter(
  //               (category) => category.categoryId !== categoryId
  //             ),
  //           }
  //         : module
  //     )
  //   );
  // };
  // const handleAddCategory = (moduleId) => {
  //   console.log("handleAddCategory");
  //   setModules(
  //     modules.map((module) =>
  //       module.moduleId === moduleId
  //         ? {
  //             ...module,
  //             categories: [
  //               ...module.categories,
  //               {
  //                 categoryId:
  //                   module.categories[module.categories.length - 1].categoryId +
  //                   1,
  //                 lessons: [{ lessonId: 0 }],
  //               },
  //             ],
  //           }
  //         : module
  //     )
  //   );
  // };

  // const handleRemoveLesson = (moduleId, categoryId, lessonId) => {
  //   setModules(
  //     modules.map((module) =>
  //       module.moduleId === moduleId
  //         ? {
  //             ...module,
  //             categories: module.categories.map((category) =>
  //               category.categoryId === categoryId
  //                 ? {
  //                     ...category,
  //                     lessons: category.lessons.filter(
  //                       (lesson) => lesson.lessonId !== lessonId
  //                     ),
  //                   }
  //                 : category
  //             ),
  //           }
  //         : module
  //     )
  //   );
  // };
  // const handleAddLesson = (moduleId, categoryId) => {
  //   setModules(
  //     modules.map((module) =>
  //       module.moduleId === moduleId
  //         ? {
  //             ...module,
  //             categories: module.categories.map((category) =>
  //               category.categoryId === categoryId
  //                 ? {
  //                     ...category,
  //                     lessons: [
  //                       ...category.lessons,
  //                       {
  //                         lessonId:
  //                           category.lessons[category.lessons.length - 1]
  //                             .lessonId + 1,
  //                       },
  //                     ],
  //                   }
  //                 : category
  //             ),
  //           }
  //         : module
  //     )
  //   );
  // };
  const handleRemoveOutcome = (i) => {
    setOutcomes(outcomes.filter((item) => item.id !== i));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImage(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleAddOutcome = () => {
    setOutcomes([...outcomes, { id: outcomes[outcomes.length - 1].id + 1 }]);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema(),
    onSubmit: (values) => {
      notifySuccess("Create New Course Successfully!");
      console.log(values);
    },
  });
  const handleAddWhatTraineeWillLearn = () => {
    setWhatTraineeWillLearn([
      ...whatTraineeWillLearn,
      { id: whatTraineeWillLearn[whatTraineeWillLearn.length - 1].id + 1 },
    ]);
  };

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">Course / New Course</div>
        <div className="main-content-title">Course Management</div>
      </div>
      <div className="main-content-new-course">
        <form className="form-new-course" onSubmit={formik.handleSubmit}>
          <div className="course-general-info-container">
            <div className="form-title-new-course-general-infor">
              {" "}
              About Course
            </div>
            <div className="title-description-form-course-general-info">
              {" "}
              General Infomation about course
            </div>
            <div className="new-course-info-input">
              <label className="form-title-info-input" htmlFor="name">
                Course name <span className="require-star">*</span>
              </label>
              <input
                className="form-input-new-course-info-field"
                type="text"
                name="name"
                placeholder="Enter course name"
                defaultValue={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="validate-form-error-message">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div className="new-course-info-input">
              <label className="form-title-info-input" htmlFor="description">
                Course description <span className="require-star">*</span>
              </label>
              <input
                className="form-input-new-course-info-field"
                type="text"
                name="description"
                placeholder="Enter course description"
                defaultValue={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.errors.description && formik.touched.description && (
                <p className="validate-form-error-message">
                  {formik.errors.description}
                </p>
              )}
            </div>
            <div className="new-course-info-input">
              <label
                className="form-title-info-input"
                htmlFor="what-trainee-learn"
              >
                What trainee will learn <span className="require-star">*</span>
              </label>
              {whatTraineeWillLearn.map((item) => (
                <div
                  key={item.id}
                  className="form-new-course-dynamic-input-field"
                >
                  <input
                    className="form-input-new-course-info-field"
                    type="text"
                    name="what-trainee-learn"
                    placeholder="Enter what trainee will learn"
                  />
                  {item.id == 0 && (
                    <button
                      className="form-course-dynamic-input-field-add-btn"
                      onClick={handleAddWhatTraineeWillLearn}
                    >
                      <PlusIcon />
                    </button>
                  )}
                  {item.id > 0 && (
                    <button
                      className="form-course-dynamic-input-field-remove-btn"
                      onClick={() => handleRemoveWhatTraineeWillLearn(item.id)}
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="new-course-info-input">
              <label className="form-title-info-input" htmlFor="outcome">
                Outcomes <span className="require-star">*</span>
              </label>
              {outcomes.map((item) => (
                <div
                  key={item.id}
                  className="form-new-course-dynamic-input-field"
                >
                  <input
                    className="form-input-new-course-info-field"
                    type="text"
                    name="outcome"
                    placeholder="Enter outcome"
                  />
                  {item.id == 0 && (
                    <button
                      className="form-course-dynamic-input-field-add-btn"
                      onClick={handleAddOutcome}
                    >
                      <PlusIcon />
                    </button>
                  )}
                  {item.id > 0 && (
                    <button
                      className="form-course-dynamic-input-field-remove-btn"
                      onClick={() => handleRemoveOutcome(item.id)}
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="new-course-info-input">
              <label className="form-title-info-input" htmlFor="prerequisite">
                Prerequisites <span className="require-star">*</span>
              </label>
              {prerequisites.map((item) => (
                <div
                  key={item.id}
                  className="form-new-course-dynamic-input-field"
                >
                  <input
                    className="form-input-new-course-info-field"
                    type="text"
                    name="prerequisite"
                    placeholder="Enter prerequisite"
                  />
                  {item.id == 0 && (
                    <button
                      className="form-course-dynamic-input-field-add-btn"
                      onClick={handleAddPrerequisite}
                    >
                      <PlusIcon />
                    </button>
                  )}
                  {item.id > 0 && (
                    <button
                      className="form-course-dynamic-input-field-remove-btn"
                      onClick={() => handleRemovePrerequisite(item.id)}
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="new-course-info-input">
              <label
                className="form-title-info-input"
                htmlFor="time-allocation"
              >
                Time allocation <span className="require-star">*</span>
              </label>
              <input
                className="form-input-new-course-info-field"
                type="text"
                name="time-allocation"
                placeholder="Enter time allocation"
              />
            </div>
            <div className="new-course-info-input">
              <label className="form-title-info-input" htmlFor="image">
                Select picture
              </label>
              <div className="image-course-container">
                <img className="image-course-input-form" src={image} alt="" />
                <button
                  className="button-upload-img-course-form"
                  onClick={() => document.getElementById("file-input").click()}
                >
                  Upload Image
                </button>
              </div>
              <input
                className="input-image-course-form"
                type="file"
                id="file-input"
                accept="image/*"
                onChange={(event) => handleImageChange(event)}
              />
            </div>
          </div>
          <div className="course-general-info-container">
            <div className="form-title-new-course-general-infor">
              {" "}
              Course Modules
            </div>
            <div className="title-description-form-course-general-info">
              {" "}
              Create Modules and Lessons
            </div>
            {modules.map((item, index) => (
              <NewModule
                key={item.moduleId}
                index={index}
                moduleId={item.moduleId}
                categories={item.categories}
                handleRemoveModules={handleRemoveModules}
                handleAddModules={handleAddModules}
              />
            ))}
          </div>
          <div className="course-save-btn">
            <button className="button-upload-img-course-form" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default CreateNewCourse;
