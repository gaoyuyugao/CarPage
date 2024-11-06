<!-- 无用 -->

<template>
  <div class="inspection-container">
    <h1>汽车检测报告</h1>

    <!-- 显示汽车检测的详细信息 -->
    <div v-if="report" class="report-details">
      <h2>{{ report.licensePlate }} - {{ report.brand }} {{ report.model }}</h2>
      <p><strong>检测日期:</strong> {{ report.date }}</p>
      <p><strong>行驶里程:</strong> {{ report.mileage }}</p>
      <p><strong>服务顾问:</strong> {{ report.advisor }}</p>
      <p><strong>检测地点:</strong> {{ report.location }}</p>

      <h3>紧急警示:</h3>
      <ul>
        <li v-for="(alert, index) in report.alerts" :key="index">
          {{ alert }}
        </li>
      </ul>

      <h3>问题详情:</h3>
      <ul>
        <li v-for="(issue, index) in report.issues" :key="index">
          {{ issue }}
        </li>
      </ul>

      <h3>推荐的维护操作:</h3>
      <ul>
        <li v-for="(recommendation, index) in report.recommendations" :key="index">
          {{ recommendation }}
        </li>
      </ul>
    </div>

    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      report: null, // 用于存储从后端获取的检测报告数据
    };
  },
  methods: {
    async fetchInspectionReport() {
      try {
        const response = await axios.get('http://localhost:8080/api/report');
        this.report = response.data; // 将后端返回的数据赋值给 report
      } catch (error) {
        console.error("获取检测报告失败:", error);
      }
    },
  },
  mounted() {
    this.fetchInspectionReport(); // 在组件挂载后立即获取数据
  },
};
</script>

<style scoped>
.inspection-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.report-details {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
}

h3 {
  margin-top: 1em;
  color: #007bff;
}

p, ul {
  margin: 0.5em 0;
}
</style>
