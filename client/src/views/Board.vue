<template>
  <div class="board-view container-fluid">
    <div class="row" id="board-view-nav">
      <header class="board-details-name">
        <router-link :to="{name: 'boards'}" style=" color: #3f4430;">Fidget</router-link>
      </header>
      <div class="col">
        <p>
          <button
            class="btn btn-secondary"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <i class="fas fa-plus"></i>
          </button>
          <button class="btn btn-secondary" @click="logout">Log Out</button>
        </p>
        <div class="collapse" id="collapseExample">
          <div class="card">
            <form class="form-inline" @submit.prevent="submitList">
              <div class="form-group mx-sm-3 mb-2">
                <input type="text" class="form-control" placeholder="Title" v-model="newList.title">
              </div>
              <button type="submit" class="btn btn-primary mb-2">Add List</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col">{{board.title}}</div>
    </div>
    <div class="row mt-5">
      <list v-for="list in lists" :listData="list" :key="list._id"/>
    </div>
  </div>
</template>

<script>
import List from "@/components/List.vue";
export default {
  name: "board",
  props: ["boardId"],
  data() {
    return {
      newList: {
        title: "",
        boardId: this.boardId
      }
    };
  },
  mounted() {
    if (!this.board._id) {
      this.$store.dispatch("getBoards");
    }
    this.$store.dispatch("getLists", this.boardId);
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
    board() {
      return (
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    }
  },
  methods: {
    submitList({ target: form }) {
      let list = { ...this.newList, boardId: this.boardId };
      this.$store.dispatch("addList", list);
      form.reset();
      //collapses form after submission
      $(".collapse").collapse("hide");
    },
    logout() {
      this.$store.dispatch("logout", this.creds);
    }
  },
  components: {
    List
  }
};
</script>
<style>
#board-view-nav {
  height: 80px;
  background-color: rgba(245, 245, 245, 0.623);
  z-index: 1;
}

.board-details-name {
  font-family: "Pacifico", cursive;
  font-size: 3rem;
}

.board-view {
  background-color: #3f4430a1;
  /* background-attachment: fixed;
    background-image: url(https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80);
    min-height: 100vh;
    background-size: contain;
    background-size: cover;
    background-repeat: no-repeat; */
}
</style>