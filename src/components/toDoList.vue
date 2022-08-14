<template>
  <div class="container wrapper">
    <h1>Список задач</h1>
    <div class="main">
    <div class="task">
      <input type="text" v-model="task" placeholder="новая задача...">
      <button class="btn" @click="addTask">Добавить</button>
      <span v-if="isNotice" class="notice">{{ notice }}</span>
    </div>

    <div class="tasks-wrapper">
      <p class="task-box" v-for="item in filterTaskPage()" :key="item.id">
    <span class="task-item">
      <input type="checkbox"
             :id="`check-${item.id}`"
             :name="`check-${item.id}`"
      />
      <label @click=" item.checked = !item.checked " :for="`check-${item.id}`" :class="{ through: item.checked }">
        {{ item.text }} </label>
    </span>
        <button class="btn" @click="deleteTask(item)">Удалить</button>
      </p>
    </div>
    </div>
    <div>
      <button
          class="btn btn-paginator"
          v-for="n in pageCount"
          :key="n"
          @click="page = n"
      >{{ n }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "toDoList",
  data() {
    return {
      task: "",
      tasks: [],
      notice: "Добавте задачу...",
      isNotice: true,

      page: 1,
      pageCount: 1
    }
  },
  methods: {
    addTask() {
      if (this.task === "") {
        this.notice = "Надо что то написать"
        this.isNotice = true;
        return;
      }

      const newTask = {
        id: this.tasks.length + 1,
        text: this.task,
        checked: false
      };
      this.tasks.unshift(newTask);
      this.pageCount = Math.ceil(this.tasks.length / 8);
      this.task = "";
      this.isNotice = false;
    },
    deleteTask(item) {
      this.tasks = this.tasks.filter(t => t.id !== item.id);
      this.pageCount = Math.ceil(this.tasks.length / 8);
      if (!this.tasks.length) {
        this.notice = "Добавте задачу...";
        this.isNotice = true;
      }
    },
    filterTaskPage() {
      const start = (this.page - 1) * 8;
      const end = this.page * 8;
      return this.tasks.slice(start, end);
    }
  }
}
</script>

<style scoped>
* {
  font-family: sans-serif;
  color: #d1d5db;
}

.container {
  margin: 0 auto;
  max-width: 500px;
  padding: 40px;
  margin-top: 50px;
  background: #374151;
  border-radius: 4px;
  height: 560px;
}

h1 {
  text-align: center;
}

.task {
  display: flex;
  position: relative;margin-bottom: 32px;
}

.task input {
  flex-grow: 1;
  padding: 8px;
  background: #1f2937;
  border-radius: 4px;
  border: none;
  font-size: 16px;
}
.notice {
  position: absolute;
  left: 10px;
  top: 45px;
  color: #9ca3af;
}

.btn {
  min-width: 80px;
  margin-left: 4px;
  padding: 10px;
  background: #1f2937;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.7;
}

.btn-paginator {
  margin-right: 4px;
  min-width: auto;
}

.task-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.through {
  text-decoration: line-through;
}

.wrapper {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.main {
  flex: 1 1 auto;
}
</style>