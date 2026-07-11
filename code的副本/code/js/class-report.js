// =========================
// DOM
// =========================

const modal = document.getElementById("formModal");
const openBtn = document.getElementById("openFormBtn");
const closeBtn = document.getElementById("closeModal");
const resetBtn = document.getElementById("resetFormBtn");

const formFields = document.getElementById("formFields");
const reportForm = document.getElementById("reportForm");

openBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

resetBtn.addEventListener("click", () => {
  reportForm.reset();
});

// =========================
// 表单字段
// =========================

const fields = [
  // 顶部

  { label: "章节", id: "chapter" },
  { label: "班级", id: "className" },
  { label: "班级人数", id: "classCount" },
  { label: "完成人数", id: "finishCount" },
  { label: "完成率", id: "finishRate" },

  // L1

  { label: "L1人数", id: "l1Count" },
  { label: "L1百分比", id: "l1Percent" },

  { label: "L2人数", id: "l2Count" },
  { label: "L2百分比", id: "l2Percent" },

  { label: "L3人数", id: "l3Count" },
  { label: "L3百分比", id: "l3Percent" },

  // 知识能力雷达图

  { label: "概念辨析(0-100)", id: "concept" },
  { label: "模型构建(0-100)", id: "model" },
  { label: "计算执行(0-100)", id: "calculate" },
  { label: "推理证明(0-100)", id: "reason" },

  // Top3
  { label: "慕课观看完成人数", id: "moocCount" },

  { label: "薄弱点1", id: "weak1" },
  { label: "薄弱点1错误率", id: "weak1Rate" },

  { label: "薄弱点2", id: "weak2" },
  { label: "薄弱点2错误率", id: "weak2Rate" },

  { label: "薄弱点3", id: "weak3" },
  { label: "薄弱点3错误率", id: "weak3Rate" },

  {
    label: "讨论区词云关键词（空格分隔）",
    id: "discussWords",
    textarea: true,
  },

  // 小组

  { label: "小组1名称", id: "group1Name" },
  { label: "小组1AI", id: "group1Ai" },
  { label: "小组1组间", id: "group1Peer" },
  { label: "小组1教师", id: "group1Teacher" },
  { label: "小组1整合均分", id: "group1Final" },

  { label: "小组2名称", id: "group2Name" },
  { label: "小组2AI", id: "group2Ai" },
  { label: "小组2组间", id: "group2Peer" },
  { label: "小组2教师", id: "group2Teacher" },
  { label: "小组2整合均分", id: "group2Final" },

  { label: "小组3名称", id: "group3Name" },
  { label: "小组3AI", id: "group3Ai" },
  { label: "小组3组间", id: "group3Peer" },
  { label: "小组3教师", id: "group3Teacher" },
  { label: "小组3整合均分", id: "group3Final" },

  { label: "小组4名称", id: "group4Name" },
  { label: "小组4AI", id: "group4Ai" },
  { label: "小组4组间", id: "group4Peer" },
  { label: "小组4教师", id: "group4Teacher" },
  { label: "小组4整合均分", id: "group4Final" },

  // 能力维度雷达图

  { label: "建模能力(0-100)", id: "build" },
  { label: "创新能力(0-100)", id: "innovation" },
  { label: "实践能力(0-100)", id: "practice" },
  { label: "反思能力(0-100)", id: "reflect" },

  // 思想素养

  { label: "科学精神(1-5)", id: "quality1" },
  { label: "社会责任与国家情怀(1-5)", id: "quality2" },
  { label: "辩证思维(1-5)", id: "quality3" },
  { label: "协作诚信(1-5)", id: "quality4" },

  {
    label: "案例报告思政点关键词（空格分隔）",
    id: "caseWords",
    textarea: true,
  },

  {
    label: "AI评价",
    id: "qualityTextInput",
    textarea: true,
  },

  {
    label: "教学建议",
    id: "advice",
    textarea: true,
  },
];

// =========================
// 自动生成表单
// =========================

let html = '<div class="form-grid">';

fields.forEach((item) => {
  html += `
        <div class="form-item">

            <label>${item.label}</label>

            ${
              item.textarea
                ? `<textarea id="${item.id}"></textarea>`
                : `<input id="${item.id}">`
            }

        </div>
    `;
});

html += "</div>";

formFields.innerHTML = html;

// =========================
// 图表
// =========================

let knowledgeRadar;
let abilityRadar;
let qualityChart;
let discussWordCloud;
let caseWordCloud;

window.addEventListener("load", () => {
  knowledgeRadar = echarts.init(document.getElementById("knowledgeRadar"));

  abilityRadar = echarts.init(document.getElementById("abilityRadar"));

  qualityChart = echarts.init(document.getElementById("qualityChart"));

  discussWordCloud = echarts.init(document.getElementById("discussWordCloud"));

  caseWordCloud = echarts.init(document.getElementById("caseWordCloud"));

  renderDefaultCharts();
});

function renderDefaultCharts() {
  updateKnowledgeRadar([0, 0, 0, 0]);

  updateAbilityRadar([0, 0, 0, 0]);

  updateQualityChart([0, 0, 0, 0]);

  updateDiscussWordCloud(["等待数据"]);

  updateCaseWordCloud(["等待数据"]);
}

// =========================
// 雷达图1
// =========================

function updateKnowledgeRadar(data) {
  knowledgeRadar.setOption({
    radar: {
      indicator: [
        { name: `概念辨析(${data[0]}/100)`, max: 100 },
        { name: `模型构建(${data[1]}/100)`, max: 100 },
        { name: `计算执行(${data[2]}/100)`, max: 100 },
        { name: `推理证明(${data[3]}/100)`, max: 100 },
      ],
    },
    series: [
      {
        type: "radar",
        data: [{ value: data }],
      },
    ],
  });
}

// =========================
// 雷达图2
// =========================

function updateAbilityRadar(data) {
  abilityRadar.setOption({
    radar: {
      indicator: [
        { name: `建模能力(${data[0]}/100)`, max: 100 },
        { name: `创新能力(${data[1]}/100)`, max: 100 },
        { name: `实践能力(${data[2]}/100)`, max: 100 },
        { name: `反思能力(${data[3]}/100)`, max: 100 },
      ],
    },
    series: [
      {
        type: "radar",
        data: [{ value: data }],
      },
    ],
  });
}

// =========================
// 横向条形图
// =========================

function updateQualityChart(data) {
  qualityChart.setOption({
    grid: {
      left: 120,
      right: 20,
      top: 20,
      bottom: 20,
    },

    xAxis: {
      type: "value",
      min: 0,
      max: 5,
    },

    yAxis: {
      type: "category",
      data: ["科学精神", "社会责任与国家情怀", "辩证思维", "协作诚信"],
    },

    series: [
      {
        type: "bar",
        data: data,
      },
    ],
  });
}

// =========================
// 工具
// =========================

function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value : "-";
}

// =========================
// 小组上传信息
// =========================

function updateUploadCards() {
  for (let i = 1; i <= 4; i++) {
    const groupName = getValue(`group${i}Name`);
    document.getElementById(`group${i}NameTitle`).textContent = groupName;
    document.getElementById(`group${i}AiText`).textContent = getValue(
      `group${i}Ai`,
    );
    document.getElementById(`group${i}PeerText`).textContent = getValue(
      `group${i}Peer`,
    );
    document.getElementById(`group${i}TeacherText`).textContent = getValue(
      `group${i}Teacher`,
    );
    document.getElementById(`group${i}FinalText`).textContent = getValue(
      `group${i}Final`,
    );
  }
}

// =========================
// 讨论区词云
// =========================

function updateDiscussWordCloud(words) {
  // 将传入的关键词数组转换为词云数据格式
  const data = words.map((item) => {
    // 如果传入的是字符串，随机生成权重
    if (typeof item === "string") {
      return {
        name: item,
        value: Math.floor(Math.random() * 100) + 20,
      };
    }
    // 如果传入的是对象（包含name和value），直接使用
    return item;
  });

  discussWordCloud.setOption({
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

function updateCaseWordCloud(words) {
  const data = words.map((item) => {
    if (typeof item === "string") {
      return {
        name: item,
        value: Math.floor(Math.random() * 100) + 20,
      };
    }

    return item;
  });

  caseWordCloud.setOption({
    series: [
      {
        type: "wordCloud",
        shape: "circle",
        width: "100%",
        height: "100%",
        sizeRange: [14, 42],
        rotationRange: [0, 0],
        data,
      },
    ],
  });
}

// =========================
// 提交
// =========================

reportForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // 顶部

  chapterText.textContent = getValue("chapter");

  classNameText.textContent = getValue("className");

  classCountText.textContent = getValue("classCount");

  finishCountText.textContent = getValue("finishCount");

  finishRateText.textContent = getValue("finishRate") + "%";

  // L1 L2 L3

  l1Text.textContent = `${getValue("l1Count")}人 ${getValue("l1Percent")}%`;

  l2Text.textContent = `${getValue("l2Count")}人 ${getValue("l2Percent")}%`;

  l3Text.textContent = `${getValue("l3Count")}人 ${getValue("l3Percent")}%`;

  l1Bar.style.width = getValue("l1Percent") + "%";

  l2Bar.style.width = getValue("l2Percent") + "%";

  l3Bar.style.width = getValue("l3Percent") + "%";

  updateKnowledgeRadar([
    Number(getValue("concept")),
    Number(getValue("model")),
    Number(getValue("calculate")),
    Number(getValue("reason")),
  ]);

  // Top3

  moocCountText.textContent = getValue("moocCount");

  weak1Text.textContent = `${getValue("weak1")}（${getValue("weak1Rate")}%答错）`;

  weak2Text.textContent = `${getValue("weak2")}（${getValue("weak2Rate")}%答错）`;

  weak3Text.textContent = `${getValue("weak3")}（${getValue("weak3Rate")}%答错）`;

  const discussWordsStr = getValue("discussWords");
  const discussWordsArray = discussWordsStr
    ? discussWordsStr
        .split(/[,\s]+/) // 同时支持逗号和空格分隔
        .map((w) => w.trim())
        .filter((w) => w)
    : ["无数据"];
  updateDiscussWordCloud(discussWordsArray);

  // 小组

  updateUploadCards();

  updateAbilityRadar([
    Number(getValue("build")),
    Number(getValue("innovation")),
    Number(getValue("practice")),
    Number(getValue("reflect")),
  ]);

  // 思想与素养

  updateQualityChart([
    Number(getValue("quality1")),
    Number(getValue("quality2")),
    Number(getValue("quality3")),
    Number(getValue("quality4")),
  ]);

  const caseWordsStr = getValue("caseWords");

  const caseWordsArray = caseWordsStr
    ? caseWordsStr
        .split(/[,\s]+/)
        .map((w) => w.trim())
        .filter((w) => w)
    : ["无数据"];

  updateCaseWordCloud(caseWordsArray);

  document.getElementById("qualityText").textContent =
    getValue("qualityTextInput");

  // 教学建议

  document.getElementById("adviceText").textContent = getValue("advice");

  modal.classList.remove("show");
});
