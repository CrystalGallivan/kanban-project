<template>
  <div class="card task">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <h3>
          {{taskData.title}}
          <i class="fas fa-eraser" @click="deleteTask"></i>
        </h3>
        <p>{{taskData.description}}</p>

        <!-- complete list drop down menu -->
        <select v-model="selected" @change="moveTask">
          <option disabled value>Move Task...</option>
          <option v-for="list in lists" :value="list._id">{{list.title}}</option>
        </select>
      </li>
      <li class="list-group-item"></li>
    </ul>
    <div v-for="(comment, index) in comments" :task="taskData">
      <p>
        {{comment.content}} - {{comment.user}}
        <button
          class="btn btn-danger"
          @click="deleteComment(index)"
        >Delete</button>
      </p>
    </div>
    <form class="form-inline" @submit.prevent="submitComment">
      <div class="form-group mx-sm-3 mb-2">
        <input type="text" class="form-control" placeholder="Comments" v-model="newComment.content">
        <input type="text" class="form-control" placeholder="User" v-model="newComment.user">
        <button class="btn btn-info" type="submit">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["taskData", "listData"],
  data() {
    return {
      newComment: {
        content: "",
        user: "",
        taskId: this.taskData._id,
        listId: this.taskData.listId
      },
      selected: ""
    };
  },
  computed: {
    comments() {
      let comments = this.taskData.comments;
      return comments;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    submitComment({ target: form }) {
      this.taskData.comments.push(this.newComment);
      this.$store.dispatch("addComment", this.taskData);
      form.reset();
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData);
    },
    deleteComment(index) {
      this.taskData.comments.splice(index, 1);
      this.$store.dispatch("deleteComment", this.taskData);
    },
    moveTask() {
      this.taskData.oldId = this.taskData.listId;
      this.taskData.listId = this.selected;
      this.$store.dispatch("moveTask", this.taskData);
    }
  }
};
</script>

<style scoped>
.task {
  color: #3f4430;
  margin: 20px;
}
.form-group {
  max-width: 100%;
}
</style>