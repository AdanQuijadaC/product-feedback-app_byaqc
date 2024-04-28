import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/UseGlobalContextProvider";

function FeedbackDetail() {
  const { data, setData } = useGlobalContext();
  const { id } = useParams();

  // check if is available the comment
  const indexIdComment = data.productRequests.findIndex((item) => {
    return item.id === parseInt(id);
  });

  if (indexIdComment === -1) {
    return <Navigate to={"/"}></Navigate>;
  }

  const navigate = useNavigate();
  const [collapseComment, setCollapseComment] = useState(false);
  const [openPostReplyCommentSelect, seOpenPostReplyCommentSelect] = useState([]);
  const [openPostReplyCommentReplySelect, seOpenPostReplyCommentReplySelect] = useState([]);

  const [postReplyComment, setPostReplyComment] = useState([]);
  const [postReplyCommentReply, setPostReplyCommentReply] = useState([]);
  const [postComment, setPostComment] = useState({
    id: "",
    content: "",
    user: {
      image: "",
      name: "",
      username: "",
    },
  });

  const handlePostReplyCommentInputs = (e, index, id) => {
    const indexPost = postReplyComment.findIndex((item2, index2) => {
      return item2.id === id && item2.index === index;
    });

    const copy = postReplyComment.filter((item2) => {
      return item2;
    });
    copy[indexPost].content = e.target.value;
    setPostReplyComment(copy);
  };

  const handlePostReplyCommentReplyInputs = (e, index, id) => {
    const indexPost = postReplyCommentReply.findIndex((item2, index2) => {
      return item2.id === id && item2.index === index;
    });

    const copy = postReplyCommentReply.filter((item2) => {
      return item2;
    });
    copy[indexPost].content = e.target.value;
    setPostReplyCommentReply(copy);
  };

  const handleSubmitReplyComment = (e, id, index) => {
    e.preventDefault();

    const indexId = data.productRequests[indexIdComment].comments.findIndex((item) => {
      return item.id === id;
    });

    const indexReply = openPostReplyCommentSelect.findIndex((item2) => {
      return item2.id === id && item2.index === index;
    });

    if (postReplyComment[indexReply].content.trim() == "") {
      return;
    }

    if (!data.productRequests[indexIdComment].comments[indexId].hasOwnProperty("replies")) {
      // add reply
      const copyPostReply = postReplyComment.filter((item) => {
        return item;
      });
      const getPostReply = copyPostReply[indexReply];

      delete getPostReply.id;
      delete getPostReply.index;

      // remove modal
      const removeSelectKey = openPostReplyCommentSelect.filter((item8) => {
        return !(item8.id === id && item8.index === index);
      });

      seOpenPostReplyCommentSelect(removeSelectKey);

      // remove temporal reply comment UI
      const copy2 = postReplyComment.filter((item7, index7) => {
        return indexReply !== index7;
      });

      setPostReplyComment(copy2);

      // push post
      data.productRequests[indexIdComment].comments[indexId].replies = [];
      data.productRequests[indexIdComment].comments[indexId].replies.push(getPostReply);
      setData({ ...data });
    } else {
      // add reply
      const copyPostReply = postReplyComment.filter((item) => {
        return item;
      });
      const getPostReply = copyPostReply[indexReply];
      delete getPostReply.id;
      delete getPostReply.index;

      // remove modal
      const removeSelectKey = openPostReplyCommentSelect.filter((item8) => {
        return !(item8.id === id && item8.index === index);
      });

      seOpenPostReplyCommentSelect(removeSelectKey);

      // remove temporal reply comment UI
      const copy2 = postReplyComment.filter((item7, index7) => {
        return indexReply !== index7;
      });

      setPostReplyComment(copy2);

      // push post
      data.productRequests[indexIdComment].comments[indexId].replies.push(getPostReply);
      setData({ ...data });
    }
  };

  const handleSubmitReplyCommentReply = (e, id, index) => {
    e.preventDefault();

    const indexId = data.productRequests[indexIdComment].comments.findIndex((item) => {
      return item.id === id;
    });

    const indexReply = openPostReplyCommentReplySelect.findIndex((item2) => {
      return item2.id === id && item2.index === index;
    });

    if (postReplyCommentReply[indexReply].content.trim() == "") {
      return;
    }

    if (!data.productRequests[indexIdComment].comments[indexId].hasOwnProperty("replies")) {
      // add reply
      data.productRequests[indexIdComment].comments[indexId].replies = [];

      const copyPostReply = postReplyCommentReply.filter((item) => {
        return item;
      });
      const getPostReply = copyPostReply[indexReply];

      delete getPostReply.id;
      delete getPostReply.index;

      // remove modal
      const removeSelectKey = openPostReplyCommentReplySelect.filter((item8) => {
        return !(item8.id === id && item8.index === index);
      });

      seOpenPostReplyCommentReplySelect(removeSelectKey);

      // remove temporal reply comment UI
      const copy2 = postReplyCommentReply.filter((item7, index7) => {
        return indexReply !== index7;
      });

      setPostReplyCommentReply(copy2);

      // push post
      data.productRequests[indexIdComment].comments[indexId].replies.push(getPostReply);
      setData({ ...data });
    } else {
      // add reply

      const copyPostReply = postReplyCommentReply.filter((item) => {
        return item;
      });
      const getPostReply = copyPostReply[indexReply];
      delete getPostReply.id;
      delete getPostReply.index;

      // remove modal
      const removeSelectKey = openPostReplyCommentReplySelect.filter((item8) => {
        return !(item8.id === id && item8.index === index);
      });

      seOpenPostReplyCommentReplySelect(removeSelectKey);

      // remove temporal reply comment UI
      const copy2 = postReplyCommentReply.filter((item7, index7) => {
        return indexReply !== index7;
      });

      setPostReplyCommentReply(copy2);

      // push post
      data.productRequests[indexIdComment].comments[indexId].replies.push(getPostReply);
      setData({ ...data });
    }
  };

  const handlePostCommentInput = (e) => {
    const { name, value } = e.target;

    const NewId =
      data.productRequests.reduce((acc, item) => {
        if (item.hasOwnProperty("comments")) {
          item.comments.map((item2, index2) => {
            return acc++;
          });
        }

        return acc;
      }, 0) + 1;

    postComment.user.image = data.currentUser.image;
    postComment.user.name = data.currentUser.name;
    postComment.user.username = data.currentUser.username;
    setPostComment({ ...postComment, [name]: value, id: NewId });
  };

  const handleSubmitPostComment = (e) => {
    e.preventDefault();

    if (postComment.content.trim().toString().length > 0) {
      // add comment

      const copy = {
        ...postComment,
        content: postComment.content.trim(),
      };

      data.productRequests[indexIdComment].comments.push(copy);
      setData({ ...data });

      // reset
      setPostComment({ ...postComment, content: "", id: "" });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-custom_light_gray">
        {/* top */}
        <header className="sm:max-w-[730px] -mt-2 sm:mx-auto sm:pt-14 sm:mt-0">
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
            {/* edit feedback */}
            <button
              onClick={() => {
                navigate(`../feedback/${id}/edit`);
              }}
              className="py-2 px-4 bg-custom_blue text-white rounded-[10px] hover:bg-[#7C91F9]"
            >
              <span className="font-bold text-[13px]">Edit Feedback</span>
            </button>
          </div>
        </header>
        <main className="container mx-auto sm:max-w-[730px]">
          <div className="flex flex-col gap-6 px-6 pb-6">
            {/* edit item target */}
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className=" p-6 bg-custom_very_light_gray flex flex-col rounded-[10px] gap-4 sm:z-0  sm:flex-row sm:relative sm:items-start"
            >
              <div className="sm:flex sm:flex-col sm:gap-2 sm:order-2">
                <div className="flex flex-col gap-2 ">
                  {/* title */}
                  <h4 className="font-bold text-[13px] text-custom_dark_blue text-left">
                    {data.productRequests[indexIdComment].title}
                  </h4>
                  {/* description */}
                  <p className="text-custom_very_dark_gray font-normal text-[13px]">
                    {data.productRequests[indexIdComment].description}
                  </p>
                </div>
                {/* category */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="cursor-pointer rounded-[10px] mt-2 px-4 py-2 font-semibold text-[13px] bg-custom_light_gray text-custom_blue hover:bg-[#CFD7FF] w-max sm:mt-0 sm:order-3 sm:block"
                >
                  {data.productRequests[indexIdComment].category.charAt(0).toUpperCase() +
                    data.productRequests[indexIdComment].category.slice(1)}
                </div>
              </div>

              <div className="flex w-full items-center justify-between sm:order-1 sm:w-max sm:z-20">
                {/* upvotes */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();

                    if (!data.productRequests[indexIdComment].hasOwnProperty("userLike")) {
                      const upvotes = data.productRequests[indexIdComment].upvotes;

                      data.productRequests[indexIdComment].upvotes = upvotes + 1;
                      data.productRequests[indexIdComment].userLike = data.currentUser.username;

                      setData({ ...data });
                    } else {
                      const upvotes = data.productRequests[indexIdComment].upvotes;

                      data.productRequests[indexIdComment].upvotes = upvotes - 1;

                      delete data.productRequests[indexIdComment].userLike;

                      setData({ ...data });
                    }
                  }}
                  className={`cursor-pointer flex items-center px-4 py-2  gap-2 rounded-[10px] sm:flex-col sm:w-[40px] sm:px-2 ${
                    data.productRequests[indexIdComment].hasOwnProperty("userLike")
                      ? "bg-custom_blue text-white"
                      : "hover:bg-[#CFD7FF] bg-custom_light_gray text-[#4661E6]"
                  }`}
                >
                  <figure>
                    <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 6l4-4 4 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        fillRule="evenodd"
                      />
                    </svg>
                  </figure>
                  <span
                    className={`font-bold text-[13px]  ${
                      data.productRequests[indexIdComment].hasOwnProperty("userLike")
                        ? "text-white"
                        : "text-custom_dark_blue"
                    }`}
                  >
                    {data.productRequests[indexIdComment].upvotes}
                  </span>
                </div>
                {/* comments */}

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setCollapseComment(!collapseComment);
                  }}
                  className="cursor-pointer flex items-center gap-2 sm:absolute sm:top-[3.4375em] sm:right-6"
                >
                  <figure>
                    <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
                        fill="#CDD2EE"
                        fillRule="nonzero"
                      />
                    </svg>
                  </figure>
                  <span
                    className={`font-bold text-custom_dark_blue text-[13px] ${
                      data.productRequests[indexIdComment].hasOwnProperty("comments")
                        ? ""
                        : "text-[#CDD2EE]"
                    }`}
                  >
                    {data.productRequests[indexIdComment].hasOwnProperty("comments")
                      ? data.productRequests[indexIdComment].comments.length
                      : "0"}
                  </span>
                </div>
              </div>
            </div>
            {/* comments */}
            {data.productRequests[indexIdComment].hasOwnProperty("comments") &&
              data.productRequests[indexIdComment].comments.length > 0 && (
                <div
                  className={`flex-col p-6 bg-custom_very_light_gray rounded-[10px] ${
                    collapseComment ? "hidden" : "flex"
                  }`}
                >
                  {/* header comment */}
                  <h3 className="h3_jost_bold text-custom_dark_blue">
                    {data.productRequests[indexIdComment].hasOwnProperty("comments") &&
                      data.productRequests[indexIdComment].comments.length}{" "}
                    Comments
                  </h3>
                  {/* item comment */}
                  {data.productRequests[indexIdComment].hasOwnProperty("comments") &&
                    data.productRequests[indexIdComment].comments.length > 0 &&
                    data.productRequests[indexIdComment].comments.map((item, index) => (
                      <div
                        key={index}
                        className={`flex flex-col py-6  ${
                          index !== data.productRequests[indexIdComment].comments.length - 1
                            ? "border-b border-b-[#8C92B3]/25"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-4 sm:gap-6">
                          {/* avatar */}
                          <figure>
                            <div
                              className="h-[40px] w-[40px] rounded-full bg-center bg-cover"
                              style={{
                                backgroundImage: `url(${
                                  "https://raw.githubusercontent.com/AdanQuijadaC/product-feedback-app_byaqc/main/public/" +
                                  item.user.image.split("./").slice(1)
                                })`,
                              }}
                            ></div>
                          </figure>
                          {/* info */}
                          <div className="flex flex-col">
                            <h4 className="text-custom_dark_blue  font-bold text-[13px]">
                              {item.user.name}
                            </h4>
                            <p className="text-[13px] font-normal text-custom_very_dark_gray">
                              {`@${item.user.username}`}
                            </p>
                          </div>
                          {/* reply */}
                          <button
                            onClick={() => {
                              const postSelectKey = {
                                id: item.id,
                                index: index,
                              };

                              const ifExists = openPostReplyCommentSelect.some((item5) => {
                                return item5.id === item.id && item5.index === index;
                              });

                              if (!ifExists) {
                                // add modal
                                seOpenPostReplyCommentSelect(
                                  openPostReplyCommentSelect.concat(postSelectKey)
                                );

                                // add temporal reply comment UI

                                const reply = {
                                  content: "",
                                  replyingTo: item.user.username,
                                  user: {
                                    image: data.currentUser.image,
                                    name: data.currentUser.name,
                                    username: data.currentUser.username,
                                  },
                                  id: item.id,
                                  index: index,
                                };

                                setPostReplyComment(postReplyComment.concat(reply));
                              } else {
                                // remove modal
                                const removeSelectKey = openPostReplyCommentSelect.filter(
                                  (item8) => {
                                    return !(item8.id === item.id && item8.index === index);
                                  }
                                );

                                seOpenPostReplyCommentSelect(removeSelectKey);

                                // remove temporal reply comment UI
                                const copy2 = postReplyComment.filter((item7) => {
                                  return !(item7.id === item.id && item7.index === index);
                                });
                                setPostReplyComment(copy2);
                              }
                            }}
                            className="text-custom_blue font-semibold text-[13px] ml-auto hover:underline"
                          >
                            Reply
                          </button>
                        </div>
                        {/* description */}
                        <p
                          className={`text-custom_very_dark_gray text-[13px] font-normal mt-4 sm:pl-[44px] sm:mt-2 sm:mb-0 sm:translate-x-[20px] sm:pr-[20px]  ${
                            item.hasOwnProperty("replies") && item.replies.length > 0
                              ? "pb-6 sm:border-l sm:border-l-[#8C92B3]/25"
                              : ""
                          }`}
                        >
                          {item.content}
                        </p>

                        {/* show form post */}
                        {openPostReplyCommentSelect.length > 0 &&
                          openPostReplyCommentSelect.some((item4) => {
                            return item4.id === item.id && item4.index === index;
                          }) && (
                            <form
                              onSubmit={(e) => handleSubmitReplyComment(e, item.id, index)}
                              className={`flex items-start justify-between gap-4 sm:pl-[64px] sm:pt-6 sm:translate-x-[20px] sm:pr-[20px] ${
                                item.hasOwnProperty("replies") && item.replies.length > 0
                                  ? "pb-6 sm:border-l sm:border-l-[#8C92B3]/25"
                                  : "pt-6"
                              }`}
                            >
                              <textarea
                                style={{ resize: "none" }}
                                className="w-full bg-custom_light_gray text-custom_dark_blue rounded-[5px] outline-none p-6 placeholder:text-custom_dark_blue/60 placeholder:text-[13px] border border-transparent hover:border hover:border-custom_blue hover:cursor-pointer focus:border-custom_blue"
                                cols="30"
                                rows="2"
                                maxLength={"250"}
                                placeholder="Type your reply here"
                                name="content"
                                value={postReplyComment.content}
                                onChange={(e) => handlePostReplyCommentInputs(e, index, item.id)}
                              ></textarea>
                              <button
                                className="min-w-max py-2 px-4 bg-custom_violet text-white font-bold text-[13px] rounded-[10px] hover:bg-[#c75af6]"
                                type="submit"
                              >
                                Post Reply
                              </button>
                            </form>
                          )}

                        {/* show reply comment */}
                        {item.hasOwnProperty("replies") &&
                          item.replies.length > 0 &&
                          item.replies.map((item2, index2) => (
                            <div
                              key={index2}
                              className={`flex flex-col gap-4 pb-6 pl-6 sm:pl-8 sm:ml-[20px] sm:gap-2  ${
                                index2 !== item.replies.length - 1
                                  ? "border-l border-l-[#8C92B3]/25"
                                  : ""
                              }`}
                            >
                              <div className="flex items-center  gap-4 sm:gap-6 sm:pt-0">
                                {/* avatar */}
                                <figure>
                                  <div
                                    className="h-[40px] w-[40px] rounded-full bg-center bg-cover"
                                    style={{
                                      backgroundImage: `url(${
                                        "https://raw.githubusercontent.com/AdanQuijadaC/product-feedback-app_byaqc/main/public/" +
                                        item2.user.image.split("./").slice(1)
                                      }`,
                                    }}
                                  ></div>
                                </figure>
                                {/* info */}
                                <div className="flex flex-col">
                                  <h4 className="text-custom_dark_blue font-bold text-[13px]">
                                    {`${item2.user.name}`}
                                  </h4>
                                  <p className="text-[13px] font-normal text-custom_very_dark_gray">
                                    {`@${item2.user.username}`}
                                  </p>
                                </div>
                                {/* reply */}
                                <button
                                  onClick={() => {
                                    const postSelectKey = {
                                      id: item.id,
                                      index: index2,
                                    };

                                    const ifExists = openPostReplyCommentReplySelect.some(
                                      (item5) => {
                                        return item5.id === item.id && item5.index === index2;
                                      }
                                    );

                                    if (!ifExists) {
                                      // add modal
                                      seOpenPostReplyCommentReplySelect(
                                        openPostReplyCommentReplySelect.concat(postSelectKey)
                                      );

                                      // add temporal reply comment UI

                                      const reply = {
                                        content: "",
                                        replyingTo: item2.user.username,
                                        user: {
                                          image: data.currentUser.image,
                                          name: data.currentUser.name,
                                          username: data.currentUser.username,
                                        },
                                        id: item.id,
                                        index: index2,
                                      };

                                      setPostReplyCommentReply(postReplyCommentReply.concat(reply));
                                    } else {
                                      // remove modal
                                      const removeSelectKey =
                                        openPostReplyCommentReplySelect.filter((item8) => {
                                          return !(item8.id === item.id && item8.index === index2);
                                        });

                                      seOpenPostReplyCommentReplySelect(removeSelectKey);

                                      // remove temporal reply comment UI
                                      const copy2 = postReplyCommentReply.filter((item7) => {
                                        return !(item7.id === item.id && item7.index === index2);
                                      });
                                      setPostReplyCommentReply(copy2);
                                    }
                                  }}
                                  className="text-custom_blue font-semibold text-[13px] ml-auto hover:underline"
                                >
                                  Reply
                                </button>
                              </div>
                              {/* description */}
                              <p
                                className={`text-custom_very_dark_gray text-[13px] font-normal sm:ml-[64px]`}
                              >
                                <span className="text-custom_violet font-bold mr-2 text-[13px]">
                                  {`@${item2.replyingTo}`}
                                </span>
                                {item2.content}
                              </p>
                              {/* show form reply post */}
                              {openPostReplyCommentReplySelect.length > 0 &&
                                openPostReplyCommentReplySelect.some((item4, index4) => {
                                  return item4.id === item.id && item4.index === index2;
                                }) && (
                                  <form
                                    onSubmit={(e) =>
                                      handleSubmitReplyCommentReply(e, item.id, index2)
                                    }
                                    className={`flex items-start justify-between gap-4 ${
                                      index2 !== item.replies.length - 1
                                        ? "sm:pl-[64px] pt-2"
                                        : "sm:pl-[64px] pt-2"
                                    }`}
                                  >
                                    <textarea
                                      style={{ resize: "none" }}
                                      className="w-full bg-custom_light_gray text-custom_dark_blue rounded-[5px] outline-none p-6 placeholder:text-custom_dark_blue/60 placeholder:text-[13px] border border-transparent hover:border hover:border-custom_blue hover:cursor-pointer focus:border-custom_blue"
                                      cols="30"
                                      rows="2"
                                      maxLength={"250"}
                                      placeholder="Type your reply here"
                                      name="content"
                                      value={postReplyCommentReply.content}
                                      onChange={(e) =>
                                        handlePostReplyCommentReplyInputs(e, index2, item.id)
                                      }
                                    ></textarea>
                                    <button
                                      className="min-w-max py-2 px-4 bg-custom_violet text-white font-bold text-[13px] rounded-[10px] hover:bg-[#c75af6]"
                                      type="submit"
                                    >
                                      Post Reply
                                    </button>
                                  </form>
                                )}
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
              )}

            {/* add comment */}
            <form
              onSubmit={(e) => handleSubmitPostComment(e)}
              className={`flex flex-col gap-6 p-6 bg-custom_very_light_gray rounded-[10px]`}
            >
              {/* title */}
              <h3 className="h3_jost_bold text-custom_dark_blue">Add Comment</h3>
              <div className="flex flex-col gap-6">
                {/* input area */}
                <textarea
                  style={{ resize: "none" }}
                  className="bg-custom_light_gray text-custom_dark_blue rounded-[5px] outline-none p-6 placeholder:text-custom_dark_blue/60 placeholder:text-[13px] border border-transparent hover:border hover:border-custom_blue hover:cursor-pointer focus:border-custom_blue"
                  cols="30"
                  rows="2"
                  maxLength={"250"}
                  placeholder="Type your comment here"
                  value={postComment.content}
                  name="content"
                  onChange={(e) => handlePostCommentInput(e)}
                ></textarea>
                <div className="flex justify-between">
                  {/* character left */}
                  <p className="font-normal text-[13px] text-custom_very_dark_gray">
                    {250 - postComment.content.toString().length} Characteres left
                  </p>
                  {/* post comment */}
                  <button
                    className="py-2 px-4 bg-custom_violet text-white font-bold text-[13px] rounded-[10px] hover:bg-[#c75af6]"
                    type="submit"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
export default FeedbackDetail;
