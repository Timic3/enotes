<template>
  <v-container>
    <h1>Welcome back, {{ user ? user.username : '' }}</h1>
    <v-row>
      <v-col cols="12">
        <v-btn
          color="green lighten-1"
          text
          @click="logout"
        >
          Logout
        </v-btn>
        <v-btn
          color="green lighten-1"
          text
          @click="add=true"
        >
          Add note
        </v-btn>
        <!--
        <v-btn
          color="green lighten-1"
          text
        >
          Calendar
        </v-btn>
        <v-btn
          color="red lighten-1"
          text
        >
          Clear
        </v-btn>-->
      </v-col>
      <div v-for="note in notes" :key="note.id" class="ma-lg-1 ma-md-1 ma-sm-3 ma-xs-5" >
        <DraggableDiv v-if="note.sh">
          <template slot="header">
            <v-img
              src="https://static8.depositphotos.com/1007173/1012/i/600/depositphotos_10129093-stock-photo-note-with-pin.jpg"
              height="100px"
            ></v-img>
          </template>
          <template slot="main" >
            <v-card-title>
              {{ note.title }}
            </v-card-title>

            <v-card-subtitle>
              Reminder:
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="red lighten-1"
                text
                @click="removeNote(note.id)"
              >
                Remove
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                icon
                @click="note.show = !note.show"
              >
                <v-icon>{{ note.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="note.show">
                <div  v-if="note.type=='Normal'">
                  <v-divider></v-divider>
                  <v-card-text>
                    {{ note.text }}
                  </v-card-text>
                </div>
                <div  v-if="note.type=='Todo'">
                  <v-divider></v-divider>
                  <v-list flat subheader three-line>
                    <v-list-item-group
                      multiple
                      active-class=""
                      v-for="item in note.items" :key="item[0]"
                    >
                      <v-list-item>
                        <template v-slot:default="{ active }">
                          <v-list-item-action>
                            <v-checkbox :input-value="active" v-model="item.checked" @click="itemCheck(item)"></v-checkbox>
                          </v-list-item-action>

                          <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                            <!--<v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>-->
                          </v-list-item-content>
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </div>
              </div>
            </v-expand-transition>
          </template>
          <template slot="footer"></template>
        </DraggableDiv>
      </div>
    </v-row>
    <v-overlay
      v-if="add"
    >
      <v-card class="mx-auto mt-6 pa-6" max-width="800" light elevation="1" >
        <v-text-field
          v-model="title"
          label="Title"
        ></v-text-field>
        <v-textarea
          v-model="text"
          name="text"
          label="Text"
          rows="1"
          auto-grow
        ></v-textarea>
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
          v-if="reminder"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Select date of reminder"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @input="datepicker = false"
          ></v-date-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
          v-if="reminder"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="time"
              label="Picker in menu"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="time"
            full-width
            @click:minute="$refs.menu.save(time)"
            format="24hr"
          ></v-time-picker>
        </v-menu>
        <v-text-field
          v-model="todo"
          label="Items (ex. item1, item2)"
        ></v-text-field>
        <v-btn
          color="green lighten-1"
          text
          @click="saveNote"
        >
          Add
        </v-btn>
        <v-btn
          color="green lighten-1"
          text
          @click="reminder=true"
          v-if="!reminder"
        >
          Add reminder
        </v-btn>
        <v-btn
          color="red lighten-1"
          text
          @click="reminder=false"
          v-if="reminder"
        >
          Remove reminder
        </v-btn>
        <v-btn
          color="red lighten-1"
          text
          @click="add=false"
        >
          Close
        </v-btn>
      </v-card>
    </v-overlay>
  </v-container>
</template>

<style lang="scss" scoped>
.v-list-item {
  min-height: 0 !important;
}

.v-list-item__content {
  align-self: inherit !important;
}

.v-list--three-line .v-list-item .v-list-item__action {
  // margin-top: 0 !important;
  // margin-bottom: 0 !important;
  margin-right: 15px !important;
}
</style>

<script>
import axios from 'axios';
import DraggableDiv from './DraggableDiv'

export default {
  name: 'Home',

  data: () => ({
    notes: [],
    add: false,
    reminder: false,
    datepicker: false,
    timepicker: false,
    title: '',
    text: '',
    todo: '',
    date: new Date().toISOString().substr(0, 10),
    type: '',
    time: null,
    menu1: false,
    menu2: false,
    modal2: false,
  }),

  components: {
    DraggableDiv
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    loggedIn() {
      return this.$store.state.status.loggedIn;
    }
  },

  methods: {
    async loadNotes() {
      const response = await axios.post('http://localhost:15000/notes/get', {
        userid: this.user.id,
      }, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`
        }
      });
      const data = response.data.array;
      data.forEach(async element => {
        if (element.type == "Normal") {
          this.notes.push({
            id: element.id,
            title: element.title,
            type: element.type,
            text: element.text,
            show: false,
            sh: true
          });
        } else {
          const responsetodo = await axios.post('http://localhost:15000/notes/gettodo', {
            noteid: element.id,
          }, {
            headers: {
              'Authorization': `Bearer ${this.user.token}`
            }
          });
          const itms = []
          responsetodo.data.array.forEach(async element => {
            itms.push(element);
          });
          this.notes.push({
            id: element.id,
            title: element.title,
            type: element.type,
            items: itms,
            show: false,
            sh: true
          });
        }
      });
    },
    async saveNote() {
      if (this.todo === "") this.type = "Normal";
      else this.type = "todo";

      const response = await axios.post('http://localhost:15000/notes/create', {
        userid: this.user.id,
        title: this.title,
        type: this.type,
        text: this.text,
        todo: this.todo.split(','),
      }, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`
        }
      });
      this.notes = [];
      this.loadNotes();
    },
    async removeNote(idnote) {
      const response = await axios.post('http://localhost:15000/notes/removenote', {
        noteid: idnote
      }, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`
        }
      });
      this.notes = [];
      this.loadNotes();
    },
    async itemCheck(item) {
      const response = await axios.post('http://localhost:15000/notes/updatetodo', {
        checked: item.checked,
        todoid: item.id,
      }, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`
        }
      });
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  },

  created() {
    if (!this.loggedIn) {
      this.$router.push('/login');
      return;
    }
    this.loadNotes();
  },
}
</script>
