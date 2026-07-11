// =====================
// 图表实例
// =====================

let radarChart;
let wordCloudChart;
let groupChart;
let componentChart;
let teacherChart;

// =====================
// 初始化
// =====================

window.addEventListener("load", () => {
  radarChart = echarts.init(document.getElementById("radarChart"));

  wordCloudChart = echarts.init(document.getElementById("wordCloudChart"));

  groupChart = echarts.init(document.getElementById("groupChart"));

  componentChart = echarts.init(document.getElementById("componentChart"));

  teacherChart = echarts.init(document.getElementById("teacherChart"));

  renderDefaultCharts();

  window.addEventListener("resize", () => {
    radarChart.resize();
    wordCloudChart.resize();
    groupChart.resize();
    componentChart.resize();
    teacherChart.resize();
    discussWordCloud.resize();
  });
});

// =====================
// 默认图
// =====================

function renderDefaultCharts() {
  updateRadarChart(0, 0, 0, 0);

  updateWordCloud(["待填写"]);

  updateGroupChart([0, 0, 0, 0]);

  updateComponentChart([0, 0, 0, 0]);

  updateTeacherChart([0, 0, 0, 0, 0]);
}

// =====================
// 雷达图
// =====================

function updateRadarChart(concept, model, calculate, reason) {
  radarChart.setOption({
    animation: false,

    radar: {
      radius: "70%",

      indicator: [
        { name: "概念辨析", max: 100 },
        { name: "模型构建", max: 100 },
        { name: "计算执行", max: 100 },
        { name: "推理证明", max: 100 },
      ],
    },

    series: [
      {
        type: "radar",

        data: [
          {
            value: [concept, model, calculate, reason],
          },
        ],
      },
    ],
  });
}

// =====================
// 词云
// =====================

function updateWordCloud(words) {
  const data = words.map((item) => {
    return {
      name: item,
      value: Math.floor(Math.random() * 100) + 20,
    };
  });

  wordCloudChart.setOption({
    animation: false,

    series: [
      {
        type: "wordCloud",

        shape: "circle",

        width: "100%",
        height: "100%",

        sizeRange: [14, 42],

        rotationRange: [0, 0],

        data: data,
      },
    ],
  });
}

// =====================
// 组内互评
// =====================

function updateGroupChart(data) {
  groupChart.setOption({
    animation: false,

    grid: {
      left: 40,
      right: 10,
      top: 20,
      bottom: 40,
    },

    xAxis: {
      type: "category",

      axisLabel: {
        interval: 0,
        fontSize: 10,
      },

      data: ["任务贡献度", "协作沟通能力", "创新引领力", "可靠与诚信度"],
    },

    yAxis: {
      type: "value",
      min: 0,
      max: 5,
      interval: 1,
    },

    series: [
      {
        type: "bar",
        data: data,
      },
    ],
  });
}

// =====================
// 组间互评
// =====================

function updateComponentChart(data) {
  componentChart.setOption({
    animation: false,

    grid: {
      left: 40,
      right: 10,
      top: 20,
      bottom: 40,
    },

    xAxis: {
      type: "category",

      axisLabel: {
        interval: 0,
        fontSize: 10,
      },

      data: ["知识关联度", "问题完整性", "代码质量", "创新优化"],
    },

    yAxis: {
      type: "value",
      min: 0,
      max: 5,
      interval: 1,
    },

    series: [
      {
        type: "bar",
        data: data,
      },
    ],
  });
}

// =====================
// 教师评价
// =====================

function updateTeacherChart(data) {
  teacherChart.setOption({
    animation: false,

    grid: {
      left: 90,
      right: 30,
      top: 20,
      bottom: 20,
    },

    xAxis: {
      type: "value",
      min: 0,
      max: 5,
      interval: 1,
    },

    yAxis: {
      type: "category",

      data: ["思政内涵", "科技前沿", "案例完成度", "数学建模", "模拟仿真"],
    },

    series: [
      {
        type: "bar",
        data: data,
      },
    ],
  });
}

// =====================
// 星星
// =====================

function buildStars(count) {
  let html = "";

  for (let i = 0; i < count; i++) {
    html += '<span class="star">★</span>';
  }

  return html;
}
