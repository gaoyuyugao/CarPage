//无用

<template>
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
</template>
  
<script setup>
  import { ref } from 'vue';
  
  const showModal = ref(false);
  
  function closeModal() {
    showModal.value = false;
  }
</script>
  
<style scoped>
  .footer {
    text-align: center;
    padding: 1rem;
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
  