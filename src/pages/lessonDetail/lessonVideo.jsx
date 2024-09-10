import "../../assets/styles/index.css";
import { useEffect, useRef, useState } from "react";
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

function LessonVideo() {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [captions, setCaptions] = useState([]);
  const lessonDetail = {
    title: "How to handwash with soap and water",
    description:
      "Hand hygiene, either with soap and water or with alcohol-based handrub, is one of the best ways to avoid getting sick and spreading infections to others. Indeed, hand hygiene is an easy, inexpensive, and effective mean to prevent the spread of germs and keep everyone  healthy.",
    src: "/src/assets/video/howToWashHand.mp4",
  };
  const speech =
    "Welcome to Lesson 3: " +
    lessonDetail.title +
    ". This lesson is a part of Category 1, Module 1, Course 1. Press Alt and H to return to the Home page, and press Alt and B to return to the previous page. Press Alt and A to play the video again. Press Alt and P to play or pause the video. Now let's start. " +
    lessonDetail.title +
    ". " +
    lessonDetail.description +
    ". Press Alt and P to play or pause the video.";

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(speech);
    window.speechSynthesis.speak(utterance);
  }, [speech]);
  useEffect(() => {
    fetch("/src/assets/transcript/howToWashHand.vtt")
      .then((response) => response.text())
      .then((vttText) => {
        const parsedCaptions = parseVTT(vttText);
        setCaptions(parsedCaptions);
      });
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
  }, [currentTime]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "p" && isPlayingVideo) {
        window.speechSynthesis.cancel();
        videoRef.current.pause();
        setIsPlayingVideo(false);
      }

      if (event.altKey && event.key === "p" && !isPlayingVideo) {
        window.speechSynthesis.cancel();
        videoRef.current.play();
        videoRef.current.focus();
        setIsPlayingVideo(true);
      }
      if (event.altKey && event.key === "a") {
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
  }, [isPlayingVideo]);

  const handlePlay = () => {
    window.speechSynthesis.cancel();
    setIsPlayingVideo(true);
  };

  const handlePause = () => {
    setIsPlayingVideo(false);
  };

  return (
    <>
      <div className="page-header">
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
          Part 3: How to handwash with soap and water
        </h2>
        <div className="main-content-lessson-detail-title-category-name">
          Category Name 1
        </div>
      </div>

      <div className="lesson-detail-content-container">
        <div className="lesson-detail-content-video-title">
          {lessonDetail.title}
        </div>
        <div className="lesson-detail-content-video-description">
          {lessonDetail.description}
          <br />
          <br />
          Press Alt+H to return to the Home page
          <br />
          Press Alt+B to return the previous page. <br />
          Press Alt+A to play the video again.
          <br />
          Press Alt+P to play or pause the video.
          <br />
        </div>
        <div className="lesson-detail-content-video">
          <video
            className="lesson-detail-content-video-playing"
            ref={videoRef}
            onPlay={handlePlay}
            onPause={handlePause}
            controls
          >
            <source src={lessonDetail.src} type="video/mp4" />
            <track
              kind="subtitles"
              src="/src/assets/transcript/howToWashHand.vtt"
              srcLang="en"
              label="English"
              default
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="lesson-detail-content-video-transcript-container">
          <div className="lesson-detail-content-video-transcript-title">
            Transcript:
          </div>
          <div className="lesson-detail-content-video-transcript-content">
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
    </>
  );
}

export default LessonVideo;
