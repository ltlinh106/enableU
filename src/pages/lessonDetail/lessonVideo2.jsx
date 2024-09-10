import "../../assets/styles/index.css";
import { useEffect, useState, useRef } from "react";
import UpIcon from "../../components/icons/Up.jsx";
import DownIcon from "../../components/icons/Down.jsx";
const parseVTT = (vttText) => {
  const captions = [];
  const lines = vttText.split("\n");
  let currentCaption = null;

  lines.forEach((line) => {
    if (!line.trim()) return;

    const timestampRegex = /(\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}\.\d{3})/;
    const match = line.match(timestampRegex);

    if (match) {
      if (currentCaption) {
        captions.push(currentCaption);
      }

      currentCaption = {
        startTime: parseTime(match[1]),
        endTime: parseTime(match[2]),
        text: "",
      };
    } else if (currentCaption) {
      currentCaption.text += `${line} `;
    }
  });

  if (currentCaption) {
    captions.push(currentCaption);
  }

  return captions;
};

// Convert time format from hh:mm:ss.xxx to seconds
const parseTime = (timeString) => {
  const [minutes, seconds] = timeString.split(":");
  return parseFloat(minutes) * 60 + parseFloat(seconds);
};
const steps = [
  {
    title: "Grind Your Coffee Beans",
    desc: "Freshly ground coffee ensures maximum flavor and aroma in your espresso. The grind size also plays a critical role in extraction, influencing the taste. \nUse a coffee grinder to grind your espresso beans to a fine consistency, resembling table salt. This fine grind allows for optimal extraction in an espresso machine. \nMeasure out about 18-20 grams of coffee for a double shot or 9-10 grams for a single shot.",
    vid: "/src/assets/video/step1.mp4",
    img: "/src/assets/images/americano/step1.png",
    vtt: "/src/assets/transcript/step1.vtt",
  },
  {
    title: "Tamp Your Coffee",
    desc: "Tamping compresses the coffee grounds into a compact puck, which ensures even water distribution and extraction during brewing. A properly tamped puck resists water pressure, which controls the flow and results in balanced espresso. \nAfter grinding, place the coffee grounds into the portafilter.\nUse a tamper to apply firm, even pressure on the coffee grounds. \nTamp until the surface is level and smooth. Aim for about 30 pounds (13-14 kg) of pressure for a consistent tamp. \nWipe away any loose grounds from the rim of the portafilter to ensure a clean seal when inserting it into the machine.",
    vid: "/src/assets/video/step2.mp4",
    img: "/src/assets/images/americano/step2.png",
    vtt: "/src/assets/transcript/step2.vtt",
  },
  {
    title: "Brew the Espresso",
    desc: "Proper brewing extracts the essential oils and flavors from the coffee, creating the espresso’s rich taste. Insert the portafilter into the espresso machine and lock it in place. \nStart the brewing process. A typical espresso shot should take about 25-30 seconds to extract.\nWatch the flow – it should start dark and thicken into a steady stream of golden crema. A double shot should yield around 2 ounces (60 ml) of espresso.",
    vid: "/src/assets/video/step3.mp4",
    img: "/src/assets/images/americano/step3.png",
    vtt: "/src/assets/transcript/step3.vtt",
  },
  {
    title: "Heat the Water",
    desc: "Water temperature plays a crucial role in diluting the espresso without compromising its flavor. Too hot or too cold water can affect the overall balance.\nHeat water to around 190-200°F (88-93°C), just below boiling.\nYou’ll need about 4-6 ounces (120-180 ml) of hot water, depending on how strong you want your Americano. The standard ratio is typically 2:1 or 3:1 (water to espresso).",
    vid: "/src/assets/video/step4.mp4",
    img: "/src/assets/images/americano/step4.png",
    vtt: "/src/assets/transcript/step4.vtt",
  },
  {
    title: "Combine Espresso and Water",
    desc: "Combining the espresso and hot water in the right way ensures the best flavor and preserves the crema, which enhances the aroma and texture.\nPour the hot water into your cup first. This helps maintain the crema when the espresso is added.\nSlowly pour the freshly brewed espresso over the water. You’ll notice the crema float to the top, preserving its richness and aroma.\nStir gently, if desired, to mix the espresso and water evenly.",
    vid: "/src/assets/video/step5.mp4",
    img: "/src/assets/images/americano/step5.png",
    vtt: "/src/assets/transcript/step5.vtt",
  },
];
function LessonVideo2() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isScreenReader, setIsScreenReader] = useState(true);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const stepFocus = useRef(null);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [captions, setCaptions] = useState([]);

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(
      "Welcome to Lesson 4. How to make an Americano. This lesson is a part of Category 1, Module 1, Course 1. Press Alt and H to go back to the Home page. Press Alt and B to go back to the previous page. Press Alt and S to stop the Screen Reader. Press Alt and C to continue the Screen Reader. Press Alt and A to listen again. Press Alt and P to go back to the previous step. Press Alt and N to move to the next step. Press Alt and V to play or pause the video. Press Alt and J to play the video again. Now let's start. This lesson will guide us on how to make an Americano. An Americano is a popular espresso-based coffee drink that is simple and delicious. It involves diluting espresso with hot water, giving it a smooth texture and rich flavor similar to black coffee but with espresso intensity. Press Alt and N to start the first step."
    );
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [currentTime, isPlayingVideo]);
  useEffect(() => {
    if (currentStep !== -1) {
      fetch(steps[currentStep].vtt.toString())
        .then((response) => response.text())
        .then((vttText) => {
          const parsedCaptions = parseVTT(vttText);
          setCaptions(parsedCaptions);
        });

      stepFocus.current.focus();
      setIsPlayingVideo(false);
      setCurrentTime(0);
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
        event.preventDefault();
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
        if (currentStep <= steps.length - 1 && currentStep > 0) {
          window.speechSynthesis.cancel();
          setCurrentStep(currentStep - 1);
        }
      }
      if (
        event.altKey &&
        event.key === "a" &&
        isScreenReader &&
        currentStep !== -1
      ) {
        window.speechSynthesis.cancel();
        setIsPlayingVideo(false);
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
      if (
        event.altKey &&
        event.key === "v" &&
        isPlayingVideo &&
        currentStep !== -1
      ) {
        event.preventDefault();
        window.speechSynthesis.cancel();
        videoRef.current.pause();
        setIsPlayingVideo(false);
      }

      if (
        event.altKey &&
        event.key === "v" &&
        !isPlayingVideo &&
        currentStep !== -1
      ) {
        event.preventDefault();
        window.speechSynthesis.cancel();
        videoRef.current.play();
        videoRef.current.focus();
        setIsPlayingVideo(true);
      }
      if (event.altKey && event.key === "j" && currentStep !== -1) {
        window.speechSynthesis.cancel();
        videoRef.current.currentTime = 0;
        videoRef.current.focus();
        videoRef.current.play();
        setIsPlayingVideo(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep, isScreenReader, isPlayingVideo]);
  const handleOnClickUp = () => {
    window.speechSynthesis.cancel();
    setCurrentStep(-1);
    setIsPlayingVideo(false);
  };
  const handleOnClickDown = (index) => {
    window.speechSynthesis.cancel();
    setCurrentStep(index);
    setIsPlayingVideo(false);
  };
  const handlePlay = () => {
    window.speechSynthesis.cancel();
    setIsPlayingVideo(true);
  };
  const handlePause = () => {
    window.speechSynthesis.cancel();
    setIsPlayingVideo(false);
  };

  return (
    <>
      <div ref={currentStep === -1 ? stepFocus : null} className="page-header">
        <div className="breadcrumb">
          Course / All Course / Modules / Lessons / Detail
        </div>
        <div className="main-content-title">Course Management</div>
      </div>
      <div
        ref={currentStep === -1 ? videoRef : null}
        className="main-content-lessson-detail"
      >
        <h5 className="main-content-lessson-detail-title-course-name">
          Course Name 1
        </h5>
        <h6 className="main-content-lessson-detail-title-module-name">
          Module Name 1
        </h6>
        <h2 className="main-content-lessson-detail-title-lesson-name">
          Part 1: How to make an Americano
        </h2>
        <div className="main-content-lessson-detail-title-category-name">
          Category Name 1
        </div>
      </div>
      <div className="lesson-detail-desc">
        Description: This lesson will guide us on how to make an Americano. An
        Americano is a popular espresso-based coffee drink that is simple and
        delicious. It involves diluting espresso with hot water, giving it a
        smooth texture and rich flavor similar to black coffee but with espresso
        intensity. <br />
        <br />
        Press Alt + H to return to the Home page
        <br />
        Press Alt + B to return to the previous page. <br />
        Press Alt + S to stop the Screen Reader
        <br />
        Press Alt + C to continue the Screen Reader
        <br />
        Press Alt + N to move to the next step.
        <br />
        Press Alt + A to listen again.
        <br />
        Press Alt + P to go back to the previous step.
        <br />
        Press Alt + V to play or pause the video.
        <br />
        Press Alt + J to play the video again.
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
                <div className="lesson-detail-content-video">
                  <video
                    className="lesson-detail-content-video-playing"
                    ref={videoRef}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    controls
                  >
                    <source src={item.vid} type="video/mp4" />
                    <track
                      kind="subtitles"
                      src={item.vtt}
                      srcLang="en"
                      label="English"
                      default
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="lesson-detail-content-video-transcript-container">
                  <div className="lesson-step-detail-content-video-transcript-title">
                    Transcript:
                  </div>
                  <div className="lesson-step-detail-content-video-transcript-content">
                    {captions.map((caption) => (
                      <p
                        className={
                          currentTime >= caption.startTime &&
                          currentTime <= caption.endTime &&
                          currentTime > 0
                            ? "lesson-detail-content-video-transcript-content-item-highlighted"
                            : "lesson-detail-content-video-transcript-content-item"
                        }
                        key={caption.startTime}
                      >
                        {" "}
                        {caption.text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default LessonVideo2;
