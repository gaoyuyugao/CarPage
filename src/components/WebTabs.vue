<!-- 无用 -->
<template>
    <div class="report-card" v-if="!showDetail">
      <div class="vehicle-info">
        <h2 style="color:black">粤BG57591</h2>
        <p style="">奥迪 | A6</p>
        <span>2024-09-18</span>
      </div>
      <div class="status-card">
        <img src="@/assets/vehicle.png" alt="vehicle" class="status-image" />
        <div class="status-details">
          <p>行驶里程: 60949Km</p>
          <p>服务顾问: 朱新耀</p>
          <p>检测地点: 深圳大昌行奥迪</p>
        </div>
      </div>
    </div>

    <!-- 标签部分 -->
    <div class="tabs">
      <button
        :class="{ active: activeTab === '紧急' }"
        @click="setTab('紧急')"
      >
        紧急 ({{ emergencyCount }})
      </button>
      <button
        :class="{ active: activeTab === '警示' }"
        @click="setTab('警示')"
      >
        警示 ({{ warningCount }})
      </button>
      <button
        :class="{ active: activeTab === '全部' }"
        @click="setTab('全部')"
      >
        全部 ({{ fullList.length }})
      </button>
    </div>

    <!-- 内容显示部分，根据 activeTab 显示不同内容 -->
    <div class="content" :class="{ fullscreen: showDetail }">
        <template v-if="!showDetail">
            <div v-for="item in filteredList" :key="item.id" class="issue-item" @click="openDetail(item)">
            <span class="icon">{{ item.title }}</span>
            <span class="description">{{ item.description }}</span>
            </div>
        </template>

        <template v-else>
        <!-- 详情页面 -->
            <button @click="closeDetail">返回</button>
            <h3>{{ selectedItem.title }}</h3>
            <p>{{ selectedItem.description }}</p>
            <!-- 模拟多内容的滑动区域 -->
            <div class="detail-content">
                <!-- 具体内容的小框 -->
                <div class="detail-box">
                  <h4>车间检查</h4>
                  <p>2024-09-18 15:10，黄燕良对空滤芯进行检查。</p>
                </div>
                <div class="detail-box">
                  <h4>车间检查</h4>
                  <p>2024-09-18 15:10，黄燕良对空滤芯进行检查。</p>
                </div>
                <div class="detail-box">
                  <h4>车间检查</h4>
                  <p>2024-09-18 15:10，黄燕良对空滤芯进行检查。</p>
                </div>
                <div class="detail-box">
                  <h4>车间检查</h4>
                  <p>2024-09-18 15:10，黄燕良对空滤芯进行检查。</p>
                </div>
                <p>详细内容2...</p>
                <p>详细内容3...</p>
                <p>详细内容3...</p>
                <p>详细内容3...</p>
                <p>详细内容3...</p>
                <p>详细内容3...</p>
                <p>详细内容3...</p>
                <p>详细内容3...</p>
                <p>详细内容3...</p>
                <p>详细内容3...</p>
                <p>详细内容3...</p>
                <p>详细内容3...</p>
                <p>详细内容3...</p>
            </div>
        </template>
    </div>
    
    <footer class="footer" v-if="!showDetail">
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
</template>

<script setup>
import { ref, computed } from 'vue';

// 定义响应式变量
const activeTab = ref('紧急'); // 默认选中“紧急”标签
const showDetail = ref(false);
const selectedItem = ref(null);
// 全部列表数据，每个项包含 type 属性，用于区分紧急、警示和普通
const fullList = ref([
  { id: 1, type: '紧急', title: "空滤芯", description: "经过检测空滤芯肮脏，过滤效率下降，建议更换。" },
  { id: 2, type: '紧急', title: "机油", description: "检测到机油肮脏，含有颗粒杂质。" },
  { id: 3, type: '警示', title: "刹车盘", description: "前后刹车盘未达到更换标准，可以正常使用。" },
  { id: 4, type: '普通', title: "轮胎", description: "经过检测该车辆轮胎功能正常，可继续使用。" },
  { id: 5, type: '普通', title: "皮带", description: "通过目视检查，皮带健康，可继续使用。" },
  // 添加更多数据以模拟较长列表...
]);
//切换标签页
function setTab(tab) {
  activeTab.value = tab;
  showDetail.value = false;
}
// 计算属性：根据 activeTab 筛选 fullList 的内容
const filteredList = computed(() => {
  if (activeTab.value === '全部') {
    return fullList.value;
  } else {
    return fullList.value.filter(item => item.type === activeTab.value);
  }
});
// 打开详情页面
function openDetail(item) {
  selectedItem.value = item;
  showDetail.value = true;
}
// 关闭详情页面
function closeDetail() {
  showDetail.value = false;
}
// 计算属性：不同类型的数量
const emergencyCount = computed(() => fullList.value.filter(item => item.type === '紧急').length);
const warningCount = computed(() => fullList.value.filter(item => item.type === '警示').length);

//关于本报告弹窗
const showModal = ref(false);
function closeModal() {
    showModal.value = false;
}
</script>

<style scoped>
/* 标签部分样式 */
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
  height:200px;
  overflow-y: auto;
}

.fullscreen {
  height: 100vh;
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

/* 样式调整 */
.issue-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.icon {
  font-weight: bold;
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
    padding: 1rem;
    background-color: #ffffff;
}
  
.vehicle-info {
    text-align: left;
    font-size: 1.2rem;
}
  
.status-card {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem;
    background-color: #d8e7ff;
    border-radius: 10px;
}
  
.status-image {
    width: 60px;
    margin-right: 1rem;
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
  
    background-color: #f0f2f5;
  }
  
  .report-button {
    background-color: transparent;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
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
    max-width: 400px;
    text-align: center;
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
</style>
  