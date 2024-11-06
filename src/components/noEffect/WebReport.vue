<!-- 没用了 -->

<template>
    <div class="report-card">
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
</template>
  
<style scoped>
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
</style>
  