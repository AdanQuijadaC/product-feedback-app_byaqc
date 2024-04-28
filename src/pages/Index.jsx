import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/UseGlobalContextProvider";

function Index() {
  const { data, setData } = useGlobalContext();
  const [openMenu, setOpenMenu] = useState(false);
  const [openSortBy, setOpenSortBy] = useState(false);
  const [arraySortBy, setArraySortBy] = useState([
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ]);
  const [arrayInteractives, setArrayInteractives] = useState([
    "All",
    "UI",
    "UX",
    "Enhancement",
    "Bug",
    "Feature",
  ]);
  const [filterInteractiveSelect, setFilterInteractiveSelect] = useState(() => {
    if (
      new URLSearchParams(window.location.search).get("status") === null ||
      new URLSearchParams(window.location.search).get("status") === ""
    ) {
      return 0;
    } else {
      const index = arrayInteractives.findIndex((item) => {
        return (
          item.toLowerCase() ===
          new URLSearchParams(window.location.search).get("status").toLowerCase()
        );
      });

      if (index === -1) {
        return 0;
      } else {
        return index;
      }
    }
  });
  const [sortSelect, setSortSelect] = useState(() => {
    if (
      new URLSearchParams(window.location.search).get("sortby") === null ||
      new URLSearchParams(window.location.search).get("sortby") === ""
    ) {
      return 0;
    } else {
      const index = arraySortBy.findIndex((item) => {
        return (
          item.toLowerCase() ===
          new URLSearchParams(window.location.search).get("sortby").toLowerCase()
        );
      });

      if (index === -1) {
        return 0;
      } else {
        return index;
      }
    }
  });
  const navigate = useNavigate();

  return (
    <>
      <div
        className="min-h-screen bg-custom_light_gray min-w-screen"
        onClick={(e) => {
          if (!e.target.closest(".sortByMenu")) {
            setOpenSortBy(false);
          } else {
          }
        }}
      >
        <div className="sm:pt-16 lg:container lg:mx-auto lg:flex lg:gap-6 lg:max-w-[1100px]">
          <header className="bg-backgroundHeaderMobile bg-cover bg-left container mx-auto sticky top-0 sm:static sm:rounded-[10px] sm:mb-8 sm:bg-none lg:w-min">
            <div className="lg:w-min">
              <nav className="flex justify-between p-6 items-center sm:p-0 lg:w-max">
                {/* logo */}
                <div className="flex flex-col sm:hidden sm:bg-bavckgroundHeaderTable sm:bg-no-repeat">
                  <Link className="text-[15px] font-bold text-white" to={"/"}>
                    Frontend Mentor
                  </Link>
                  <p className="text-[13px] font-medium text-white">Feedback Board</p>
                </div>
                {/* toggle */}
                <button
                  className="sm:hidden"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    document.getElementById("menu_mobile").classList.toggle("hidden");
                  }}
                  type="button"
                >
                  {openMenu ? (
                    <svg width="18" height="17" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.01.368l2.122 2.122-6.01 6.01 6.01 6.01-2.122 2.122L9 10.622l-6.01 6.01L.868 14.51 6.88 8.5.87 2.49 2.988.368 9 6.38 15.01.37z"
                        fill="#FFF"
                        fillRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg width="20" height="17" xmlns="http://www.w3.org/2000/svg">
                      <g fill="#FFF" fillRule="evenodd">
                        <path d="M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z" />
                      </g>
                    </svg>
                  )}

                  {/* close */}
                </button>
                {/* menu */}
                <div
                  onClick={(e) => {
                    if (!e.target.closest(".menu_mobile")) {
                      setOpenMenu(!openMenu);
                      document.getElementById("menu_mobile").classList.add("hidden");
                    }
                  }}
                  className="hidden fixed top-[90px] left-0 w-full h-full bg-black/30 sm:flex sm:static sm:bg-none lg:w-full lg:max-w-[255px]"
                  id="menu_mobile"
                >
                  {/*  */}
                  <div className="ml-auto  p-6 bg-custom_light_gray h-full w-9/12 menu_mobile sm:w-full sm:flex sm:gap-2 sm:p-0 lg:flex-col lg:gap-6">
                    {/* logo tablet */}
                    <div className="hidden sm:flex sm:flex-col sm:bg-backgroundHeaderTable sm:bg-no-repeat sm:w-full sm:rounded-[10px] sm:bg-cover sm:p-6 sm:justify-end lg:bg-backgroundHeaderDesktop lg:bg-right lg:h-[137px]">
                      <Link className="text-[15px] font-bold text-white" to={"/"}>
                        Frontend Mentor
                      </Link>
                      <p className="text-[13px] font-medium text-white">Feedback Board</p>
                    </div>
                    {/* top links */}
                    <div className="bg-white p-6 rounded-[10px] sm:w-full">
                      {/* links elements */}
                      <form className="flex gap-2 flex-wrap">
                        {arrayInteractives.map((item, index) => (
                          <button
                            name="status"
                            value={item}
                            key={index}
                            className={`rounded-[10px] px-4 py-2 font-semibold text-[13px] ${
                              filterInteractiveSelect == index
                                ? "bg-custom_blue text-white "
                                : "bg-custom_light_gray text-custom_blue hover:bg-[#CFD7FF]"
                            }`}
                            type="submit"
                          >
                            {item}
                          </button>
                        ))}
                      </form>
                    </div>
                    {/* bottom */}
                    <div className="bg-white p-6 rounded-[10px] mt-6 sm:w-full sm:mt-0">
                      {/* roadmap elements*/}
                      <ul>
                        <li className="flex justify-between items-center">
                          <span className="h3_jost_bold text-custom_dark_blue">Roadmap</span>
                          {/* view filter */}
                          <button
                            onClick={() => {
                              navigate("roadmap");
                            }}
                            className="text-[13px] font-semibold text-custom_blue underline hover:text-[#8397F8]"
                            type="button"
                          >
                            View
                          </button>
                        </li>
                        <li className="flex items-center justify-between mt-4">
                          <span className="h-[8px] w-[8px] bg-custom_orange rounded-full"></span>
                          <span className="mr-auto ml-4 font-normal text-custom_very_dark_gray">
                            Planed
                          </span>
                          <span className="text-custom_very_dark_gray font-bold">
                            {
                              data.productRequests.filter((item) => {
                                return item.status.toLowerCase() === "planned";
                              }).length
                            }
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="h-[8px] w-[8px] bg-custom_violet rounded-full"></span>
                          <span className="mr-auto ml-4 font-normal text-custom_very_dark_gray">
                            In-Progress
                          </span>
                          <span className="text-custom_very_dark_gray font-bold">
                            {
                              data.productRequests.filter((item) => {
                                return item.status.toLowerCase() === "in-progress";
                              }).length
                            }
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="h-[8px] w-[8px] bg-custom_sky_blue rounded-full"></span>
                          <span className="mr-auto ml-4 font-normal text-custom_very_dark_gray">
                            Live
                          </span>
                          <span className="text-custom_very_dark_gray font-bold">
                            {
                              data.productRequests.filter((item) => {
                                return item.status.toLowerCase() === "live";
                              }).length
                            }
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </header>
          <main className="container mx-auto lg:w-full ">
            {/* sorts */}
            <div className="py-2 px-6 bg-custom_dark_blue flex justify-between items-center sm:rounded-[10px]">
              {/* suggestions */}
              <div className="hidden sm:items-center sm:gap-2 sm:flex">
                <figure>
                  <svg width="23" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.5 2.274c2.237 0 4.339.854 5.923 2.408a8.123 8.123 0 012.465 5.839 8.084 8.084 0 01-1.7 4.979 8.457 8.457 0 01-3.652 2.71l-.31.112.003.826h.369c.262 0 .475.21.475.469a.47.47 0 01-.39.46l-.085.008h-.365l.004 1.02h.36c.263 0 .476.21.476.469a.47.47 0 01-.39.461l-.085.008h-.358l.006 1.487a.466.466 0 01-.381.46l-.094.01H9.23a.478.478 0 01-.466-.378l-.01-.092.006-1.487h-.357a.472.472 0 01-.475-.47.47.47 0 01.39-.46l.085-.008h.361l.004-1.02h-.365a.472.472 0 01-.475-.468.47.47 0 01.39-.462l.085-.007h.368l.004-.826a8.452 8.452 0 01-3.996-2.867 8.08 8.08 0 01-1.666-5.056c.032-2.127.923-4.152 2.511-5.7 1.508-1.471 3.448-2.322 5.493-2.416l.324-.009h.06zm1.791 19.769H9.709l-.004 1.02h3.59l-.004-1.02zm-.007-1.958H9.716l-.003 1.02h3.574l-.003-1.02zM11.5 3.212h-.054c-3.946.027-7.327 3.325-7.384 7.2-.048 3.266 2.14 6.192 5.322 7.118.174.05.3.193.332.364l.008.088-.004 1.166h3.56l-.004-1.166a.47.47 0 01.34-.452c3.134-.912 5.323-3.794 5.323-7.01a7.197 7.197 0 00-2.185-5.173A7.453 7.453 0 0011.5 3.212zm.829 1.782a.4.4 0 01.401.397v.322c.48.12.932.307 1.346.552l.228-.226a.405.405 0 01.569 0L16.046 7.2a.393.393 0 010 .56l-.23.228c.247.41.437.858.557 1.333h.323a.4.4 0 01.402.397v1.645a.4.4 0 01-.402.396h-.323c-.12.476-.31.924-.557 1.333l.23.228a.393.393 0 010 .56l-1.173 1.163a.405.405 0 01-.57 0l-.227-.227a5.02 5.02 0 01-1.346.553v.322a.4.4 0 01-.401.396H10.67a.4.4 0 01-.402-.396v-.322a5.022 5.022 0 01-1.345-.553l-.228.227a.405.405 0 01-.569 0L6.954 13.88a.393.393 0 010-.56l.23-.228a4.924 4.924 0 01-.557-1.333h-.324a.4.4 0 01-.401-.396V9.719a.4.4 0 01.401-.397h.324c.12-.475.31-.923.557-1.333l-.23-.228a.393.393 0 010-.56L8.127 6.04a.405.405 0 01.569 0l.228.226a5.021 5.021 0 011.345-.552V5.39a.4.4 0 01.402-.397zM11.5 7.721c-1.572 0-2.846 1.263-2.846 2.82 0 1.558 1.274 2.82 2.846 2.82s2.846-1.262 2.846-2.82c0-1.557-1.274-2.82-2.846-2.82zm11.025 4.152c.262 0 .475.21.475.469a.47.47 0 01-.39.461l-.085.008h-.498a.472.472 0 01-.475-.469.47.47 0 01.39-.461l.085-.008h.498zm-21.552 0c.262 0 .475.21.475.469a.47.47 0 01-.39.461l-.085.008H.475A.472.472 0 010 12.342a.47.47 0 01.39-.461l.085-.008h.498zM3.112 3.45l.074.06.46.451c.185.183.186.48 0 .663a.476.476 0 01-.596.062l-.075-.06-.459-.451a.465.465 0 01-.001-.663.48.48 0 01.597-.062zm17.373.062c.162.16.182.408.06.59l-.061.073-.46.45a.476.476 0 01-.67 0 .464.464 0 01-.06-.59l.06-.074.46-.45a.48.48 0 01.671 0zM11.5 0c.233 0 .427.166.467.384l.008.085v.49a.472.472 0 01-.475.468.473.473 0 01-.467-.384l-.008-.084v-.49c0-.26.213-.469.475-.469z"
                      fill="#FFF"
                      fillRule="nonzero"
                    />
                  </svg>
                </figure>
                <span className="font-bold text-white text-[18px]">
                  {
                    data.productRequests.filter((item) => {
                      if (filterInteractiveSelect === 0) {
                        return item.status === "suggestion";
                      }
                      if (filterInteractiveSelect === 1) {
                        return item.status === "suggestion" && item.hasOwnProperty("comments");
                      }
                      if (filterInteractiveSelect === 2) {
                        return item.status === "suggestion" && !item.hasOwnProperty("comments");
                      }
                      if (filterInteractiveSelect === 3) {
                        return item.status === "suggestion" && item.category === "enhancement";
                      }
                      if (filterInteractiveSelect === 4) {
                        return item.status === "suggestion" && item.category === "bug";
                      }
                      if (filterInteractiveSelect === 5) {
                        return item.status === "suggestion" && item.category === "feature";
                      }
                    }).length
                  }{" "}
                  Suggestions
                </span>
              </div>
              {/* sort by*/}
              <div className="flex text-white gap-2 relative sm:mr-auto sm:ml-6">
                <button
                  onClick={() => {
                    setOpenSortBy(!openSortBy);
                  }}
                  className={`flex items-center gap-2 text-[14px] font-normal py-4 rounded-[10px] sortByMenu text-custom_very_light_gray`}
                  type="button"
                >
                  <span
                    className={`${
                      openSortBy ? "text-custom_very_light_gray/50" : "text-custom_very_light_gray"
                    }`}
                  >
                    Sort by :
                  </span>
                  <span
                    className={`text-[14px] font-bold ${
                      openSortBy ? "text-custom_very_light_gray/50" : "text-custom_very_light_gray"
                    }`}
                  >
                    {arraySortBy[sortSelect]}
                  </span>
                  <figure>
                    {openSortBy ? (
                      <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1 6l4-4 4 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          fillRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1 1l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          fillRule="evenodd"
                        />
                      </svg>
                    )}
                  </figure>
                </button>
                {/* sort by options */}

                <form
                  className={`w-[255px] absolute top-full left-0 rounded-[10px] bg-white z-10 sm:top-[calc(100%+18px)] ${
                    openSortBy ? "" : "hidden"
                  }`}
                >
                  <ul className="flex flex-col font-normal text-custom_very_dark_gray">
                    {arraySortBy.map((item, index) => (
                      <button
                        value={arraySortBy[index]}
                        name="sortby"
                        type="submit"
                        key={index}
                        className={`py-2 flex px-4 items-center justify-between cursor-pointer border-b-[#979797/50] hover:text-custom_violet ${
                          index !== 3 ? "border-b " : ""
                        }`}
                      >
                        <span>{item}</span>
                        <figure>
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11">
                            <path
                              fill="none"
                              stroke={`${sortSelect == index ? "#AD1FEA" : ""} `}
                              strokeWidth="2"
                              d="M1 5.233L4.522 9 12 1"
                            />
                          </svg>
                        </figure>
                      </button>
                    ))}
                  </ul>
                </form>
              </div>
              {/* add feedback */}
              <button
                onClick={() => {
                  navigate("feedback/new");
                }}
                className="bg-custom_violet flex items-center px-4 py-4 rounded-[10px] gap-1  hover:bg-[#c75af6]"
                type="button"
              >
                <figure>
                  <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg">
                    <text
                      transform="translate(-24 -20)"
                      fill="#F2F4FE"
                      fillRule="evenodd"
                      fontFamily="Jost-Bold, Jost"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      <tspan x="24" y="27.5">
                        +
                      </tspan>
                    </text>
                  </svg>
                </figure>
                <span className="text-white font-bold text-[13px]">Add Feedback</span>
              </button>
            </div>
            {/* cards list*/}
            <div className=" flex flex-col p-6 gap-6 sm:p-0 sm:mt-6">
              {/* card item */}
              {data.hasOwnProperty("productRequests") &&
                data.productRequests.length > 0 &&
                data.productRequests
                  .filter((item) => {
                    if (filterInteractiveSelect === 0) {
                      return item.status === "suggestion";
                    }
                    if (filterInteractiveSelect === 1) {
                      return item.status === "suggestion" && item.hasOwnProperty("comments");
                    }
                    if (filterInteractiveSelect === 2) {
                      return item.status === "suggestion" && !item.hasOwnProperty("comments");
                    }
                    if (filterInteractiveSelect === 3) {
                      return item.status === "suggestion" && item.category === "enhancement";
                    }
                    if (filterInteractiveSelect === 4) {
                      return item.status === "suggestion" && item.category === "bug";
                    }
                    if (filterInteractiveSelect === 5) {
                      return item.status === "suggestion" && item.category === "feature";
                    }
                  })
                  .sort((a, b) => {
                    // most upvotes
                    if (sortSelect === 0) {
                      return b.upvotes - a.upvotes;
                    }
                    // least upvotes
                    if (sortSelect === 1) {
                      return a.upvotes - b.upvotes;
                    }
                    // most comments
                    if (sortSelect === 2) {
                      if (a.hasOwnProperty("comments") && b.hasOwnProperty("comments")) {
                        return b.comments.length - a.comments.length;
                      } else if (a.hasOwnProperty("comments")) {
                        return -1;
                      } else if (b.hasOwnProperty("comments")) {
                        return 1;
                      } else {
                        return 0;
                      }
                    }
                    // least comments
                    if (sortSelect === 3) {
                      if (a.hasOwnProperty("comments") && b.hasOwnProperty("comments")) {
                        return a.comments.length - b.comments.length;
                      } else if (b.hasOwnProperty("comments")) {
                        return -1;
                      } else if (a.hasOwnProperty("comments")) {
                        return 1;
                      } else {
                        return 0;
                      }
                    }
                  })
                  .map((item, index) => (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        navigate(`feedback/${item.id}/detail`);
                      }}
                      key={item.id}
                      className="p-6 bg-custom_very_light_gray flex flex-col rounded-[10px] gap-4 sm:z-0  sm:flex-row sm:relative sm:items-start"
                    >
                      <div className="sm:flex sm:flex-col sm:gap-2 sm:order-2">
                        <div className="flex flex-col gap-2 ">
                          {/* title */}
                          <h4 className="font-bold text-[13px] text-custom_dark_blue text-left">
                            {item.title}
                          </h4>
                          {/* description */}
                          <p className="text-custom_very_dark_gray font-normal text-[13px]">
                            {item.description}
                          </p>
                        </div>
                        {/* category */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="cursor-pointer rounded-[10px] mt-2 px-4 py-2 font-semibold text-[13px] bg-custom_light_gray text-custom_blue hover:bg-[#CFD7FF] w-max sm:mt-0 sm:order-3 sm:block"
                        >
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </div>
                      </div>

                      <div className="flex w-full items-center justify-between sm:order-1 sm:w-max sm:z-20">
                        {/* upvotes */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            const indexTarget = data.productRequests.findIndex((item2) => {
                              return item2.id === item.id;
                            });

                            if (!data.productRequests[indexTarget].hasOwnProperty("userLike")) {
                              const upvotes = data.productRequests[indexTarget].upvotes;

                              data.productRequests[indexTarget].upvotes = upvotes + 1;
                              data.productRequests[indexTarget].userLike =
                                data.currentUser.username;

                              setData({ ...data });
                            } else {
                              const upvotes = data.productRequests[indexTarget].upvotes;

                              data.productRequests[indexTarget].upvotes = upvotes - 1;

                              delete data.productRequests[indexTarget].userLike;

                              setData({ ...data });
                            }
                          }}
                          className={`cursor-pointer flex items-center px-4 py-2  gap-2 rounded-[10px] sm:flex-col sm:w-[40px] sm:px-2 ${
                            item.hasOwnProperty("userLike")
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
                              item.hasOwnProperty("userLike")
                                ? "text-white"
                                : "text-custom_dark_blue"
                            }`}
                          >
                            {item.upvotes}
                          </span>
                        </div>
                        {/* comments */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`feedback/${item.id}/detail`);
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
                              item.hasOwnProperty("comments") ? "" : "text-[#CDD2EE]"
                            }`}
                          >
                            {item.hasOwnProperty("comments") ? item.comments.length : "0"}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}

              {/*  empty */}
              {data.hasOwnProperty("productRequests") &&
                data.productRequests.filter((item) => {
                  return item.status === "suggestion";
                }).length === 0 && (
                  <div className="p-6 bg-white rounded-[10px] ">
                    <div className="flex flex-col gap-6 items-center py-8 max-w-[279px] mx-auto sm:w-4/12">
                      {/* illustration empty */}
                      <figure>
                        <svg width="102" height="108" xmlns="http://www.w3.org/2000/svg">
                          <g fillRule="nonzero" fill="none" opacity=".5">
                            <path
                              d="M48.73 15.593C25.822 15.59 7.246 34.224 7.235 57.22c-.01 22.997 18.55 41.649 41.458 41.665 22.909.016 41.494-18.61 41.516-41.606a41.72 41.72 0 00-12.132-29.473A41.4 41.4 0 0048.73 15.593z"
                              stroke="#3A4374"
                              strokeWidth="1.045"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <ellipse fill="#231F20" cx="70.476" cy="43.691" rx="1.917" ry="2.862" />
                            <path
                              d="M0 44.902l97.429-21.645-19.167-5.612S67.881.37 65.11.01C62.338-.351 11.979 10.43 11.979 10.43L8.785 34.77 0 44.902zM20.284 103.503L9.272 86.027l48.14-8.265 3.305 16.746 4.888-15.424 24.628 4.882-5.007 19.537z"
                              fill="#3A4374"
                            />
                            <path
                              d="M81.97 65.607l4.438-.617L88.7 81.618a2.115 2.115 0 01-1.799 2.387l-.261.036a2.11 2.11 0 01-2.377-1.806L81.97 65.607z"
                              fill="#FFF"
                            />
                            <path
                              d="M86.352 84.471A2.519 2.519 0 0183.87 82.3l-2.292-16.634a.4.4 0 01.343-.45l4.432-.617a.398.398 0 01.296.08c.085.063.14.16.151.265l2.276 16.626a2.508 2.508 0 01-.479 1.868 2.49 2.49 0 01-1.66.97l-.256.04a2.474 2.474 0 01-.328.024zm-3.929-18.518l2.236 16.234c.132.936.991 1.59 1.925 1.467h.263a1.714 1.714 0 001.454-1.932l-2.236-16.234-3.642.465z"
                              fill="#3A4374"
                            />
                            <path fill="#FFF" d="M78.562 50.93l7.159-.995 2.242 16.263-7.16.995z" />
                            <path
                              d="M80.802 67.605a.43.43 0 01-.24-.08.361.361 0 01-.151-.265l-2.244-16.274a.394.394 0 01.072-.296.423.423 0 01.263-.153l7.187-.994a.39.39 0 01.448.345l2.244 16.266a.4.4 0 01-.344.448l-7.187.995-.048.008zm-1.789-16.33l2.132 15.472 6.39-.882-2.133-15.472-6.389.882z"
                              fill="#3A4374"
                            />
                            <path
                              d="M85.573 78.014l.725-.1a3.248 3.248 0 013.664 2.773l3.013 21.85a3.248 3.248 0 01-2.77 3.661l-.726.1a3.248 3.248 0 01-3.664-2.773l-3.013-21.85a3.248 3.248 0 012.77-3.66z"
                              fill="#FFF"
                            />
                            <path
                              d="M88.429 106.83a2.959 2.959 0 01-2.923-2.558L82.31 81.064a2.959 2.959 0 012.516-3.343l2.108-.288a2.949 2.949 0 013.322 2.525l3.195 23.248a2.964 2.964 0 01-2.516 3.335l-2.108.297-.4-.008zm-1.086-28.628a1.838 1.838 0 00-.296 0l-2.108.289a2.13 2.13 0 00-1.422.842c-.35.455-.5 1.034-.415 1.603l3.194 23.248a2.166 2.166 0 002.396 1.844l2.108-.297a2.163 2.163 0 001.837-2.405l-3.194-23.248a2.159 2.159 0 00-2.124-1.868l.024-.008z"
                              fill="#3A4374"
                            />
                            <ellipse fill="#FFF" cx="81.569" cy="46.288" rx="19.19" ry="19.264" />
                            <path
                              d="M81.553 65.953c-10.474-.005-19.093-8.275-19.569-18.778-.476-10.503 7.359-19.525 17.789-20.485 10.43-.96 19.768 6.482 21.202 16.897 1.47 10.746-5.992 20.662-16.691 22.182-.905.122-1.818.184-2.731.184zm0-38.536c-.868 0-1.736.059-2.596.177-7.532 1.045-13.696 6.542-15.616 13.927-1.92 7.386.78 15.206 6.844 19.812a18.74 18.74 0 0020.853 1.234c6.56-3.86 10.157-11.307 9.114-18.868-1.298-9.305-9.207-16.24-18.567-16.282h-.032z"
                              fill="#3A4374"
                            />
                            <ellipse fill="#FFF" cx="81.569" cy="46.288" rx="15.589" ry="15.648" />
                            <path
                              d="M81.56 62.338c-8.606 0-15.665-6.846-15.962-15.48-.297-8.635 6.275-15.953 14.862-16.548 8.586-.596 16.098 5.745 16.987 14.339.889 8.593-5.165 16.348-13.69 17.536-.728.103-1.462.154-2.196.153zm0-31.265c-.707 0-1.414.049-2.116.144-8.096 1.127-13.848 8.489-13.009 16.65.839 8.162 7.967 14.19 16.122 13.634 8.154-.556 14.405-7.496 14.136-15.697-.268-8.2-6.959-14.713-15.132-14.731z"
                              fill="#3A4374"
                            />
                            <path
                              d="M99.896 89.714a11.645 11.645 0 00-3.913-3.206c-4.576-2.405-9.822-2.325-14.638-.802-1.709.545-5.023 1.323-5.199 3.6a2.115 2.115 0 001.526 2.004 6.254 6.254 0 002.675.104 6.887 6.887 0 00-3.618.914c-1.03.73-1.597 2.324-.75 3.294.374.404.861.683 1.397.802a6.365 6.365 0 003.554-.048c-1.251.24-2.47.625-3.634 1.146-.703.313-1.485.866-1.405 1.604.08.737.798 1.074 1.453 1.298 1.378.475 2.817.745 4.273.802a8.4 8.4 0 00-3.474 1.5c-1.598 1.346-1.598 3.903.567 4.633a6.366 6.366 0 002.14.248c6.389 0 14.04-.801 18.368-6.14a9.993 9.993 0 002.044-9.067 8.702 8.702 0 00-1.366-2.686z"
                              fill="#FFF"
                            />
                            <path
                              d="M80.802 107.984c-.75.037-1.5-.053-2.22-.265a2.762 2.762 0 01-1.9-2.108 3.502 3.502 0 011.197-3.207 5.952 5.952 0 011.725-1.002 14.816 14.816 0 01-2.396-.617c-1.062-.369-1.597-.914-1.717-1.603-.12-.69.495-1.523 1.598-2.044l.567-.24a4.211 4.211 0 01-.432-.105 3.008 3.008 0 01-1.597-.914 2.219 2.219 0 01-.471-1.732 3.209 3.209 0 011.294-2.14c.248-.175.516-.32.798-.433a2.461 2.461 0 01-1.525-2.3c.184-2.342 3.067-3.207 4.967-3.793l.511-.152c5.335-1.691 10.646-1.395 14.942.802a11.99 11.99 0 014.049 3.35 9.207 9.207 0 011.445 2.79 10.363 10.363 0 01-2.116 9.444c-4.528 5.555-12.37 6.277-18.695 6.285l-.024-.016zm-.759-11.055c-.887.226-1.752.53-2.587.906-.375.168-1.23.625-1.166 1.219.064.593.67.801 1.182.97 1.34.47 2.742.74 4.16.801a.392.392 0 01.384.353.4.4 0 01-.296.433 8.289 8.289 0 00-3.322 1.419 2.659 2.659 0 00-.934 2.453 1.953 1.953 0 001.373 1.499 5.73 5.73 0 002.005.224c6.157 0 13.768-.69 18.08-5.988a9.567 9.567 0 001.98-8.698 8.413 8.413 0 00-1.325-2.541 11.094 11.094 0 00-3.777-3.127c-4.113-2.124-9.2-2.405-14.335-.801l-.52.16c-1.692.513-4.264 1.29-4.408 3.086.031.753.54 1.4 1.262 1.604a3.86 3.86 0 001.43.176c.375-.04.742-.064 1.094-.088a.416.416 0 01.423.369.408.408 0 01-.36.433c-.359 0-.734.08-1.117.088a4.898 4.898 0 00-2.308.753c-.525.382-.874.96-.967 1.604-.063.395.041.799.288 1.114.325.334.742.563 1.198.657a6.11 6.11 0 002.396.16c.32-.08.646-.152.966-.216a.4.4 0 01.463.297.41.41 0 01-.271.48 6.097 6.097 0 01-.99.201z"
                              fill="#3A4374"
                            />
                            <path
                              d="M55.367 46.593s9.727 14.67 3.84 14.879c-5.885.208-6.388-1.339-6.388-1.339"
                              fill="#FFF"
                            />
                            <path
                              d="M58.154 61.937c-4.936 0-5.646-1.355-5.742-1.603a.425.425 0 01.263-.53.415.415 0 01.52.265s.718 1.243 5.997 1.05a1.348 1.348 0 001.294-.673c1.261-2.461-3.514-10.622-5.463-13.556a.418.418 0 01.128-.553.414.414 0 01.56.088c.742 1.122 7.186 11.063 5.51 14.43a2.139 2.139 0 01-1.997 1.13l-1.07-.048z"
                              fill="#3A4374"
                            />
                            <ellipse fill="#C0C5DC" cx="82.455" cy="45.799" rx="3.53" ry="6.036" />
                            <ellipse fill="#3A4374" cx="39.259" cy="45.799" rx="2.691" ry="4.882" />
                          </g>
                        </svg>
                      </figure>
                      {/* title */}
                      <h3 className="h3_jost_bold text-custom_dark_blue">
                        There is no feedback yet.
                      </h3>
                      {/* description */}
                      <p className="text-custom_very_dark_gray text-[13px] font-normal text-center">
                        Got a suggestion? Found a bug that needs to be squashed? We love hearing
                        about new ideas to improve our app.
                      </p>

                      {/* add feedback */}
                      <div className="flex justify-center w-full">
                        <button
                          onClick={() => {
                            navigate("feedback/new");
                          }}
                          className="bg-custom_violet flex items-center px-4 py-4 rounded-[10px] gap-1  hover:bg-[#c75af6]"
                          type="button"
                        >
                          <figure>
                            <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg">
                              <text
                                transform="translate(-24 -20)"
                                fill="#F2F4FE"
                                fillRule="evenodd"
                                fontFamily="Jost-Bold, Jost"
                                fontSize="14"
                                fontWeight="bold"
                              >
                                <tspan x="24" y="27.5">
                                  +
                                </tspan>
                              </text>
                            </svg>
                          </figure>
                          <span className="text-white font-bold text-[13px]">Add Feedback</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default Index;
