import Link from "next/link";
import React from "react";

interface BreadCrumbsProps {
  crumbs: { name: string; link?: string }[];
}

const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  return (
    <div className="breadcrumbs text-sm capitalize">
      <ul>
        {crumbs.map((crumb, index) => {
          if (crumb.link) {
            return (
              <li key={index}>
                <span className="text-neutral-400 transition hover:text-base-content hover:underline">
                  <Link href={crumb.link}> {crumb.name}</Link>
                </span>
              </li>
            );
          } else return <li key={index}>{crumb.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default BreadCrumbs;
