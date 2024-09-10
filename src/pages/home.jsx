import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="main-content-new-course">
      <h1>HOME</h1>
      <h6>
        {" "}
        <Link to="/courses/module/lesson/1">
          Lesson 1: How to watch a video on Youtube
        </Link>
      </h6>

      <h6>
        {" "}
        <Link to="/courses/module/lesson/3">
          Lesson 3: How to handwash with soap and water (Video)
        </Link>
      </h6>
      <h6>
        {" "}
        <Link to="/courses/module/lesson/4">
          Lesson 4: How to make an Americano
        </Link>
      </h6>

      <h6>
        {" "}
        <Link to="/courses/new">New course</Link>
      </h6>
    </div>
  );
}

export default Home;
