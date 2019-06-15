<template>
  <div class="boards">
    <div class="container-fluid">
      <div class="row" id="boards-nav">
        <div class="col" id="title" style="font-size: 3rem">Fidget</div>
        <div class="col" id="quote" style="font-size: 1.3rem; font-family: 'Comfortaa'">
          <div class="d-flex justify-content-center" id="tagline">Create some clarity!</div>
        </div>
        <div class="col">
          <button class="btn btn-outline-secondary" style="color: whitesmoke" data-toggle="modal"
            data-target="#boardModal" title="Create A Board" type="submit">Create Board
            <i class="fas fa-plus"></i>
          </button>
          <button class="btn btn-secondary" @click="logout">Log Out</button>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="boardModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true">
      <div class="modal-dialog cascading-modal">
        <div class="modal-content">
          <div class="modal-header info-color white-text">
            <h6 class="title">Create a Board</h6>
            <form @submit.prevent="addBoard">
              <button type="button" class="close waves-effect waves-light" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
              <input type="text" class="form-control" placeholder="title" v-model="newBoard.title" required>
              <input type="text" class="form-control" placeholder="description" v-model="newBoard.description">
              <button class="btn btn-secondary" type="submit">Create Board</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- This is where Boards Render -->
    <div class="container" id="board">
      <div class="row">
        <div class="col" v-for="board in boards" :key="board._id">
          <div class="card board-list" style="width: 18rem;">
            <div class="card-body">
              <router-link :to="{name: 'board', params: {boardId: board._id}}" style="color: #3f4430">
                <h5 class="card-title board-name">{{board.title}}</h5>
              </router-link>
              <p class="card-text" style="color: whitesmoke">{{board.description}}</p>
              <button class="btn btn-outline-secondary" style="color: whitesmoke" @click.stop="deleteBoard(board._id)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    created() {
      setTimeout(() => {
        if (!this.$store.state.user._id) {
          this.$router.push({ name: "login" });
        }
      }, 3000);
    },
    //FYI: above was referenced from food-is-fun like Mark told us to EOD Friday for correct timeout, below is groups and he is probably right, Mark is by far the coolest of the cool, he may even have refactored the original code to fit the needs of this particular project.

    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        },
        tabIndex: -1
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
        //manually closes modal
        $("#boardModal").modal("hide");
        $(".modal-backdrop").remove();
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      logout() {
        this.$store.dispatch("logout", this.creds);
      }
    }
  };
</script>
<style>
  #boards-nav {
    height: 80px;
    background-color: rgba(10, 10, 10, 0.3);
    z-index: 1;
    background-position: center;
  }

  .board-list {
    background-color: #3f443093;
    margin-top: 5px;
  }

  #tagline {
    position: absolute;
    bottom: 0;
  }

  .board-name {
    font-family: "Pacifico", cursive;
    font-size: 1.5rem;
    color: whitesmoke;
  }

  #title {
    font-family: "Pacifico", cursive;
    font-size: 4rem;
    color: whitesmoke;
  }

  .boards {
    background-image: url(https://images.unsplash.com/photo-1470770903676-69b98201ea1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80);
    background-color: rgb(92, 95, 94);
    min-height: 100vh;
    background-attachment: fixed;
    background-size: contain;
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>