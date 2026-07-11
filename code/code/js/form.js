const modal = document.getElementById("formModal");

const openBtn = document.getElementById("openFormBtn");

const formFields = document.getElementById("formFields");

const reportForm = document.getElementById("reportForm");
const closeBtn = document.getElementById("closeFormBtn");
const resetBtn = document.getElementById("resetFormBtn");

// =====================
// 打开弹窗
// =====================

openBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

// =====================
// 关闭弹窗
// =====================

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

// =====================
// 重置表单
// =====================

resetBtn.addEventListener("click", () => {
  reportForm.reset();
});

// =====================
// 表单配置
// =====================

const fields = [
  {
    label: "章节",
    id: "chapter",
  },

  {
    label: "学号",
    id: "studentId",
  },

  {
    label: "起始层级",
    id: "startLevel",
  },

  {
    label: "最终层级",
    id: "endLevel",
  },

  {
    label: "练习题数",
    id: "questionCount",
  },

  {
    label: "最终得分",
    id: "finalScore",
  },

  {
    label: "AI错题诊断",
    id: "diagnosis",
    textarea: true,
  },

  {
    label: "概念辨析(0-100)",
    id: "concept",
  },

  {
    label: "模型构建(0-100)",
    id: "model",
  },

  {
    label: "计算执行(0-100)",
    id: "calculate",
  },

  {
    label: "推理证明(0-100)",
    id: "reason",
  },

  {
    label: "小组案例",
    id: "case",
  },

  {
    label: "小组编号",
    id: "groupNumber",
  },

  {
    label: "你的分工",
    id: "task",
  },

  {
    label: "AI智能评价得分",
    id: "aiScore",
  },

  {
    label: "概念正确性星级(1-5)",
    id: "star1Value",
  },

  {
    label: "代码正确性星级(1-5)",
    id: "star2Value",
  },

  {
    label: "案例完整性星级(1-5)",
    id: "star3Value",
  },

  {
    label: "创新与实用价值星级(1-5)",
    id: "star4Value",
  },

  {
    label: "思政词云(空格分隔)",
    id: "wordCloud",
  },

  {
    label: "AI评语",
    id: "comment",
    textarea: true,
  },

  {
    label: "组内互评得分",
    id: "groupScore",
  },

  {
    label: "任务贡献度(1-5)",
    id: "group1",
  },

  {
    label: "协作沟通能力(1-5)",
    id: "group2",
  },

  {
    label: "创新引领力(1-5)",
    id: "group3",
  },

  {
    label: "可靠与诚信度(1-5)",
    id: "group4",
  },

  {
    label: "组间互评得分",
    id: "componentScore",
  },

  {
    label: "知识关联度(1-5)",
    id: "component1",
  },

  {
    label: "问题考虑完整性(1-5)",
    id: "component2",
  },

  {
    label: "代码质量(1-5)",
    id: "component3",
  },

  {
    label: "创新与优化(1-5)",
    id: "component4",
  },

  {
    label: "教师评价得分",
    id: "teacherScore",
  },

  {
    label: "思政内涵(1-5)",
    id: "teacher1",
  },

  {
    label: "科技前沿(1-5)",
    id: "teacher2",
  },

  {
    label: "案例完成度(1-5)",
    id: "teacher3",
  },

  {
    label: "数学建模(1-5)",
    id: "teacher4",
  },

  {
    label: "模拟仿真(1-5)",
    id: "teacher5",
  },

  {
    label: "教师评语与建议",
    id: "teacherComment",
    textarea: true,
  },
];

// =====================
// 生成表单
// =====================

let html = '<div class="form-grid">';

fields.forEach((item) => {
  html += `
        <div class="form-item">
            <label>${item.label}</label>

            ${
              item.textarea
                ? `<textarea id="${item.id}"></textarea>`
                : `<input id="${item.id}" />`
            }

        </div>
    `;
});

html += "</div>";

formFields.innerHTML = html;

// =====================
// 提交
// =====================

reportForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const getValue = (id) => document.getElementById(id).value;

  // =====================
  // 顶部
  // =====================

  document.getElementById("chapterText").textContent = getValue("chapter");

  document.getElementById("studentIdText").textContent = getValue("studentId");

  // =====================
  // 模块1
  // =====================

  document.getElementById("startLevelText").textContent =
    getValue("startLevel");

  document.getElementById("endLevelText").textContent = getValue("endLevel");

  document.getElementById("questionCountText").textContent =
    getValue("questionCount");

  document.getElementById("finalScoreText").textContent =
    getValue("finalScore");

  document.getElementById("diagnosisText").textContent = getValue("diagnosis");

  document.getElementById("conceptText").textContent = getValue("concept");

  document.getElementById("modelText").textContent = getValue("model");

  document.getElementById("calculateText").textContent = getValue("calculate");

  document.getElementById("reasonText").textContent = getValue("reason");

  updateRadarChart(
    Number(getValue("concept")),

    Number(getValue("model")),

    Number(getValue("calculate")),

    Number(getValue("reason")),
  );

  // =====================
  // 模块2
  // =====================

  document.getElementById("caseText").textContent = getValue("case");
  document.getElementById("groupNumberText").textContent =
    getValue("groupNumber");
  document.getElementById("taskText").textContent = getValue("task");

  document.getElementById("aiScoreText").textContent = getValue("aiScore");

  document.getElementById("star1").innerHTML = buildStars(
    Number(getValue("star1Value")),
  );

  document.getElementById("star2").innerHTML = buildStars(
    Number(getValue("star2Value")),
  );

  document.getElementById("star3").innerHTML = buildStars(
    Number(getValue("star3Value")),
  );

  document.getElementById("star4").innerHTML = buildStars(
    Number(getValue("star4Value")),
  );

  // =====================
  // 词云
  // =====================

  const words = getValue("wordCloud")
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean);

  updateWordCloud(words);

  // =====================
  // AI评语
  // =====================

  document.getElementById("commentText").textContent = getValue("comment");

  // =====================
  // 组内互评
  // =====================

  document.getElementById("groupScoreText").textContent =
    getValue("groupScore");

  updateGroupChart([
    Number(getValue("group1")),

    Number(getValue("group2")),

    Number(getValue("group3")),

    Number(getValue("group4")),
  ]);

  // =====================
  // 组间互评
  // =====================

  document.getElementById("componentScoreText").textContent =
    getValue("componentScore");

  updateComponentChart([
    Number(getValue("component1")),

    Number(getValue("component2")),

    Number(getValue("component3")),

    Number(getValue("component4")),
  ]);

  // =====================
  // 教师评价
  // =====================

  document.getElementById("teacherScoreText").textContent =
    getValue("teacherScore");

  updateTeacherChart([
    Number(getValue("teacher1")),

    Number(getValue("teacher2")),

    Number(getValue("teacher3")),

    Number(getValue("teacher4")),

    Number(getValue("teacher5")),
  ]);

  document.getElementById("teacherCommentText").textContent =
    getValue("teacherComment");

  // =====================
  // 关闭弹窗
  // =====================

  modal.classList.remove("show");
});
