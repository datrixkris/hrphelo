export default function ThemeSwap({
  handleOnClick,
}: {
  handleOnClick?: (e?: any) => void;
}) {
  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          Theme
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul className="dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow-2xl">
          <li onClick={handleOnClick}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
              aria-label="Black"
              value="black"
            />
          </li>
          <li onClick={handleOnClick}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
              aria-label="Light"
              value="lofi"
            />
          </li>
          <li onClick={handleOnClick}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
              aria-label="Dark"
              value="dark"
            />
          </li>
        </ul>
      </div>
    </>
  );
}
