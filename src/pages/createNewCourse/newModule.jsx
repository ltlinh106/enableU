import "../../assets/styles/index.css";
import NewCategory from "./newCategory.jsx";
import GreenPlusIcon from "../../components/icons/GreenPlus.jsx";
import RedTrashIcon from "../../components/icons/RedTrash.jsx";
import PropTypes from "prop-types";
function NewModule({
  moduleId,
  index,
  handleAddModules,
  handleRemoveModules,
  categories,
}) {
  const lessons = [{ lessonId: 0 }];
  return (
    <>
      <div className="form-course-new-module-container">
        <button
          className="form-course-new-module-btn-add-module"
          onClick={handleAddModules}
        >
          <GreenPlusIcon />
        </button>
        {moduleId !== 0 && (
          <button
            className="form-course-new-module-btn-remove-module"
            onClick={() => handleRemoveModules(moduleId)}
          >
            <RedTrashIcon />
          </button>
        )}

        <div className="form-course-new-module-title">
          {" "}
          Modules {index + 1}:
        </div>

        <div className="new-course-info-input">
          <label className="form-title-info-input" htmlFor="name">
            Module name <span className="require-star">*</span>
          </label>
          <input
            className="form-input-new-course-info-field"
            type="text"
            name="name"
            placeholder="Enter module name"
          />
        </div>
        <div className="new-course-info-input">
          <label className="form-title-info-input" htmlFor="description">
            Module description <span className="require-star">*</span>
          </label>
          <input
            className="form-input-new-course-info-field"
            type="text"
            name="description"
            placeholder="Enter module description"
          />
        </div>
        <div className="form-new-course-category-container">
          <div className="form-course-category-title"> Categories:</div>
          <div className="form-course-new-category">
            {categories.map((item) => (
              <NewCategory
                key={item.categoryId}
                categoryId={item.categoryId}
                lessons={lessons}
                // handleRemoveCategory={() =>
                //   handleRemoveCategory(moduleId, item.categoryId)
                // }
                // handleAddCategory={() =>
                //   handleAddCategory(moduleId, item.categoryId)
                // }
                // lessons={item.lessons}
                // handleAddLesson={handleAddLesson}
                // handleRemoveLesson={(categoryId, lessonId) =>
                //   handleRemoveLesson(moduleId, categoryId, lessonId)
                // }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
NewModule.propTypes = {
  moduleId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  handleRemoveModules: PropTypes.func,
  handleAddModules: PropTypes.func,
  categories: PropTypes.array,
};

export default NewModule;
