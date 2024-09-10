import "../../assets/styles/index.css";
import { useEffect, useState, useRef } from "react";
import UpIcon from "../../components/icons/Up.jsx";
import DownIcon from "../../components/icons/Down.jsx";
const steps = [
  {
    title: "Remove any jewelery",
    desc: "Remove all jewelry such as rings and bracelets from your hands.",
    img: "/public/images/steps_img/step1c.png",
    audio: "/public/records/step1.mp3",
  },
  {
    title: "Wet Hands",
    desc: "Turn on the tap and wet your hands with clean, running water (warm or cold).",
    img: "/public/images/steps_img/step2c.png",
    audio: "/public/records/step2.mp3",
  },
  {
    title: "Apply Soap",
    desc: "Lather your hands with soap. Use enough soap to cover all surfaces of your hands.",
    img: "/public/images/steps_img/step3c.png",
    audio: "/public/records/step3.mp3",
  },
  {
    title: "Scrub",
    desc: "Rub your hands together for at least 20 seconds. Be sure to scrub all parts of your hands, including the backs, between your fingers, and under your nails.",
    img: "/public/images/steps_img/step4c.png",
    audio: "/public/records/step4.mp3",
  },
  {
    title: "Rinse",
    desc: "Rinse your hands thoroughly under running water to remove all soap and any loosened dirt or germs.",
    img: "/public/images/steps_img/step5c.png",
    audio: "/public/records/step5.mp3",
  },
  {
    title: "Dry",
    desc: "Dry your hands using a clean towel or air dryer. If you’re using a towel, it’s a good idea to use it to turn off the tap to avoid recontaminating your hands.",
    img: "/public/images/steps_img/step6c.png",
    audio: "/public/records/step6.mp3",
  },
  {
    title: "Dispose of Towel",
    desc: "If you used a paper towel, dispose of it properly.",
    img: "/public/images/steps_img/step7c.png",
    audio: "/public/records/step7.mp3",
  },
];
function LessonDetailSTS2() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isScreenReader, setIsScreenReader] = useState(true);
  const audioRef = useRef(null);
  const stepFocus = useRef(null);

  useEffect(() => {
    audioRef.current.play();
  }, []);
  useEffect(() => {
    audioRef.current.play();
    stepFocus.current.focus();
  }, [currentStep]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "n" && isScreenReader) {
        window.speechSynthesis.cancel();
        audioRef.current.pause();
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
          audioRef.current.pause();
          setCurrentStep(currentStep - 1);
        }
      }
      if (event.altKey && event.key === "a" && isScreenReader) {
        window.speechSynthesis.cancel();
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }

      if (event.altKey && event.key === "s" && isScreenReader) {
        window.speechSynthesis.cancel();
        setIsScreenReader(false);
        audioRef.current.pause();
        const speech = "Stop the screen reader. Press Alt and C to continue.";
        setIsScreenReader(false);
        const utterance = new SpeechSynthesisUtterance(speech);
        window.speechSynthesis.speak(utterance);
      }
      if (event.altKey && event.key === "c" && !isScreenReader) {
        window.speechSynthesis.cancel();
        setIsScreenReader(true);
        audioRef.current.play();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep, isScreenReader]);
  const handleOnClickUp = () => {
    audioRef.current.pause();
    setCurrentStep(-1);
  };
  const handleOnClickDown = (index) => {
    audioRef.current.pause();
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
          Part 2: How to wash your hands
        </h2>
        <div className="main-content-lessson-detail-title-category-name">
          Category Name 1
        </div>
      </div>
      <div className="lesson-detail-audio-introduction-container">
        <audio
          controls
          ref={currentStep === -1 ? audioRef : null}
          className="lesson-detail-audio-introduction"
        >
          <source src="/public/records/introduction.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="lesson-detail-desc">
        Description: This lesson will guide us on how to clean your hand. <br />
        <br />
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
            className="step-detail-container"
            tabIndex={-1}
            ref={currentStep === index ? stepFocus : null}
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
                <audio
                  controls
                  className="lesson-detail-audio-introduction"
                  ref={audioRef}
                >
                  <source src={item.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
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

export default LessonDetailSTS2;
