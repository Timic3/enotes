<template>
  <v-container>
    <h1>Welcome back, {{ user.username }}</h1>
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
      <div v-for="note in notes" :key="note.title" class="ma-lg-1 ma-md-1 ma-sm-3 ma-xs-5" >
        <v-card
          elevation="1" 
          outlined
          max-width="438"
          v-if="note.sh"
        >
          <v-img
            src="https://static8.depositphotos.com/1007173/1012/i/600/depositphotos_10129093-stock-photo-note-with-pin.jpg"
            height="100px"
          ></v-img>

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
                          <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </div>
            </div>
          </v-expand-transition>
        </v-card>
      </div>
    </v-row>
    <v-overlay
      v-if="add"
    >
      <v-card class="mx-auto mt-6 pa-6" max-width="800" light>
        <v-text-field
          v-model="title"
          label="title"
        ></v-text-field>
        <v-textarea
          v-model="text"
          name="text"
          label="text"
        ></v-textarea>
        <v-date-picker
          v-model="date"
          class="mt-4"
          v-if="reminder"
        ></v-date-picker>
        <v-text-field
          v-model="todo"
          label="list items (ex. item1, item2)"
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

<script>
import axios from 'axios';

export default {
  name: 'Main',

  data: () => ({
    notes: [],
    add: false,
    reminder: false,
    title: '',
    text: '',
    todo: '',
    date: '',
    type: '',
  }),

  computed: {
    user() {
      return this.$store.state.user;
    }
  },

  methods:{
    async loadNotes(){
      const response = await axios.post('http://localhost:15000/notes/get', {
        userid: this.user.id,
      })
      const data = response.data.array;
      data.forEach(async element => {
        if(element.type == "Normal"){
          this.notes.push({
            id: element.id,
            title: element.title,
            type: element.type,
            text: element.text,
            show: false,
            sh: true
          });
        }
        else{
          const responsetodo = await axios.post('http://localhost:15000/notes/gettodo', {
            noteid: element.id,
          })
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
    async saveNote(){
      if(this.todo === "") this.type = "Normal";
      else this.type = "todo";

      const response = await axios.post('http://localhost:15000/notes/create', {
        userid: this.user.id,
        title: this.title,
        type: this.type,
        text: this.text,
        todo: this.todo.split(','),
      })
      this.notes = [];
      this.loadNotes();
      console.log(response);
    },
    async removeNote(idnote){
      const response = await axios.post('http://localhost:15000/notes/removenote', {
        noteid: idnote
      });
      console.log(response);
      this.notes = [];
      this.loadNotes();
    },
    async itemCheck(item){
      const response = await axios.post('http://localhost:15000/notes/updatetodo', {
        checked: item.checked,
        todoid: item.id,
      });
    },
    logout(){
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },

  created(){
    this.loadNotes()
  },
}
</script>
