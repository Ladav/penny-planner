// TODO: Improve tooltip and bar radius and color and fonts
import React, { useRef, useEffect, useCallback } from "react";
import * as echarts from "echarts/core";
import { BarChart as EBarChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import {
  ChartElement,
  SVGRenderer,
  SvgChart,
} from "@wuba/react-native-echarts";
import { Dimensions } from "react-native";
import { themesColors } from "@/utils/color-theme.utils";

echarts.use([SVGRenderer, EBarChart, GridComponent, TooltipComponent]);

const CHART_WIDTH = Dimensions.get("screen").width; // Default with the phone screen width
const CHART_HEIGHT = 400;

export interface StackedBarChartProps {
  width?: number;
  height?: number;
  isLoading?: boolean;
  error?: string | null;
  data?: Array<{
    x: string;
    y1: number;
    y2: number;
  }>;
}

export default function StackedBarChart({
  width = CHART_WIDTH,
  height = CHART_HEIGHT,
  isLoading,
  error,
  data,
}: StackedBarChartProps) {
  const skiaRef = useRef<ChartElement | any>(null);

  const showChartLoading = useCallback((chart: echarts.EChartsType) => {
    chart.showLoading("default", {
      text: "Loading...",
      maskColor: themesColors.dark["color-primary-light"],
      textColor: themesColors.dark["color-secondary-default"],
      color: themesColors.dark["color-secondary-default"],
      fontSize: 14,
    });
  }, []);

  const hideChartLoading = useCallback((chart: echarts.EChartsType) => {
    chart.hideLoading();
  }, []);

  const getOptions = useCallback((data: StackedBarChartProps["data"]) => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross" },
      },
      xAxis: {
        type: "category",
        data: data?.map((item) => item.x),
        axisLabel: {
          rotate: 30,
          formatter: (value: string) =>
            String(value).slice(0, 15) + (value.length > 15 ? "..." : ""),
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          strockColor: themesColors.dark["color-secondary-light"],
        },
        axisLabel: {
          formatter: "₹ {value}",
        },
      },
      series: [
        {
          data: data?.map((item) => item.y1),
          type: "bar",
          stack: "y",
          itemStyle: {
            normal: {
              color: themesColors.dark["color-secondary-default"],
              barBorderRadius: {
                top: 5,
              },
            },
            emphasis: {
              color: themesColors.dark["color-tertiary-light"],
              barBorderRadius: {
                top: 5,
              },
            },
          },
        },
        {
          data: data?.map((item) => item.y2),
          type: "bar",
          stack: "y",
          itemStyle: {
            normal: {
              color: themesColors.dark["color-tertiary-default"],
              barBorderRadius: {
                top: 5,
              },
            },
            emphasis: {
              color: themesColors.dark["color-tertiary-light"],
              barBorderRadius: {
                top: 5,
              },
            },
          },
        },
      ],
      backgroundColor: themesColors.dark["color-primary-light"],
      grid: {
        left: 16,
        containLabel: true,
        bottom: 16,
        top: 26,
        right: 46,
      },
    };
  }, []);

  useEffect(() => {
    let chart: echarts.EChartsType;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, "dark", {
        renderer: "svg",
        width,
        height,
      });
      if (isLoading === true) {
        showChartLoading(chart);
      }
      if (!isLoading && error) {
        hideChartLoading(chart);
      }
      chart.setOption(getOptions(data));
    }
    return () => chart?.dispose();
  }, [isLoading, data]);

  return <SvgChart ref={skiaRef} />;
}
