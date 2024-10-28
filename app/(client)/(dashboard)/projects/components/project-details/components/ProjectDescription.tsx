// import DropdownComponent from "@/app/components/DropdownComponent";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const ProjectDescription = () => {
  return (
    <div className="space-y-5 rounded-lg bg-base-100 p-5 py-8 text-sm font-medium shadow">
      {/* title and stats */}
      <div className="">
        <div className="flex justify-between">
          <h2 className="mb-2 text-lg font-semibold capitalize text-base-content transition-colors">
            Office Managements
          </h2>

          <Icon icon="heroicons:pencil" className="text-2xl"></Icon>
        </div>

        <p className="text-xs">
          <span className="text-base-content">1</span> open task,{" "}
          <span className="text-base-content">9</span> tasks completed
        </p>
      </div>
      {/* descriptoin */}
      <div className="">
        <p className="">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ipsam quia veritatis facilis unde vitae distinctio aspernatur aperiam,
          obcaecati fuga, laudantium ullam soluta repellendus dicta earum et.
          Totam laborum, cum, saepe aliquam hic quibusdam dolorum asperiores
          ipsum voluptatum cupiditate incidunt delectus tempora quae in fugiat
          dolorem ad optio, minima sunt? Molestias repellendus nisi unde.
          Deleniti doloremque beatae similique, non dolores numquam inventore,
          mollitia, laboriosam sint itaque soluta! Itaque veritatis delectus
          unde error facere quos voluptas quas iusto dolorum sit, perspiciatis,
          assumenda, fugiat provident culpa aliquam distinctio laborum saepe
          amet nulla id doloribus autem. Laborum nostrum illum veritatis totam
          esse provident tempore?
        </p>
      </div>
    </div>
  );
};

export default ProjectDescription;
