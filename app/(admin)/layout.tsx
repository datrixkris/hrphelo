import Sidebar from "./components/Sidebar";
import Topnav from "./components/Topnav";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <div className="fixed bottom-0 top-0 w-[250px]">
        <Sidebar />
      </div>
      <div className="primary-bg ml-[250px] min-h-screen">
        <div>
          <Topnav />

          <div className="maximum-width py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
