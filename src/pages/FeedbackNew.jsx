import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/UseGlobalContextProvider";
import { useEffect, useState } from "react";

function FeedbackNew() {
  const { data, setData } = useGlobalContext();
  const [idInitial, setIdInitial] = useState(
    data.productRequests.reduce((acc, item) => item.id, 0) + 1
  );
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
  const [categoryItemSelect, setCategoryItemSelect] = useState(0); // 0 default
  const arrayCategoryList = ["Feature", "UI", "UX", "Enhancement", "Bug"];
  const [newFeedbackForm, setNewFeedbackForm] = useState({
    id: idInitial,
    title: "",
    category: arrayCategoryList[categoryItemSelect],
    description: "",
    upvotes: 0,
    status: "suggestion",
  });

  const [showErrorCode, setShowErrorCode] = useState({
    title: false,
    description: false,
  });
  const handleNewFeedbackInputs = (e) => {
    const { name, value } = e.target;

    setNewFeedbackForm({ ...newFeedbackForm, [name]: value });
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();

    if (newFeedbackForm.title.trim() == "") {
      showErrorCode.title = true;
    } else {
      showErrorCode.title = false;
    }

    if (newFeedbackForm.description.trim() == "") {
      showErrorCode.description = true;
    } else {
      showErrorCode.description = false;
    }
    setShowErrorCode({ ...showErrorCode });

    if (!showErrorCode.title && !showErrorCode.description) {
      const copy = {
        ...newFeedbackForm,
        title: newFeedbackForm.title.trim(),
        description: newFeedbackForm.description.trim(),
      };

      const newArray = [...data.productRequests, copy];

      setData({ ...data, productRequests: newArray });

      // resets field
      setCategoryItemSelect(0);
      setIdInitial((idInitial) => idInitial + 1);
      setNewFeedbackForm({
        id: idInitial + 1,
        title: "",
        category: arrayCategoryList[categoryItemSelect],
        description: "",
        upvotes: "",
        status: "",
      });

      window.history.back();
    }
  };

  return (
    <>
      <div
        onClick={() => {
          if (openCategoryMenu) {
            setOpenCategoryMenu(false);
          }
        }}
        className="min-h-screen bg-custom_light_gray"
      >
        {/* top */}
        <header className="sm:max-w-[730px] sm:mx-auto sm:pt-16">
          <div className="flex items-center justify-between container mx-auto p-6">
            {/* go back link */}
            <Link className="flex items-center gap-2 hover:underline" to={"/"}>
              <figure>
                <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 9L2 5l4-4"
                    stroke="#4661E6"
                    strokeWidth="2"
                    fill="none"
                    fillwule="evenodd"
                  />
                </svg>
              </figure>
              <span className="font-bold text-custom_very_dark_gray">Go Back</span>
            </Link>
          </div>
        </header>
        <main className="container mx-auto mt-6 sm:max-w-[730px] sm:mx-auto">
          <div className="flex flex-col gap-6 px-6 pb-6 ">
            <form
              onSubmit={(e) => handleSubmitFeedback(e)}
              className="flex flex-col p-6 relative rounded-[10px] bg-custom_very_light_gray"
            >
              {/* title */}
              <h3 className="text-custom_dark_blue mt-4 text-[18px] font-bold">
                Create New Feedback
              </h3>
              {/* feedback title */}
              <div className="felx flex-col mt-4 relative">
                <h4 className="text-custom_dark_blue text-[13px] font-bold">Feedback Title</h4>
                <p className="text-custom_very_dark_gray text-[13px] font-normal ">
                  Add a short, descriptive headline
                </p>
                <input
                  className={`bg-custom_light_gray text-[13px] rounded-[5px] mt-3 py-2 px-4 w-full text-custom_dark_blue outline-none placeholder:text-custom_dark_blue placeholder:text-[13px] cursor-pointer border  ${
                    showErrorCode.title
                      ? "border-[#d73737] focus:border-[#d73737] hover:border-[#d73737]"
                      : "border-transparent focus:border-custom_blue  hover:border-custom_blue "
                  }`}
                  placeholder="Enter your title"
                  type="text"
                  name="title"
                  value={newFeedbackForm.title}
                  onChange={(e) => handleNewFeedbackInputs(e)}
                />
                {/* show error field */}
                {showErrorCode.title && (
                  <div className="absolute bottom-[-22px] right-0">
                    <p className="text-[14px] text-[#d73737] font-normal">Can't be empty</p>
                  </div>
                )}
              </div>
              {/* category title */}
              <div className="flex flex-col mt-4 relative">
                <h4 className="text-custom_dark_blue text-[13px] font-bold">Category</h4>
                <p className="text-custom_very_dark_gray text-[13px] font-normal ">
                  Choose a category for your feedback
                </p>

                {/* category options */}
                <div
                  onClick={() => {
                    setOpenCategoryMenu(!openCategoryMenu);
                  }}
                  className={`py-2 px-4 mt-3 rounded-[5px]  bg-custom_light_gray cursor-pointer border  hover:border-custom_blue ${
                    openCategoryMenu ? "border-custom_blue border" : "border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-custom_dark_blue text-[13px] font-normal]">
                      {arrayCategoryList[categoryItemSelect]}
                    </span>
                    <figure>
                      {openCategoryMenu ? (
                        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1 6l4-4 4 4"
                            stroke="#4661E6"
                            strokeWidth="2"
                            fill="none"
                            fillRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1 1l4 4 4-4"
                            stroke="#4661E6"
                            strokeWidth="2"
                            fill="none"
                            fillRule="evenodd"
                          />
                        </svg>
                      )}
                    </figure>
                  </div>
                </div>
                {/* show list options */}
                {openCategoryMenu && (
                  <div className="w-full mt-2 absolute top-full left-0 rounded-[5px] bg-white z-10 sm:top-[calc(100%+18px)]">
                    <ul className="flex flex-col font-normal text-custom_very_dark_gray">
                      {arrayCategoryList.map((item, index) => (
                        <li
                          onClick={() => {
                            setCategoryItemSelect(index);
                            setNewFeedbackForm({ ...newFeedbackForm, category: item });
                          }}
                          key={index}
                          className={`py-2 text-[13px] flex px-4 items-center justify-between cursor-pointer border-b-[#979797/50] hover:text-custom_violet  ${
                            index !== 4 ? "border-b " : ""
                          }`}
                        >
                          <span>{item}</span>
                          <figure>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11">
                              <path
                                fill="none"
                                stroke={`${categoryItemSelect == index ? "#AD1FEA" : ""} `}
                                strokeWidth="2"
                                d="M1 5.233L4.522 9 12 1"
                              />
                            </svg>
                          </figure>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* feedback description */}
              <div className="flex flex-col mt-4 relative">
                <h4 className="text-custom_dark_blue text-[13px] font-bold">
                  Feedback description
                </h4>
                <p className="text-custom_very_dark_gray text-[13px] font-normal ">
                  Include any specific comments on what should be improved, added, etc.
                </p>

                {/* category options */}
                <textarea
                  style={{ resize: "none" }}
                  className={`bg-custom_light_gray text-[13px] mt-3 p-4 rounded-[5px] text-custom_dark_blue outline-none placeholder:text-custom_dark_blue cursor-pointer border ${
                    showErrorCode.description
                      ? "border-[#d73737] focus:border-[#d73737] hover:border-[#d73737]"
                      : "border-transparent focus:border-custom_blue  hover:border-custom_blue "
                  }`}
                  cols="30"
                  rows="4"
                  placeholder="Enter your description"
                  maxLength={"250"}
                  name="description"
                  value={newFeedbackForm.description}
                  onChange={(e) => handleNewFeedbackInputs(e)}
                ></textarea>
                {/* show error field */}
                {showErrorCode.description && (
                  <div className="absolute bottom-[-22px] right-0">
                    <p className="text-[14px] text-[#d73737] font-normal">Can't be empty</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4 mt-12 sm:flex-row sm:items-center  sm:justify-end">
                {/* add feedback */}
                <div className="flex justify-center sm:w-max sm:order-2">
                  <button
                    className="bg-custom_violet flex items-center px-4 py-4 rounded-[10px] w-full justify-center gap-1 hover:bg-[#c75af6]"
                    type="submit"
                  >
                    <span className="text-white font-bold text-[13px]">Add Feedback</span>
                  </button>
                </div>
                {/* calcel feedback */}
                <div className="flex justify-center sm:w-max sm:order-1">
                  <button
                    onClick={() => {
                      window.history.back();
                    }}
                    className="bg-custom_very_dark_blue flex items-center px-4 py-4 rounded-[10px] w-full justify-center gap-1 hover:bg-[#656EA3]"
                    type="reset"
                  >
                    <span className="text-white font-bold text-[13px]">Cancel</span>
                  </button>
                </div>
              </div>
              {/* plus */}
              <figure className="absolute top-0 left-6 translate-y-[-50%]">
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56">
                  <defs>
                    <radialGradient
                      cx="103.9%"
                      cy="-10.387%"
                      fx="103.9%"
                      fy="-10.387%"
                      r="166.816%"
                      id="a"
                    >
                      <stop stopColor="#E84D70" offset="0%" />
                      <stop stopColor="#A337F6" offset="53.089%" />
                      <stop stopColor="#28A7ED" offset="100%" />
                    </radialGradient>
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <circle fill="url(#a)" cx="28" cy="28" r="28" />
                    <path
                      fill="#FFF"
                      fillRule="nonzero"
                      d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"
                    />
                  </g>
                </svg>
              </figure>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
export default FeedbackNew;
