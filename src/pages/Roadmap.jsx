import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/UseGlobalContextProvider";
import { useEffect, useState } from "react";

function Roadmap() {
  const { data, setData } = useGlobalContext();
  const [statusSelect, setStatusSelect] = useState(0); // 0 default
  const statusArray = ["Planned", "In-Progress", "Live"];
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-custom_light_gray">
        {/* top */}
        <header className="bg-custom_very_dark_blue flex sm:max-w-[1100px] sm:mx-auto sm:pt-16  sm:container sm:bg-custom_light_gray">
          <div className="flex justify-between container mx-auto p-6 sm:bg-custom_very_dark_blue sm:rounded-[10px]">
            <div className="flex flex-col">
              {/* go back link */}
              <Link className="flex  items-center gap-2 hover:underline" to={"/"}>
                <figure>
                  <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 9L2 5l4-4"
                      stroke="#fff"
                      strokeWidth="2"
                      fill="none"
                      fillwule="evenodd"
                    />
                  </svg>
                </figure>
                <span className="font-bold text-white">Go Back</span>
              </Link>
              <h2 className="font-bold text-[18px] text-white">Roadmap</h2>
            </div>

            <button
              onClick={() => {
                navigate("../feedback/new");
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
        </header>

        <main className="container mx-auto sm:max-w-[1100px] sm:mx-auto">
          {/* tags */}
          <section className="flex sm:hidden">
            <ul className="flex w-full">
              {statusArray.map((item, index) => (
                <li
                  onClick={() => {
                    setStatusSelect(index);
                  }}
                  key={index}
                  className={`text-center cursor-pointer font-bold text-[13px] py-4 w-full ${
                    statusSelect === index
                      ? `border-b-4  ${index == 0 && "border-custom_orange"} ${
                          index == 1 && "border-custom_violet"
                        } ${index == 2 && "border-custom_sky_blue"}`
                      : "border-b border-[#8C92B3]/25 text-custom_dark_blue/40"
                  }`}
                >
                  {item} (
                  {
                    data.productRequests.filter((item2) => {
                      return item2.status.toLowerCase() === statusArray[index].toLowerCase();
                    }).length
                  }
                  )
                </li>
              ))}
            </ul>
          </section>
          <div className="flex flex-col gap-6 px-6 pb-6 mt-8 mx-auto container sm:grid sm:grid-cols-3 sm:px-0">
            {/* show planned list */}
            <div className={`flex-col ${statusSelect === 0 ? "flex" : "hidden"} sm:flex`}>
              <h3 className="font-bold text-custom_dark_blue text-[18px]">
                Planned (
                {
                  data.productRequests.filter((item) => {
                    return item.status.toLowerCase() === "planned";
                  }).length
                }
                )
              </h3>
              <p className="font-normal text-[13px] text-custom_very_dark_gray">
                Ideas prioritized for research
              </p>
              {/* item */}
              {data.productRequests
                .filter((item) => {
                  return item.status.toLowerCase() === "planned";
                })
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-custom_very_light_gray mt-4 p-6 rounded-[10px] border-t-[6px] border-custom_orange flex flex-col"
                  >
                    {/* status */}
                    <div className="flex items-center gap-2">
                      <div className="h-[8px] w-[8px] bg-custom_orange rounded-full"></div>
                      <span className="text-custom_very_dark_gray font-normal text-[13px]">
                        Planned
                      </span>
                    </div>
                    {/* title */}
                    <h4
                      onClick={() => {
                        navigate(`../feedback/${item.id}/detail`);
                      }}
                      className="text-custom_dark_blue font-bold text-[13px] mt-4 w-max cursor-pointer hover:text-custom_blue"
                    >
                      {item.title}
                    </h4>
                    {/* description */}
                    <p className="text-custom_very_dark_gray text-[13px] font-normal mt-2 h-[2.4375em]">
                      {item.description}
                    </p>
                    {/* category */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="cursor-pointer rounded-[10px] mt-4 px-4 py-2 font-semibold text-[13px] bg-custom_light_gray text-custom_blue hover:bg-[#CFD7FF] w-max"
                    >
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </div>
                    {/* votes and comments */}
                    <div className="flex w-full items-center justify-between mt-4">
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
                            data.productRequests[indexTarget].userLike = data.currentUser.username;

                            setData({ ...data });
                          } else {
                            const upvotes = data.productRequests[indexTarget].upvotes;

                            data.productRequests[indexTarget].upvotes = upvotes - 1;

                            delete data.productRequests[indexTarget].userLike;

                            setData({ ...data });
                          }
                        }}
                        className={`cursor-pointer flex items-center px-4 py-2  gap-2 rounded-[10px] ${
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
                            item.hasOwnProperty("userLike") ? "text-white" : "text-custom_dark_blue"
                          }`}
                        >
                          {item.upvotes}
                        </span>
                      </div>
                      {/* comments */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`../feedback/${item.id}/detail`);
                        }}
                        className="cursor-pointer flex items-center gap-2 "
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
                  </div>
                ))}
            </div>

            {/* show in-progress list */}
            <div className={`flex-col ${statusSelect === 1 ? "flex" : "hidden"} sm:flex`}>
              <h3 className="font-bold text-custom_dark_blue text-[18px]">
                In-Progress (
                {
                  data.productRequests.filter((item) => {
                    return item.status.toLowerCase() === "in-progress";
                  }).length
                }
                )
              </h3>
              <p className="font-normal text-[13px] text-custom_very_dark_gray">
                Features currently being developed
              </p>
              {/* item */}
              {data.productRequests
                .filter((item) => {
                  return item.status.toLowerCase() === "in-progress";
                })
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-custom_very_light_gray mt-4 p-6 rounded-[10px] border-t-[6px] border-custom_violet flex flex-col"
                  >
                    {/* status */}
                    <div className="flex items-center gap-2">
                      <div className="h-[8px] w-[8px] bg-custom_violet rounded-full"></div>
                      <span className="text-custom_very_dark_gray font-normal text-[13px]">
                        In Progress
                      </span>
                    </div>
                    {/* title */}
                    <h4
                      onClick={() => {
                        navigate(`../feedback/${item.id}/detail`);
                      }}
                      className="text-custom_dark_blue font-bold text-[13px] mt-4 w-max cursor-pointer hover:text-custom_blue"
                    >
                      {item.title}
                    </h4>
                    {/* description */}
                    <p className="text-custom_very_dark_gray text-[13px] font-normal mt-2 h-[2.4375em]">
                      {item.description}
                    </p>
                    {/* category */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="cursor-pointer rounded-[10px] mt-4 px-4 py-2 font-semibold text-[13px] bg-custom_light_gray text-custom_blue hover:bg-[#CFD7FF] w-max"
                    >
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </div>
                    {/* votes and comments */}
                    <div className="flex w-full items-center justify-between mt-4">
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
                            data.productRequests[indexTarget].userLike = data.currentUser.username;

                            setData({ ...data });
                          } else {
                            const upvotes = data.productRequests[indexTarget].upvotes;

                            data.productRequests[indexTarget].upvotes = upvotes - 1;

                            delete data.productRequests[indexTarget].userLike;

                            setData({ ...data });
                          }
                        }}
                        className={`cursor-pointer flex items-center px-4 py-2  gap-2 rounded-[10px] ${
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
                            item.hasOwnProperty("userLike") ? "text-white" : "text-custom_dark_blue"
                          }`}
                        >
                          {item.upvotes}
                        </span>
                      </div>
                      {/* comments */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`../feedback/${item.id}/detail`);
                        }}
                        className="cursor-pointer flex items-center gap-2 "
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
                  </div>
                ))}
            </div>

            {/* show live list */}
            <div className={`flex-col ${statusSelect === 2 ? "flex" : "hidden"} sm:flex`}>
              <h3 className="font-bold text-custom_dark_blue text-[18px]">
                Live (
                {
                  data.productRequests.filter((item) => {
                    return item.status.toLowerCase() === "live";
                  }).length
                }
                )
              </h3>
              <p className="font-normal text-[13px] text-custom_very_dark_gray">
                Released features
              </p>
              {/* item */}
              {data.productRequests
                .filter((item) => {
                  return item.status.toLowerCase() === "live";
                })
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-custom_very_light_gray mt-4 p-6 rounded-[10px] border-t-[6px] border-custom_sky_blue flex flex-col"
                  >
                    {/* status */}
                    <div className="flex items-center gap-2">
                      <div className="h-[8px] w-[8px] bg-custom_sky_blue rounded-full"></div>
                      <span className="text-custom_very_dark_gray font-normal text-[13px]">
                        Live
                      </span>
                    </div>
                    {/* title */}
                    <h4
                      onClick={() => {
                        navigate(`../feedback/${item.id}/detail`);
                      }}
                      className="text-custom_dark_blue font-bold text-[13px] mt-4 w-max cursor-pointer hover:text-custom_blue"
                    >
                      {item.title}
                    </h4>
                    {/* description */}
                    <p className="text-custom_very_dark_gray text-[13px] font-normal mt-2 h-[2.4375em]">
                      {item.description}
                    </p>
                    {/* category */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="cursor-pointer rounded-[10px] mt-4 px-4 py-2 font-semibold text-[13px] bg-custom_light_gray text-custom_blue hover:bg-[#CFD7FF] w-max"
                    >
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </div>
                    {/* votes and comments */}
                    <div className="flex w-full items-center justify-between mt-4">
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
                            data.productRequests[indexTarget].userLike = data.currentUser.username;

                            setData({ ...data });
                          } else {
                            const upvotes = data.productRequests[indexTarget].upvotes;

                            data.productRequests[indexTarget].upvotes = upvotes - 1;

                            delete data.productRequests[indexTarget].userLike;

                            setData({ ...data });
                          }
                        }}
                        className={`cursor-pointer flex items-center px-4 py-2  gap-2 rounded-[10px] ${
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
                            item.hasOwnProperty("userLike") ? "text-white" : "text-custom_dark_blue"
                          }`}
                        >
                          {item.upvotes}
                        </span>
                      </div>
                      {/* comments */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`../feedback/${item.id}/detail`);
                        }}
                        className="cursor-pointer flex items-center gap-2 "
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
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
export default Roadmap;
