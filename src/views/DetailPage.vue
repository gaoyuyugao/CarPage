<template>
  <div style="background-color: whitesmoke">
    <header class="header">
      <button class="back-button" @click="goBack">
        <span class="back-arrow">&lt;</span> {{ plateNumber }}
      </button>
    </header>

    <div class="tabs">
      <div :class="[activeTab === '紧急' ? 'emergency-button-active' : '']">
        <button :class="[ 'emergency-button']" @click="setTab('紧急')">
          紧急 ({{ emergencyCount }})
        </button>
      </div>
      <div :class="[activeTab === '警示' ? 'warning-button-active' : '']">
        <button :class="[ 'warning-button']" @click="setTab('警示')">
          警示 ({{ warningCount }})
        </button>
      </div>
      <div :class="[activeTab === '全部' ? 'all-button-active' : '']">
        <button :class="[ 'all-button']" @click="setTab('全部')">
          全部 ({{ fullList.length }})
        </button>
      </div>
    </div>

    <div class="horizontal-tags">
      <div
        v-for="item in filteredList"
        :key="item.id"
        class="tag-item"
        :class="{ selected: selectedItem && selectedItem.id === item.id }"
        @click="selectItem(item)">
          <img :src="`/src/assets/partLogo/${item.title}图标.png`" alt="" class="icon-image" />
          <span class="tag-icon">{{ item.title }}</span>
      </div>
        <!-- 显示选中的标签名称 -->
      <div v-if="selectedItem" class="selected-item-title">
        {{ selectedItem.title }}
      </div>
    </div>
    

    <!-- 分析数据部分 -->
    <div v-if="selectedItem" class="analysis-data">
      <!-- <h3>{{ selectedItem.title }}</h3> -->
      <div class="detail-box" v-for="content in analysisContents" :key="content.id">
        <h4>{{ content.header }}</h4>
        <div v-html="content.body"></div>
        <!-- <p>{{ content.body }}</p> -->
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref,  computed,onMounted ,inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const axios = inject('$axios');
const router = useRouter();
const route = useRoute();

// 页面状态变量
// 接收传递的 props: id 和 type
const props = defineProps(['id', 'type']);
const plateNumber = ref('粤BG57591');
const activeTab = ref(props.type);
const selectedItem = ref(null);
const analysisContents = ref([]);
const fullList = ref([]);

// 模拟数据列表
// const fullList = ref([
//   { id: 1, type: '紧急', title: "空滤芯", description: "空滤芯描述..." },
//   { id: 2, type: '紧急', title: "机油", description: "机油描述..." },
//   { id: 3, type: '警示', title: "刹车盘", description: "刹车盘描述..." },
//   { id: 4, type: '普通', title: "轮胎", description: "轮胎描述..." },
//   { id: 5, type: '普通', title: "皮带", description: "皮带描述..." },
// ]);

// 获取项目列表信息
async function fetchInspectionInfo() {
  try {
    const dossierId = 263; // 设定 dossierId 为固定值或根据实际情况传入
    const response = await axios.get(`/info/DossierId/${dossierId}`);
    fullList.value = response.data.map(item => ({
      id: item.carInspectionInfo_id,
      type: item.riskStatus === 0 ? '紧急' : item.riskStatus === 1 ? '警示' : '普通',
      title: item.inspectionType
    }));

    // 加载点击的项目的详细内容
    const itemId = parseInt(route.params.id);
    loadAnalysisData(itemId);
  } catch (error) {
    console.error("Error fetching inspection info:", error);
  }
}
// 加载项目的分析数据
async function loadAnalysisData(itemId) {
  try {
    const response = await axios.get(`/record/InspectionId/${itemId}`);
    const data = response.data;
    selectedItem.value = fullList.value.find(item => item.id === itemId);
    if (selectedItem.value) {
    analysisContents.value = [
        { header: "车间检查", body: data.workshopInspection || "暂无数据" },
        { header: "功能作用", body: data.functionDescription || "暂无数据" },
        { header: "参考标准", body: data.referenceStandard || "暂无数据" },
    ];

    // 使用 carInspectionInfoId 获取检测影像数据
    const carInspectionInfoId = data.carInspectionInfoId;
    const imageResponse = await axios.get(`/record/carInspectionInfo_id/${carInspectionInfoId}`);

    // 提取 imageData 和 imageContentType
    const imageData = imageResponse.data[0].imageData;
    const imageContentType = imageResponse.data[0].imageContentType;

    // 将检测影像以 `data URL` 的格式存储
    const inspectionImageUrl = `data:${imageContentType};base64,${imageData}`;
    analysisContents.value.push({ header: "检测影像", body: `<img src="${inspectionImageUrl}" alt="影像" style="width: 350px; height: 350px;" />` });

    // 按顺序添加剩余的内容
    analysisContents.value.push(
        { header: "检测信息", body: data.aiDetectionResult },
        { header: "诊断方案", body: data.aiDiagnosis },
        { header: "风险提醒", body: data.aiRiskAssessment }
    );
}
  } catch (error) {
    console.error("Error loading analysis data:", error);
    analysisContents.value = [
      { header: "车间检查", body: "暂无数据" },
      { header: "功能作用", body: "暂无数据" },
      { header: "参考标准", body: "暂无数据" },
      { header: "检测影像", body: "暂无数据" },
      { header: "检测信息", body: "暂无数据" },
      { header: "诊断方案", body: "暂无数据" },
      { header: "风险提醒", body: "暂无数据" },
    ];
  }
}

onMounted(fetchInspectionInfo);
// 根据传递的 ID 加载点击的项目数据
// onMounted(() => {
//   const itemId = parseInt(route.params.id);
//   selectedItem.value = fullList.value.find(item => item.id === itemId); // 根据 ID 查找项目
//   if (selectedItem.value) {
//     activeTab.value = props.type; // 设置 activeTab 为传递的类型
//     loadAnalysisData(selectedItem.value.id); // 加载分析数据
//   }
// });

// 切换选项卡时不影响下方分析数据
function setTab(tab) {
  activeTab.value = tab;
  // 每次切换标签时，确保清空 selectedItem，触发数据刷新
  selectedItem.value = null;

  // 切换标签后加载第一个符合条件的项目的内容
  if (filteredList.value.length > 0) {
    selectItem(filteredList.value[0]); // 默认选择第一个项目
  }
}

// 点击选项时更新分析数据
function selectItem(item) {
  selectedItem.value = item;
  loadAnalysisData(item.id);
}


// 过滤后的列表
const filteredList = computed(() => {
  if (activeTab.value === '全部') return fullList.value;
  const result = fullList.value.filter(item => item.type === activeTab.value);
  console.log(`当前标签: ${activeTab.value}, 筛选结果:`, result);
  return result;
});


// 紧急和警示项目的数量
const emergencyCount = computed(() => fullList.value.filter(item => item.type === '紧急').length);
const warningCount = computed(() => fullList.value.filter(item => item.type === '警示').length);

// 模拟加载分析数据
// const analysisContents = ref([]);
// function loadAnalysisData(itemId) {
//   if (itemId === 1) {
//     analysisContents.value = [
//       { id: 1, header: "车间检查", body: "空滤芯检查详情..." },
//       { id: 2, header: "功能作用", body: "空滤芯的功能描述..." },
//     ];
//   } else if (itemId === 2) {
//     analysisContents.value = [
//       { id: 1, header: "车间检查", body: "机油检查详情..." },
//       { id: 2, header: "检测影像", body: "旧机油滤芯影像..." },
//     ];
//   }
// }

// 返回按钮功能
function goBack() {
  router.push({ name: 'MainPage' });
}
</script>

<style scoped>

.header {
  display: flex;
  align-items: center;
}

.back-button {
  color: black;
  background: none;
  border: none;
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
}

.back-arrow {
  margin-right: 0.3rem;
}

.tabs {
  border-radius: 15px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.tabs button {
  background: none;
  border: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.tabs .active {
  color: red;
  border-bottom: 2px solid red;
}

/* 水平标签项的样式 */
.horizontal-tags {
  position: relative; /* 让子元素的绝对定位以此为参考 */
  margin-top: 1rem;
  background-color: white;
  overflow-y: hidden; /* 禁止垂直滚动 */
  display: flex;
  overflow-x: auto; /* 允许水平滚动 */
  white-space: nowrap; /* 阻止换行 */
  padding: 1rem 0;
  gap: 1rem; /* 标签间的间距 */
  height: 130px; /* 根据图标大小调整合适的高度 */

}
/* 隐藏默认滚动条 */
.horizontal-tags::-webkit-scrollbar {
  height: 8px; /* 设置滚动条高度 */
  background: transparent; /* 默认背景为透明 */
}

/* 悬停时显示滚动条背景 */
.horizontal-tags:hover::-webkit-scrollbar {
  background: #e0e0e0; /* 滚动条背景色 */
}

/* 滚动条滑块样式 */
.horizontal-tags::-webkit-scrollbar-thumb {

  border-radius: 4px;
}

.horizontal-tags:hover::-webkit-scrollbar-thumb {
  background: #555; /* 悬停时滑块颜色 */
}
.tag-item {
  cursor: pointer;
  text-align: center;
  font-size: 0.9rem;
  color: #333;
  flex-shrink: 0; /* 防止标签缩小 */
}

.icon-image {
  margin: 5px;
  width: 40px; /* 控制图标大小 */
  height: 40px; /* 确保图标是方形的 */
  display: block; /* 独立一行 */
  margin-left: auto;
  margin-right: auto;
}

.tag-item {
  text-align: center;
  font-size: 0.9rem;
  color: #333;
  flex-shrink: 0;
}
.selected .tag-icon {
  color: blue; /* 选中项的标签字体变为蓝色 */
}
.selected-item-title {
  position: absolute; /* 绝对定位 */
  bottom: -1px; /* 调整到 horizontal-tags 的底部以下 */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 使居中对齐 */
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
}
/* 内容区样式 */
.content {
  margin-top: 1rem;
}

/* 修改分析数据区域，增加滚动效果 */
.analysis-data {
  margin-top: 1.5rem;
  max-height: 300px; /* 设置分析数据的最大高度，确保可以滚动 */
  overflow-y: auto;
}

.issue-item {
  cursor: pointer;
  margin-bottom: 1rem;
}

.detail-box {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 紧急按钮样式 */
.emergency-button {
  background-color: red;
  color: red;
}
.emergency-button-active{
  border-bottom: 2px solid red;
}

/* 警示按钮样式 */
.warning-button {
  background-color: sandybrown;
  color: sandybrown;
}
.warning-button-active {
  border-bottom: 2px solid sandybrown;
}

/* 全部按钮样式 */
.all-button {
  background-color: blue;
  color: blue;
}
.all-button-active {
  border-bottom: 2px solid blue;
}
</style>

