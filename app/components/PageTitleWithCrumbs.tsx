import React from "react";
import BreadCrumbs from "./BreadCrumbs";

interface PageTitleWithCrumbsProps {
  crumbs: { name: string; link?: string }[];
  title: string;
}

const PageTitleWithCrumbs = ({ crumbs, title }: PageTitleWithCrumbsProps) => {
  return (
    <div>
      <h3 className="text-pageTitle dark:text-swapText text-lg font-medium capitalize leading-[1.2] sm:mb-[5px] sm:text-2xl md:text-[26px]">
        {title}
      </h3>
      <BreadCrumbs crumbs={crumbs} />
    </div>
  );
};

export default PageTitleWithCrumbs;
