import { Icon } from "@iconify/react/dist/iconify.js";

const Setting = ({ handleOnClick }: { handleOnClick?: (e?: any) => void }) => {
  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-primary drawer-button fixed bottom-4 right-4 rounded-full text-2xl"
          >
            <Icon icon="mdi:settings" className="animate-spin" />
          </label>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
            <div className="l pt-3">
              <h5>Sidebar Color</h5>
              <h6>Choose a color of Sidebar.</h6>
            </div>
            <li>
              <div className="form-control">
                <label className="label cursor-pointer gap-4">
                  <span className="label-text">Black</span>
                  <input
                    type="radio"
                    name="theme-radios"
                    className="theme-controller radio"
                    value="black"
                    onChange={handleOnClick}
                  />
                </label>
              </div>
            </li>
            <li>
              <div className="form-control">
                <label className="label cursor-pointer gap-4">
                  <span className="label-text">Dark</span>
                  <input
                    type="radio"
                    name="theme-radios"
                    className="theme-controller radio"
                    value="dark"
                    onChange={handleOnClick}
                  />
                </label>
              </div>
            </li>
            <li>
              <div className="form-control">
                <label className="label cursor-pointer gap-4">
                  <span className="label-text">Lofi</span>
                  <input
                    type="radio"
                    name="theme-radios"
                    className="theme-controller radio"
                    value="lofi"
                    onChange={handleOnClick}
                  />
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
  
    </div>
  );
};

export default Setting;
