import React, { useEffect } from "react";
import { staffOrgnogram } from "../types";

interface MyOrgChartProp {
  orgnogramData: staffOrgnogram[];
}

const MyOrgChart = ({ orgnogramData }: MyOrgChartProp) => {
  useEffect(() => {
    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;

        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

        document.body.appendChild(script);
      });

    let chart: OrgChart | null = null;

    loadScript("../BALKAN_OrgChartJS/orgchart.js")
      .then(() => {
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
            treeElement.innerHTML = "Failed to load organization chart.";
          }
        } else {
          console.error("Element with id 'tree' not found.");
        }
      })
      .catch((err) => console.error(err));

    return () => {
      if (chart) {
        chart.destroy();
      }
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
