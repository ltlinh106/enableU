import "../../assets/styles/index.css";
import { useEffect, useState, useRef } from "react";
import UpIcon from "../../components/icons/Up.jsx";
import DownIcon from "../../components/icons/Down.jsx";
const steps = [
  {
    title: "Open Your Web Browser",
    desc: "Open any web browser on your computer or mobile device (example: Chrome, Firefox, Safari).",
    img: "/src/assets/images/steps_img/step1.png",
  },
  {
    title: "Go to YouTube",
    desc: "Type www.youtube.com into the address bar and press Enter. This will take you to the YouTube homepage.",
    img: "/src/assets/images/steps_img/step2.png",
  },
  {
    title: "Search for a Video",
    desc: "In the search bar at the top of the page, type keywords related to the video you want to watch (example: làm sao để bán được một tỉ gói mè). Then, Press Enter or click the magnifying glass icon to start the search.",
    img: "/src/assets/images/steps_img/step3.png",
  },
  {
    title: "Browse Search Results",
    desc: "Scroll through the list of search results to find the video you're interested in. You can see the video title, thumbnail, and duration.",
    img: "/src/assets/images/steps_img/step4.png",
  },
  {
    title: "Select a Video",
    desc: "Click on the video thumbnail or title to open it. This will take you to the video player page.",
    img: "/src/assets/images/steps_img/step5.png",
  },
  {
    title: "Play the Video",
    desc: "Click the play button (a triangle icon) in the center of the video player to start watching the video.",
    img: "/src/assets/images/steps_img/step6.png",
  },
];
function LessonDetailSTS() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isScreenReader, setIsScreenReader] = useState(true);
  const stepFocus = useRef(null);

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(
      "Welcome to Lesson 1: How to watch a video on Youtube. This lesson is a part of Category 1, Module 1, Course 1. Press Alt and H to go back to the Home page, and press Alt and B to go back to the previous page. Press Alt and S to disable the Screen Reader. Press Alt and C to continue the Screen Reader. Press Alt and A to listen again. Press Alt and P to go back to the previous step. Press Alt and N to move to the next step. Now let's start. This lesson is about how to watch a video on Youtube. Press Alt and N to start the first step."
    );
    window.speechSynthesis.speak(utterance);
  }, []);
  useEffect(() => {
    stepFocus.current.focus();
    if (currentStep !== -1) {
      const speech =
        "Step number" +
        (currentStep + 1) +
        ". " +
        steps[currentStep].title.toString() +
        ". " +
        steps[currentStep].desc.toString();
      const utterance = new SpeechSynthesisUtterance(speech);
      window.speechSynthesis.speak(utterance);
    }
  }, [currentStep]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "n" && isScreenReader) {
        window.speechSynthesis.cancel();
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          const utterance = new SpeechSynthesisUtterance(
            "That is the end of the lesson."
          );
          window.speechSynthesis.speak(utterance);
        }
      }
      if (event.altKey && event.key === "p" && isScreenReader) {
        window.speechSynthesis.cancel();
        if (currentStep <= steps.length - 1 && currentStep > 0) {
          setCurrentStep(currentStep - 1);
        }
      }
      if (event.altKey && event.key === "a" && isScreenReader) {
        window.speechSynthesis.cancel();
        const speech =
          "Step number" +
          (currentStep + 1) +
          ". " +
          steps[currentStep].title.toString() +
          ". " +
          steps[currentStep].desc.toString();
        const utterance = new SpeechSynthesisUtterance(speech);
        window.speechSynthesis.speak(utterance);
      }

      if (event.altKey && event.key === "s" && isScreenReader) {
        window.speechSynthesis.cancel();
        const speech = "Stop the screen reader. Press Alt and C to continue.";
        setIsScreenReader(false);
        const utterance = new SpeechSynthesisUtterance(speech);
        window.speechSynthesis.speak(utterance);
      }
      if (event.altKey && event.key === "c" && !isScreenReader) {
        window.speechSynthesis.cancel();
        setIsScreenReader(true);
        const speech =
          "Step number" +
          (currentStep + 1) +
          ". " +
          steps[currentStep].title.toString() +
          ". " +
          steps[currentStep].desc.toString();
        const utterance = new SpeechSynthesisUtterance(speech);
        window.speechSynthesis.speak(utterance);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep, isScreenReader]);
  const handleOnClickUp = () => {
    window.speechSynthesis.cancel();
    setCurrentStep(-1);
  };
  const handleOnClickDown = (index) => {
    window.speechSynthesis.cancel();
    setCurrentStep(index);
  };

  return (
    <>
      <div ref={currentStep === -1 ? stepFocus : null} className="page-header">
        <div className="breadcrumb">
          Course / All Course / Modules / Lessons / Detail
        </div>
        <div className="main-content-title">Course Management</div>
      </div>
      <div className="main-content-lessson-detail">
        <h5 className="main-content-lessson-detail-title-course-name">
          Course Name 1
        </h5>
        <h6 className="main-content-lessson-detail-title-module-name">
          Module Name 1
        </h6>
        <h2 className="main-content-lessson-detail-title-lesson-name">
          Part 1: How to watch a video on Youtube
        </h2>
        <div className="main-content-lessson-detail-title-category-name">
          Category Name 1
        </div>
      </div>
      <div className="lesson-detail-desc">
        Description: This lesson will guide us on how to watch a video on
        YouTube, aiming to help us entertain ourselves or to search for and
        learn new content on YouTube. <br /> <br />
        Press Alt+H to go back to the Home page
        <br />
        Press Alt+B to go back to the previous page. <br />
        Press Alt+S to stop the Screen Reader
        <br />
        Press Alt+C to continue the Screen Reader
        <br />
        Press Alt+N to move to the next step.
        <br />
        Press Alt+A to listen again.
        <br />
        Press Alt+P to go back to the previous step.
        <br />
      </div>
      <div className="lesson-detail-steps-container">
        {steps.map((item, index) => (
          <div
            key={index + 1}
            tabIndex={-1}
            ref={currentStep === index ? stepFocus : null}
            className="step-detail-container"
          >
            <div className="step-detail-title">
              <div className="step-detail-title-step-number"> {index + 1}</div>
              <img
                className="step-detail-title-step-img"
                src={item.img}
                alt=""
              />
              <div className="step-detail-title-step-name">{item.title}</div>
              {index === currentStep && (
                <button
                  className="step-detail-title-step-chevron-btn"
                  onClick={handleOnClickUp}
                >
                  <UpIcon />
                </button>
              )}
              {index !== currentStep && (
                <button
                  className="step-detail-title-step-chevron-btn"
                  onClick={() => handleOnClickDown(index)}
                >
                  <DownIcon />
                </button>
              )}
            </div>

            {index === currentStep && (
              <div className="step-detail-focus-container">
                <div className="step-detail-focus-step-desc">{item.desc}</div>
                <img
                  className="step-detail-focus-step-img"
                  src={item.img}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default LessonDetailSTS;
