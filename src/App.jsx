import "./App.css";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./pages/layout.jsx";
import Home from "./pages/home.jsx";
import CreateNewCourse from "./pages/createNewCourse/createNewCourse.jsx";
import LessonDetailSTS from "./pages/lessonDetail/lessonStepToStepGuide.jsx";
import LessonVideo from "./pages/lessonDetail/lessonVideo.jsx";
import LessonVideo2 from "./pages/lessonDetail/lessonVideo2.jsx";

function App() {
  const navigate = useNavigate();
  window.speechSynthesis.cancel();

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "h") {
        navigate("/");
      }
      if (event.altKey && event.key === "b") {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />}></Route>
        <Route path="courses/new" element={<CreateNewCourse />}></Route>
        <Route
          path="courses/module/lesson/1"
          element={<LessonDetailSTS />}
        ></Route>
        <Route path="courses/module/lesson/3" element={<LessonVideo />}></Route>

        <Route
          path="courses/module/lesson/4"
          element={<LessonVideo2 />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
