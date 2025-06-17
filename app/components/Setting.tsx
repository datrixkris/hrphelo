import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState, ChangeEvent } from "react";

interface SettingProps {
  handleOnClick?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Setting = ({ handleOnClick }: SettingProps) => {
  const [selectedTheme, setSelectedTheme] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const theme = localStorage.getItem("theme") || "light";
      setSelectedTheme(theme);
    }
  }, []);

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content z-50">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-primary drawer-button fixed bottom-4 right-4 rounded-full text-2xl"
          >
            <Icon icon="ic:round-color-lens" />
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
            {[
              "light",
              "dark",
              "retro",
              "black",
              "lofi",
              "coffee",
              "lemonade",
              "luxury",
              "valentine",
              "synthwave",
            ].map((theme) => (
              <li key={theme}>
                <div className="form-control">
                  <label className="label cursor-pointer gap-4">
                    <span className="label-text capitalize">{theme}</span>
                    <input
                      type="radio"
                      name="theme-radios"
                      className="theme-controller radio"
                      value={theme}
                      checked={selectedTheme === theme}
                      onChange={(e) => {
                        if (handleOnClick) handleOnClick(e);
                        setSelectedTheme(e.target.value);
                      }}
                    />
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Setting;
