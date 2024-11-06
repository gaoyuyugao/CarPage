<template>
    <div class="report-card">
      <!-- 页面顶部信息 -->
      <div class="vehicle-info">
        <h2 style="color:black;font-weight: bolder;margin-left: 20px">粤BG57591</h2>
        <p style="font-size: small;margin-left: 30px">奥迪   |   A6</p>
        <span style="font-size: small;margin-left: 20px">2024-09-18</span>
      </div>

      <div class="status-card">
        <img src="@/assets/vehicle.png" alt="vehicle" class="status-image" />
        <div class="status-details">
          <p style="color: white;font-size: small;">行驶里程: 60949Km</p>
          <p style="color: white;font-size: small;margin-top: 5px">服务顾问: 朱新耀</p>
          <p style="color: white;font-size: small;margin-top: 5px">检测地点: 深圳大昌行奥迪</p>
        </div>
      </div>

      <!-- 标签部分 -->
      <div class="tabs">
        <div :class="[activeTab === '紧急' ? 'emergency-button-active' : '']">
          <button
            :class="[ 'emergency-button']"
            @click="setTab('紧急')"
          >
            紧急 ({{ emergencyCount }})
          </button>
        </div>
        <div :class="[activeTab === '警示' ? 'warning-button-active' : '']">
          <button
            :class="[ 'warning-button']"
            @click="setTab('警示')"
          >
            警示 ({{ warningCount }})
          </button>
        </div>
        <div :class="[activeTab === '全部' ? 'all-button-active' : '']">
          <button
            :class="[ 'all-button']"
            @click="setTab('全部')"
          >
            全部 ({{ fullList.length }})
          </button>
        </div>
      </div>

      <!-- 内容显示部分，根据 activeTab 显示不同内容 -->
      <div class="content">
        <div v-for="item in filteredList" :key="item.id" class="issue-item" @click="goToDetail(item)">
          <img :src="`/src/assets/partLogo/${item.title}图标.png`" alt="" style="margin:5px;width: 10%" />
          <div style="display: flex;flex-direction: column;margin-left: 10px;width: 80%">
            <span style="font-size: 13px" >{{ item.title }}</span>
            <span style="font-size: 11px">{{ item.description }}</span>
          </div>
          <span style="font-size: 13px;" > > </span>
        </div>
      </div>

      <footer class="footer">
        <button @click="showModal = true" class="report-button">关于本报告</button>

        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
          <div class="modal-content">
            <h2>温馨提示</h2>
            <p>
              如果您对本报告有任何疑问请与您的专属服务顾问或所在门店联系。
              <br /><br />
              本次检测由所在门店技师对您的车辆的部分部位进行检测，无法保证检测出您车辆可能存在的所有问题；如您需要全面检测，请联系专属您的服务顾问。
              <br /><br />
              捷易检测为本次车辆检测提供技术支持，对于车辆检测过程中的直接或间接损失，捷易检测不承担任何经济或法律责任。
            </p>
            <button @click="closeModal" class="close-button">我已知晓</button>
          </div>
        </div>
      </footer>
    </div>

</template>

<script setup>

import { ref, computed ,onMounted ,inject } from 'vue';
import { useRouter } from 'vue-router';
//import axios from 'axios';
const axios = inject('$axios');
const router = useRouter();
const fullList = ref([]); // 用于存储从 API 获取的项目列表
const activeTab = ref('紧急');
// const fullList = ref([
//   { id: 1, type: '紧急', title: "空滤芯", description: "经过检测空滤芯肮脏，过滤效率下降，建议更换。" },
//   { id: 2, type: '紧急', title: "机油", description: "检测到机油肮脏，含有颗粒杂质。" },
//   { id: 3, type: '警示', title: "刹车盘", description: "前后刹车盘未达到更换标准，可以正常使用。" },
//   { id: 4, type: '普通', title: "轮胎", description: "经过检测该车辆轮胎功能正常，可继续使用。" },
//   { id: 5, type: '普通', title: "皮带", description: "通过目视检查，皮带健康，可继续使用。" },
// ]);
// 获取项目列表信息
const fetchData = async () => {
  try {
    const dossierId = 263; // 假设此处是动态获取的 dossierId
    const response = await axios.get(`/info/DossierId/${dossierId}`);
    const inspectionInfo = response.data;
    // 根据 riskStatus 设置项目类型
    // 获取每个项目的描述信息
    for (const item of inspectionInfo) {
      const recordResponse = await axios.get(`/record/InspectionId/${item.carInspectionInfo_id}`);
      const recordData = recordResponse.data;
      fullList.value.push({
        id: item.carInspectionInfo_id,
        type: item.riskStatus === 0 ? '紧急' : item.riskStatus === 1 ? '警示' : '普通',
        title: item.inspectionType,
        description: recordData.aiDiagnosis // 获取 `aiDiagnosis` 作为描述
      });
    }
  } catch (error) {
    console.error("Error fetching inspection info:", error);
  }
};

// 页面加载时调用 fetchData
onMounted(fetchData);

function setTab(tab) {
  activeTab.value = tab;
}

  // 筛选内容
const filteredList = computed(() => {
  if (activeTab.value === '全部') {
    return fullList.value;
  } else {
    return fullList.value.filter(item => item.type === activeTab.value);
  }
});

const emergencyCount = computed(() => fullList.value.filter(item => item.type === '紧急').length);
const warningCount = computed(() => fullList.value.filter(item => item.type === '警示').length);

// 跳转到详情页
function goToDetail(item) {
  router.push({ name: 'DetailPage', params: { id: item.id, type: activeTab.value } });
}
const showModal = ref(false);

function closeModal() {
  showModal.value = false;
}
</script>

<style scoped>
/* 标签部分样式 */
.tabs {
  border-radius: 15px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  margin: 1rem;
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

/* 内容区域样式，设置固定高度并允许滚动 */
/* .content {
  height: 200px;
  overflow-y: auto;
  padding: 1rem;
}
.detail-content {
  height:600px;
  overflow-y: auto;
  padding: 1rem;
} */
 /* 容器布局 */
.content {
  margin: 1rem;
  padding: 1rem 1rem;
  background-color: white;
  border-radius: 15px;
  height:250px;
  overflow-y: auto;
  scrollbar-width: none;
  scrollbar-color: transparent transparent;
}

.fullscreen {
  height: 100vh;
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

/* 样式调整 */
.issue-item {
  border-bottom: 2px solid transparent;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer; /* 鼠标变成手型，提示可点击 */
}

.icon {
  margin-right: 0.5rem;
}

.report-button {
  margin-top: 2rem;
  color: #007bff;
  background: none;
  border: none;
  cursor: pointer;
}

.report-card {
  background-color: whitesmoke;
}

.vehicle-info {
    text-align: left;
    font-size: 1.2rem;
    background-image: url('@/assets/background6.jpg'); /* 设置背景图片 */
    background-size: cover; /* 覆盖整个容器 */
    background-repeat: no-repeat; /* 不重复图片 */
}

.status-card {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-image: url('@/assets/background7.jpg'); /* 设置背景图片 */
    background-size: cover; /* 覆盖整个容器 */
    background-repeat: no-repeat; /* 不重复图片 */
}

.status-image {
    width: 60px;
    margin-right: 2rem;
  margin-left: 1rem;
}

.status-details p {
    margin: 0;
    font-size: 0.9rem;
}
/* 具体内容设计 */
.detail-box {
  background-color: #f8f9fa; /* 设置背景色 */
  border-radius: 10px; /* 圆角 */
  padding: 1rem; /* 内边距 */
  margin-bottom: 1rem; /* 底部外边距，分隔多个框 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.detail-box h4 {
  margin: 0; /* 标题顶部间距 */
  font-weight: bold; /* 加粗标题 */
  border-left: 4px solid black; /* 左边框 */
  padding-left: 0.5rem; /* 左内边距 */
  margin-bottom: 0.5rem; /* 标题和内容之间的间距 */
}

.detail-box p {
  margin: 0; /* 移除段落默认间距 */
  color: #333; /* 文字颜色 */
}

/* 关于本报告弹窗样式 */
.footer {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .report-button {
    margin-top: 0;
    background-color: transparent;
    border: none;
    color: darkgrey;
    cursor: pointer;
    font-size: 0.8rem;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 8px;
    width: 90%;
    max-width: 100%; /* 最大宽度不超过父容器 */
    max-height: 90vh; /* 最大高度不超过视口高度的90% */
    overflow-y: auto; /* 如果内容超出最大高度，则显示滚动条 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .modal-content h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .modal-content p {
    font-size: 0.9rem;
    color: #333;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .close-button {
    background-color: #007bff;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
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
