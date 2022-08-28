<template>
  <div class="container wrapper">
    <h1>Список задач</h1>
    <div class="main">
      <div class="task">
        <input type="text" v-model="task" @keydown.enter="addTask" placeholder="новая задача...">
        <button class="btn" @click="addTask">Добавить</button>
        <span v-if="isNotice" class="notice">{{ notice }}</span>
      </div>
      <div class="tasks-wrapper">
        <div class="task_drop-zone"
             v-for="(item, i) in filterTaskPage()"
             :key="i"
             @dragenter="dragEnter"
             @dragleave="dragLeave">
          <p class="task-box"

             draggable="true"
             @dragstart="dragStart"
             @dragend="dragEnd">
<span @click.prevent="taskCheck(item)">

      <input type="checkbox"
             :id="`check-${item.id}`"
             :name="`check-${item.id}`"
             v-model="item.checked"
      />
       <label :for="`check-${item.id}`" :class="{ through: item.checked }"> {{ item.text }} </label>
          </span>
            <button class="btn" @click="deleteTask(item)">Удалить</button>
          </p>
        </div>
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
      this.setLocalStorage();
    },
    deleteTask(item) {
      this.tasks = this.tasks.filter(t => t.id !== item.id);
      this.setLocalStorage();
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
    },
    setLocalStorage() {
      const tasksJSON = JSON.stringify(this.tasks);
      localStorage.setItem("to-do", tasksJSON);
    },
    taskCheck(item) {
      this.tasks = this.tasks.map(t => {
        if (t.id === item.id) {
          t.checked = !t.checked;
        }
        return t;
      });
      this.setLocalStorage();
    },

    dragStart() {
      console.log("drag Start")
    },
    dragEnd() {
      console.log("drag End")
    },
    dragEnter() {
      console.log("drag Enter")
    },
    dragLeave() {
      console.log("drag Leave")
    },
    dragOver() {
      console.log("drag Over")
    }
  },
  created() {
    if (localStorage.getItem("to-do")) {
      this.tasks = JSON.parse(localStorage.getItem("to-do"));
      this.isNotice = false
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
  position: relative;
  margin-bottom: 32px;
}

.task input {
  flex-grow: 1;
  padding: 8px;
  background: #1f2937;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  margin-right: 10px;
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
  margin-left: auto;
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
  justify-content: flex-start;
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
  max-width: 500px;
}

.task-box input {
  margin-right: 10px;
  cursor: pointer;
}

.task-box {
  padding: 3px;
  border: 1px dotted black;
  border-radius: 4px;
  cursor: all-scroll;
}

.task-box label {
  margin-right: 10px;
  word-break: break-all;
  cursor: pointer;
}
</style>