import React from "react";

export const UserAvatar = () => {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button">
        <div className="avatar">
          <div className="w-16 rounded-xl">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow dark:text-white"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
};
