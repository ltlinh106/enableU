import "../../assets/styles/index.css";
import NewLesson from "./newLesson.jsx";
import PlusIcon from "../../components/icons/PlusIcon.jsx";
import TrashIcon from "../../components/icons/TrashIcon.jsx";

function NewCategory() {
  const lessonsList = [{ lessonId: 0 }];
  return (
    <>
      <div className="new-course-info-input">
        <label className="form-title-info-input" htmlFor="name">
          Category name <span className="require-star">*</span>
        </label>
        <div className="form-new-course-dynamic-input-field">
          <input
            className="form-input-new-course-info-field"
            type="text"
            name="name"
            placeholder="Enter category name"
          />

          <button
            className="form-course-dynamic-input-field-remove-btn"
            //onClick={handleRemoveCategory}
          >
            <TrashIcon />
          </button>
          <button
            className="form-course-dynamic-input-field-add-btn"
            //onClick={handleAddCategory}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <div className="new-course-info-input">
        <label className="form-title-info-input" htmlFor="name">
          Category description <span className="require-star">*</span>
        </label>
        <input
          className="form-input-new-course-info-field-cate-desc"
          type="text"
          name="name"
          placeholder="Enter category description"
        />
      </div>
      <div className="form-new-course-category-lesson-container">
        <div className="form-title-info-input">Lessons:</div>
        {lessonsList?.map((item) => (
          <NewLesson
            key={item.lessonId}
            // handleAddLesson={handleAddLesson}
            // handleRemoveLesson={() =>
            //   handleRemoveLesson(categoryId, item.lessonId)
            // }
          />
        ))}
      </div>
    </>
  );
}

export default NewCategory;
