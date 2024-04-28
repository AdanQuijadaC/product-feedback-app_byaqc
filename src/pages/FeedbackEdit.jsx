import { Link, Navigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/UseGlobalContextProvider";
import { useEffect, useState } from "react";

function FeedbackEdit() {
  const { data, setData } = useGlobalContext();
  const { id } = useParams();
  const indexIdComment = data.productRequests.findIndex((item) => {
    return item.id === parseInt(id); // replace default
  });

  if (indexIdComment === -1) {
    return <Navigate to={"/"}></Navigate>;
  }

  const [originalFeedback, setOriginalFeedback] = useState([]);

  const [editFeedbackForm, setEditFeedbackForm] = useState(() => {
    return data.productRequests.filter((item, index) => {
      return index === indexIdComment;
    })[0];
  });
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
  const [openStatusMenu, setOpenStatusMenu] = useState(false);

  const arrayCategoryList = ["Feature", "UI", "UX", "Enhancement", "Bug"];
  const [categoryItemSelect, setCategoryItemSelect] = useState(() => {
    return arrayCategoryList.findIndex((item) => {
      return item.toLowerCase() === editFeedbackForm.category.toLowerCase();
    });
  });

  const arrayStatusList = ["Planned", "Suggestion", "In-Progress", "Live"];
  const [updateItemSelect, setUpdateItemSelect] = useState(() => {
    return arrayStatusList.findIndex((item) => {
      return item.toLowerCase() === editFeedbackForm.status.toLowerCase();
    });
  });

  const [showErrorCode, setShowErrorCode] = useState({
    title: false,
    description: false,
  });
  const handleEditFeedbackInputs = (e) => {
    const { name, value } = e.target;

    setEditFeedbackForm({ ...editFeedbackForm, [name]: value });
  };

  const handleSubmitEditFeedback = (e) => {
    e.preventDefault();

    if (editFeedbackForm.title.trim() == "") {
      showErrorCode.title = true;
    }

    if (editFeedbackForm.description.trim() == "") {
      showErrorCode.description = true;
    }
    setShowErrorCode({ ...showErrorCode });

    if (!showErrorCode.title && !showErrorCode.description) {
      const copy = {
        ...editFeedbackForm,
        title: editFeedbackForm.title.trim(),
        description: editFeedbackForm.description.trim(),
      };

      data.productRequests[indexIdComment] = copy;

      setData({ ...data });
    }
  };

  const handleBackOriginalFeedback = () => {
    if (originalFeedback[0] !== undefined) {
      data.productRequests[indexIdComment] = originalFeedback[0];
      setEditFeedbackForm(() => {
        return { ...originalFeedback[0] };
      });

      setUpdateItemSelect(() => {
        return arrayStatusList.findIndex((item) => {
          return item.toLowerCase() === originalFeedback[0].status.toLowerCase();
        });
      });
      setCategoryItemSelect(() => {
        return arrayCategoryList.findIndex((item) => {
          return item.toLowerCase() === originalFeedback[0].category.toLowerCase();
        });
      });

      setData({ ...data });
    }
  };

  const handleDeleteEditFeedback = () => {
    const newArrayProducts = data.productRequests.filter((item) => {
      return item.id != editFeedbackForm.id;
    });

    data.productRequests = newArrayProducts;
    setData({ ...data });
  };

  useEffect(() => {
    setOriginalFeedback(() => {
      return data.productRequests.filter((item) => {
        return item.id === parseInt(id);
      });
    });
  }, []);

  useEffect(() => {
    // resets
    if (editFeedbackForm.title.toString().length > 0) {
      showErrorCode.title = false;
    }
    if (editFeedbackForm.description.toString().length > 0) {
      showErrorCode.description = false;
    }
    setShowErrorCode({ ...showErrorCode });
  }, [data]);

  return (
    <>
      <div
        onClick={() => {
          if (openCategoryMenu) {
            setOpenCategoryMenu(false);
          }

          if (openStatusMenu) {
            setOpenStatusMenu(false);
          }
        }}
        className="min-h-screen bg-custom_light_gray"
      >
        {/* top */}
        <header className="sm:max-w-[730px] sm:mx-auto sm:pt-16">
          <div className="flex items-center justify-between container mx-auto p-6">
            {/* go back link */}
            <Link
              onClick={() => {
                window.history.back();
              }}
              className="flex items-center gap-2 hover:underline"
            >
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
        <main className="container mx-auto mt-6 sm:max-w-[730px]">
          <div className="flex flex-col gap-6 px-6 pb-6 ">
            <form
              onSubmit={(e) => handleSubmitEditFeedback(e)}
              className="flex flex-col p-6 relative rounded-[10px] bg-custom_very_light_gray"
            >
              {/* title */}
              <h3 className="text-custom_dark_blue mt-4 text-[18px] font-bold">
                Editing {`'${data.productRequests[indexIdComment].title}'`}
              </h3>
              {/* feedback title */}
              <div className="felx flex-col mt-4 relative">
                <h4 className="text-custom_dark_blue text-[13px] font-bold">Feedback Title</h4>
                <p className="text-custom_very_dark_gray text-[13px] font-normal ">
                  Add a short, descriptive headline
                </p>
                <input
                  className={`bg-custom_light_gray text-[13px] rounded-[5px] mt-3 py-2 px-4 w-full text-custom_dark_blue outline-none placeholder:text-custom_dark_blue placeholder:text-[13px] cursor-pointer border border-transparent hover:border-custom_blue focus:border-custom_blue ${
                    showErrorCode.title
                      ? "border-[#d73737] focus:border-[#d73737] hover:border-[#d73737]"
                      : ""
                  }`}
                  placeholder="Enter your title"
                  type="text"
                  name="title"
                  value={editFeedbackForm.title}
                  onChange={(e) => handleEditFeedbackInputs(e)}
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
                            setEditFeedbackForm({ ...editFeedbackForm, category: item });
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
              {/* update status */}
              <div className="flex flex-col mt-4 relative">
                <h4 className="text-custom_dark_blue text-[13px] font-bold">Update Status</h4>
                <p className="text-custom_very_dark_gray text-[13px] font-normal ">
                  Change feature state
                </p>

                {/* update options */}
                <div
                  onClick={() => {
                    setOpenStatusMenu(!openStatusMenu);
                  }}
                  className={`py-2 px-4 mt-3 rounded-[5px]  bg-custom_light_gray cursor-pointer border  hover:border-custom_blue ${
                    openStatusMenu ? "border-custom_blue border" : "border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-custom_dark_blue text-[13px] font-normal]">
                      {arrayStatusList[updateItemSelect]}
                    </span>
                    <figure>
                      {openStatusMenu ? (
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
                {openStatusMenu && (
                  <div className="w-full mt-2 absolute top-full left-0 rounded-[5px] bg-white z-10 sm:top-[calc(100%+18px)]">
                    <ul className="flex flex-col font-normal text-custom_very_dark_gray">
                      {arrayStatusList.map((item, index) => (
                        <li
                          onClick={() => {
                            setUpdateItemSelect(index);
                            setEditFeedbackForm({ ...editFeedbackForm, status: item });
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
                                stroke={`${updateItemSelect == index ? "#AD1FEA" : ""} `}
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
                  className={`bg-custom_light_gray text-[13px] mt-3 p-4 rounded-[5px] text-custom_dark_blue outline-none placeholder:text-custom_dark_blue cursor-pointer border border-transparent hover:border-custom_blue focus:border-custom_blue ${
                    showErrorCode.description
                      ? "border-[#d73737] focus:border-[#d73737] hover:border-[#d73737]"
                      : ""
                  }`}
                  cols="30"
                  rows="4"
                  placeholder="Enter your description"
                  maxLength={"225"}
                  name="description"
                  value={editFeedbackForm.description}
                  onChange={(e) => handleEditFeedbackInputs(e)}
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
                    <span className="text-white font-bold text-[13px]">Save Changes</span>
                  </button>
                </div>
                {/* calcel feedback */}
                <div className="flex justify-center sm:w-max sm:order-1">
                  <button
                    onClick={handleBackOriginalFeedback}
                    className="bg-custom_very_dark_blue flex items-center px-4 py-4 rounded-[10px] w-full justify-center gap-1 hover:bg-[#656EA3]"
                    type="button"
                  >
                    <span className="text-white font-bold text-[13px]">Cancel</span>
                  </button>
                </div>
                {/* delete feedback */}
                <div className="flex justify-center sm:w-max sm:mr-auto">
                  <button
                    onClick={handleDeleteEditFeedback}
                    className="bg-[#D73737] flex items-center px-4 py-4 rounded-[10px] w-full justify-center gap-1 hover:bg-[#E98888]"
                    type="button"
                  >
                    <span className="text-white font-bold text-[13px]">Delete</span>
                  </button>
                </div>
              </div>
              {/* pencil */}
              <figure className="absolute top-0 left-6 translate-y-[-50%]">
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
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
                    <circle fill="url(#a)" cx="20" cy="20" r="20" />
                    <path
                      d="M19.512 15.367l4.975 4.53-3.8 5.54L11.226 29l4.485-4.1c.759.275 1.831.026 2.411-.594a1.958 1.958 0 00-.129-2.82c-.836-.745-2.199-.745-2.964.068-.57.607-.767 1.676-.44 2.381L11 28.713c.255-1.06.683-2.75 1.115-4.436l.137-.531c.658-2.563 1.287-4.964 1.287-4.964l5.973-3.415zM23.257 12L28 16.443l-2.584 2.606-4.89-4.583L23.257 12z"
                      fill="#FFF"
                      fillRule="nonzero"
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
export default FeedbackEdit;
