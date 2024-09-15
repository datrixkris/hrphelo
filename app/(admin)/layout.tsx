import Sidebar from "./components/Sidebar";
import Topnav from "./components/Topnav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="fixed top-0 bottom-0 w-[250px]">
        <Sidebar />
      </div>
      <div className="ml-[250px] primary-bg min-h-screen">
        <div>
          <Topnav />

          <div className="maximum-width py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
