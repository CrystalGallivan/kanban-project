<template>
  <div class="col-4">
    <div class="card list-card">
      <div class="card-header list-title">
        <div class="list-title-text">{{listData.title}}</div>
        <button @click="deleteList" class="btn btn-danger" title="Delete List">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <!-- Render Here -->
      <task v-for="task in tasks" :taskData="task" :listData="listData" :key="task._id" />

      <!-- Maybe something will go here -->

      <!-- Task From -->
      <form class="add-task-form" @submit.prevent="submitTask">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Title" v-model="newTask.title">
          <input type="text" class="form-control" placeholder="Description" v-model="newTask.description">
          <div class="input-button">
            <button type="submit" class="btn btn-secondary mb-2">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Task from "@/components/Task.vue";
  export default {
    name: "List",
    props: ["listData"],
    data() {
      return {
        newTask: {
          title: "",
          description: "",
          listId: this.listData._id
        }
      };
    },
    mounted() {
      this.$store.dispatch("getTasks", this.listData._id);
    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listData._id];
      }
    },
    methods: {
      deleteList() {
        this.$store.dispatch("deleteList", this.listData);
      },
      submitTask({ target: form }) {
        this.$store.dispatch("addTask", this.newTask);
        form.reset();
      }
    },
    components: {
      Task
    }
  };
</script>

<style>
  .list-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .add-task-form {
    margin: 10px;
  }

  .list-title-text {
    font-size: 18px;
    font-family: "Pacifico", cursive;
    font-size: 1.5rem;
    color: whitesmoke;
  }

  .list-card {
    background-color: #3f443093;
  }
</style>