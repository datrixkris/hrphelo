// Tab Navigation Component
const TabNavigation = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="no-scrollbar w-full overflow-x-scroll border-b border-base-300 bg-base-100">
      <div className="">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`inline-block px-4 py-2.5 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-hr-yellow text-hr-yellow"
                  : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
