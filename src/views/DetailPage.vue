<template>
  <div>
    <header class="header">
      <button class="back-button" @click="goBack">
        <span class="back-arrow">&lt;</span> {{ plateNumber }}
      </button>
    </header>

    <div class="tabs">
      <button :class="{ active: activeTab === '紧急' }" @click="setTab('紧急')">
        紧急 ({{ emergencyCount }})
      </button>
      <button :class="{ active: activeTab === '警示' }" @click="setTab('警示')">
        警示 ({{ warningCount }})
      </button>
      <button :class="{ active: activeTab === '全部' }" @click="setTab('全部')">
        全部 ({{ fullList.length }})
      </button>
    </div>

    <div class="content">
      <div v-for="item in filteredList" :key="item.id" class="issue-item" @click="selectItem(item)">
        <span class="icon">{{ item.title }}</span>
      </div>
    </div>

    <!-- 分析数据部分 -->
    <div v-if="selectedItem" class="analysis-data">
      <h3>{{ selectedItem.title }}</h3>
      <div class="detail-box" v-for="content in analysisContents" :key="content.id">
        <h4>{{ content.header }}</h4>
        <p>{{ content.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 页面状态变量
// 接收传递的 props: id 和 type
const props = defineProps(['id', 'type']);
const plateNumber = ref('粤BG57591');
const activeTab = ref(props.type); 
const selectedItem = ref(null);

// 模拟数据列表
const fullList = ref([
  { id: 1, type: '紧急', title: "空滤芯", description: "空滤芯描述..." },
  { id: 2, type: '紧急', title: "机油", description: "机油描述..." },
  { id: 3, type: '警示', title: "刹车盘", description: "刹车盘描述..." },
  { id: 4, type: '普通', title: "轮胎", description: "轮胎描述..." },
  { id: 5, type: '普通', title: "皮带", description: "皮带描述..." },
]);

// 根据传递的 ID 加载点击的项目数据
onMounted(() => {
  const itemId = parseInt(route.params.id);
  selectedItem.value = fullList.value.find(item => item.id === itemId); // 根据 ID 查找项目
  if (selectedItem.value) {
    activeTab.value = props.type; // 设置 activeTab 为传递的类型
    loadAnalysisData(selectedItem.value.id); // 加载分析数据
  }
});

// 切换选项卡时不影响下方分析数据
function setTab(tab) {
  activeTab.value = tab;
}

// 点击选项时更新分析数据
function selectItem(item) {
  selectedItem.value = item;
  loadAnalysisData(item.id);
}

// 过滤后的列表
const filteredList = computed(() => {
  if (activeTab.value === '全部') return fullList.value;
  return fullList.value.filter(item => item.type === activeTab.value);
});

// 紧急和警示项目的数量
const emergencyCount = computed(() => fullList.value.filter(item => item.type === '紧急').length);
const warningCount = computed(() => fullList.value.filter(item => item.type === '警示').length);

// 模拟加载分析数据
const analysisContents = ref([]);
function loadAnalysisData(itemId) {
  if (itemId === 1) {
    analysisContents.value = [
      { id: 1, header: "车间检查", body: "空滤芯检查详情..." },
      { id: 2, header: "功能作用", body: "空滤芯的功能描述..." },
    ];
  } else if (itemId === 2) {
    analysisContents.value = [
      { id: 1, header: "车间检查", body: "机油检查详情..." },
      { id: 2, header: "检测影像", body: "旧机油滤芯影像..." },
    ];
  }
}

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
  color: #007bff;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
.back-arrow {
  margin-right: 0.3rem;
}
.tabs {
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
.content {
  margin-top: 1rem;
}
.issue-item {
  cursor: pointer;
  margin-bottom: 1rem;
}
.analysis-data {
  margin-top: 1.5rem;
}
.detail-box {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
