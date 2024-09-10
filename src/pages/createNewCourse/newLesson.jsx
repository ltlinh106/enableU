import "../../assets/styles/index.css";
import PlusIcon from "../../components/icons/PlusIcon.jsx";
import TrashIcon from "../../components/icons/TrashIcon.jsx";

function NewLesson() {
  return (
    <>
      <div className="form-new-course-dynamic-input-field-lesson">
        <input
          className="form-input-new-course-info-field"
          type="text"
          name="name"
          placeholder="Enter lesson name"
        ></input>
        <select
          className="new-course-form-select-lesson-type"
          name="type"
          defaultValue="default"
        >
          <option value="default" disabled>
            Type
          </option>
          <option value="Reading">Reading</option>
          <option value="Video">Video</option>
          <option value="Step-to-step guide">Step-to-step guide</option>
        </select>
        <button
          className="form-course-dynamic-input-field-remove-btn"
          // onClick={handleRemoveLesson}
        >
          <TrashIcon />
        </button>
        <button
          className="form-course-dynamic-input-field-add-btn"
          // onClick={handleAddLesson}
        >
          <PlusIcon />
        </button>
      </div>
    </>
  );
}

export default NewLesson;
