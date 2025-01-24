import React, { useEffect } from "react";
import { staffOrgnogram } from "../types";

interface MyOrgChartProp {
  orgnogramData: staffOrgnogram[];
}

const MyOrgChart = ({ orgnogramData }: MyOrgChartProp) => {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../BALKAN_OrgChartJS/orgchart.js";
    script.async = true;

    let chart: any;

    script.onload = () => {
      const treeElement = document.getElementById("tree");

      if (treeElement) {
        try {
          chart = new OrgChart(treeElement, {
            mouseScrool: OrgChart.action.none, 
            scaleInitial: 0.5,
            scaleMin: 0.5,
            scaleMax: 2,
            template: "olivia",
            enableDragDrop: true,
            nodeMouseClick: OrgChart.action.none,
            nodeBinding: {
              field_0: "name",
              field_1: "title",
              img_0: "img",
            },
            tags: {
              group: {
                template: "group",
              },
            },
            nodes: orgnogramData,
          });
        } catch (err) {
          console.error("Failed to initialize OrgChart:", err);
        }
      } else {
        console.error("Element with id 'tree' not found.");
      }
    };

    script.onerror = () => {
      console.error("Failed to load OrgChart script.");
    };

    document.body.appendChild(script);

    return () => {
      if (chart) {
        chart.destroy();
      }
      document.body.removeChild(script);
    };
  }, [orgnogramData]);

  return (
    <div>
      <div
        id="tree"
        className="border bg-base-100"
        style={{ width: "100%", height: "600px" }}
      ></div>
    </div>
  );
};

export default MyOrgChart;
