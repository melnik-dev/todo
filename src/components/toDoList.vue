<template>
  <div class="container wrapper">
    <h1>Список задач</h1>
    <div class="main">
      <div class="task">
        <input type="text" v-model="task" @keydown.enter="addTask" placeholder="новая задача...">
        <button class="btn" @click="addTask">Добавить</button>
        <span v-if="isNotice" class="notice">{{ notice }}</span>
      </div>
      <div class="tasks-wrapper"
           ref="dragzone"
           @dragenter="dragEnter"
           @dragleave="dragLeaveZone"
           @dragover="dragOver"
           @drop="dragDrop">

        <p class="task-box"
           v-for="(item, i) in filterTaskPage()"
           :key="item.id"
           :id="`item-${i}`"
           draggable="true"
           @dragstart="dragStart(i, $event)"
           @dragleave="dragLeave(i)"
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
      pageCount: 1,

      idDragElem: undefined,
      insertAfterElem: undefined,
      draggableElement: undefined
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
      this.pageCount = Math.ceil(this.tasks.length / 6);
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
      const start = (this.page - 1) * 6;
      const end = this.page * 6;
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

    dragStart(i, event) {
      //пользователь начал перетаскивать элемент
      // event.dataTransfer.setData('text/plain', event.target.id);
      // event.currentTarget.style.backgroundColor = 'yellow';
      this.idDragElem = i;
      event.target.classList.add("dragging");
      console.log("dragStart " + "idDragElem: " + this.idDragElem);
    },
    dragEnd(event) {
      //завершается перетаскивание
      event.target.classList.remove("dragging");
      console.log("drag End")
    },
    dragEnter(event) {
      //перетаскиваемый элемент попадает в допустимую цель сброса
      this.$refs.dragzone.style.background = "#475569";
      console.log("drag Enter " + "target.id " + event.target.id);
    },
    dragLeave(i) {
      //перетаскиваемый элемент покидает допустимую цель сброса
      this.insertAfterElem = i;
      console.log("drag Leave " + "AfterElem " + i);
    },
    dragLeaveZone() {
      console.log("drag Leave Zone " );
    },
    dragOver(event) {
      //элемент перетаскивается над допустимой целью сброса каждые несколько сотен миллисекунд
      event.preventDefault()
      console.log("drag Over ");
    },
    dragDrop() {
      //элемент сброшен в допустимую зону сброса
      // const id = event.dataTransfer.getData('text');
      // const dropzone = event.target;
      // dropzone.append(draggableElement);
      this.draggableElement = this.tasks.splice(this.idDragElem, 1);

      this.tasks.splice(this.insertAfterElem, 0, this.draggableElement[0]);
      this.$refs.dragzone.style.background = "none";
      console.log("drag Drop ");
      console.log(this.draggableElement);
      this.setLocalStorage()
    }
  },
  // watch: {
  //   tasks() {
  //     localStorage.setItem("to-do", JSON.stringify(this.tasks));
  //   }
  // },
  created() {
    if (localStorage.getItem("to-do")) {
      this.tasks = JSON.parse(localStorage.getItem("to-do"));
      this.isNotice = false
    }
    this.pageCount = Math.ceil(this.tasks.length / 6);
  }
}
</script>

<style scoped>
* {
  font-family: sans-serif;
  color: #d1d5db;
}

.dragging {
  background: #334155!important;
}
.dragzone{
  background: #475569;
}

.container {
  margin: 0 auto;
  max-width: 500px;
  padding: 40px;
  margin-top: 50px;
  background: #374151;
  border-radius: 4px;
  height: 600px;
}

h1 {
  text-align: center;
  margin-top: 0px;
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
  margin-bottom: 30px;
  background: #374151;
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