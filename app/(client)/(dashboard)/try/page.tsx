import React from "react";

const page = () => {
  return (
    <div>
      <div className="  ">
        <div>
          <div className="">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="  text-lg font-medium leading-[1.2] sm:mb-[5px] sm:text-2xl md:text-[26px]">
                  Leaves
                </h3>
                <ul className="hidden flex-wrap text-[14px] font-medium sm:flex md:text-base">
                  <li>
                    <a
                      href="index.html"
                      className="dark:text-swapText text-[#333333]"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <span className="px-2 dark:text-[#6c757d]">/</span>
                  </li>
                  <li className="text-[#6c757d]">Leaves</li>
                </ul>
              </div>
              <div>
                <a
                  className=""
                >
                  <i className="fa fa-plus mr-[5px]"></i> Add Leave
                </a>
              </div>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-5 md:grid-cols-4">
            <div className="dark:border-swapBorderPrimary dark:bg-swapBg rounded-[4px] border border-[#e5e5e5] bg-white p-[15px] text-center">
              <h6 className="dark:text-swapText media-max-w-md:text-base mb-[5px] text-lg font-normal text-[#1f1f1f]">
                Annual Leave
              </h6>
              <h4 className="dark:text-swapText text-2xl">12</h4>
            </div>
            <div className="dark:border-swapBorderPrimary dark:bg-swapBg rounded-[4px] border border-[#e5e5e5] bg-white p-[15px] text-center">
              <h6 className="dark:text-swapText media-max-w-md:text-base mb-[5px] text-lg font-normal text-[#1f1f1f]">
                Medical Leave
              </h6>
              <h4 className="dark:text-swapText text-2xl">3</h4>
            </div>
            <div className="dark:border-swapBorderPrimary dark:bg-swapBg rounded-[4px] border border-[#e5e5e5] bg-white p-[15px] text-center">
              <h6 className="dark:text-swapText media-max-w-md:text-base mb-[5px] text-lg font-normal text-[#1f1f1f]">
                Other Leave
              </h6>
              <h4 className="dark:text-swapText text-2xl">4</h4>
            </div>
            <div className="dark:border-swapBorderPrimary dark:bg-swapBg rounded-[4px] border border-[#e5e5e5] bg-white p-[15px] text-center">
              <h6 className="dark:text-swapText media-max-w-md:text-base mb-[5px] text-lg font-normal text-[#1f1f1f]">
                Remaining Leave
              </h6>
              <h4 className="dark:text-swapText text-2xl">5</h4>
            </div>
          </div>
          <div className=" w-full  whitespace-nowrap">
            <table className="stripe custom-table table relative bottom-3 top-3 w-full bg-white dark:bg-[#212529]">
              <thead>
                <tr className="text-left">
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>No of Days</th>
                  <th>Reason</th>
                  <th className="text-center">Status</th>
                  <th>Approved by</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Casual Leave</td>
                  <td>8 Mar 2019</td>
                  <td>9 Mar 2019</td>
                  <td>2 days</td>
                  <td>Going to Hospital</td>
                  <td className="text-center">
                    <div>
                      <a
                        className="dark:bg-blackHoverbg border-btnBorder dark:border-swapBorderPrimary inline-block min-w-[103px] rounded-[50px] border bg-white p-1 text-center text-[13px] text-[#333333] dark:text-[#777777]"
                      >
                        <i className="fa fa-dot-circle-o pr-[3px] text-[#7460ee]"></i>
                        New
                      </a>
                    </div>
                  </td>
                  <td>
                    <h2 className="inline-flex items-center whitespace-nowrap align-middle text-[15px] font-normal">
                      <a
                        href="profile.html"
                        className="relative mr-[10px] inline-block h-[38px] w-[38px] rounded-full text-[#fe8259]"
                      >
                        <img
                          alt=""
                          src="images/profiles/avatar-09.jpg"
                          className="w-full rounded-full"
                        />
                      </a>
                      <a href="profile.html" className="text-[#fe8259]">
                        Richard Miles
                      </a>
                    </h2>
                  </td>
                  <td className="relative">
                    <div
                      className="relative text-right"
                    >
                      <a
                        href="javascript:;"
                        className="inline-block text-lg text-[#777777]"
                      >
                        <i className="material-icons">more_vert</i>
                      </a>
                      <div
                        className="border-blackOpacity absolute right-0 z-50 min-w-[120px] rounded-[3px] border bg-white"
                        x-show="cardAction"
                      >
                        <a
                          className="clear-both block w-full whitespace-nowrap px-[10px] py-[5px] text-left text-[13px] hover:bg-[#e9ecef]"
                          href="javascript:;"
                        >
                          <i className="fa fa-pencil mr-[5px]"></i> Edit
                        </a>
                        <a
                          className="clear-both block w-full whitespace-nowrap px-[10px] py-[5px] text-left text-[13px] hover:bg-[#e9ecef]"
                          href="javascript:;"
                        >
                          <i className="fa fa-trash-o mr-[5px]"></i> Delete
                        </a>
                      </div>
                      {/* <div
                        className="fixed left-0 right-0 top-0 z-[9999] h-full w-full overflow-y-auto overflow-x-hidden text-left outline-none"
                      >
                        <div className="flex min-h-screen items-center justify-center">
                         
                          <div

                          >
                            <div className="p-[30px] text-center">
                              <div className="mb-[30px]">
                                <h5 className="mb-[10px] text-[22px] capitalize dark:text-[#1f1f1f]">
                                  Delete Leave
                                </h5>
                                <p className="text-[15px] text-[#929292]">
                                  Are you sure want to delete?
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <a
                                  href="javascript:;"
                                  className="btnPrimary-outline"
                                >
                                  Delete
                                </a>
                                <a
                                  href="javascript:;"
                                  className="btnPrimary-outline"
                                >
                                  Cancel
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      {/* <div
                        className="fixed left-0 right-0 top-0 z-[9999] h-full w-full overflow-y-auto overflow-x-hidden text-left outline-none"
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true"
                      >
                        <div>
                          <div>
                            <div className="px-[30px] pt-[30px] text-center">
                              <h5 className="text-[22px] capitalize dark:text-[#1f1f1f]">
                                Edit Leave
                              </h5>
                              <button
                                type="button"
                                className="absolute right-[10px] top-[10px] z-50 h-5 w-5 rounded-full bg-[#a0a0a0] leading-5 text-white"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="p-[30px]">
                              <form>
                                <div>
                                  <div className="mb-4">
                                    <label className="block text-[15px]">
                                      <span className="text-[#1f1f1f]">
                                        Company
                                        <span className="text-danger">*</span>
                                      </span>
                                      <select className="form-select block w-full text-[#676767]">
                                        <option>Select Leave Type</option>
                                        <option>Casual Leave 12 Days</option>
                                      </select>
                                    </label>
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-[15px] text-[#1f1f1f]">
                                      From{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <div className="flex items-center justify-center">
                                      <div className="datepicker relative z-[9999] w-full">
                                        <input
                                          type="text"
                                          className="inputStyle block w-full"
                                          value="01-01-2022"
                                          placeholder="Select Date"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-[15px] text-[#1f1f1f]">
                                      To <span className="text-danger">*</span>
                                    </label>
                                    <div className="flex items-center justify-center">
                                      <div className="datepicker relative z-[9999] w-full">
                                        <input
                                          type="text"
                                          className="inputStyle block w-full"
                                          value="01-01-2022"
                                          placeholder="Select Date"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-[15px] text-[#1f1f1f]">
                                      Number of days
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      className="inputStyle block w-full !bg-[#e9ecef]"
                                      value="2"
                                      type="text"
                                      // readonly="readonly"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-[15px] text-[#1f1f1f]">
                                      Remaining Leaves
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      className="inputStyle block w-full !bg-[#e9ecef]"
                                      value="12"
                                      type="text"
                                      // readonly="readonly"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[15px] text-[#1f1f1f]">
                                      Leave Reason
                                      <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                      rows={4}
                                      className="textareaStyle block w-full"
                                    >
                                      Going to hospital
                                    </textarea>
                                  </div>
                                </div>
                                <div className="mt-10 text-center">
                                  <button className="submit-btn">Save</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
