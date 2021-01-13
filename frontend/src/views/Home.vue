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
        <v-btn
          color="green lighten-1"
          text
          @click="addDrawing=true"
        >
          Add Drawing
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
      <div v-for="drawing in drawings" :key="drawing.id" class="ma-lg-1 ma-md-1 ma-sm-3 ma-xs-5" >
        <DraggableDiv>
          <template slot="header">
            <v-img
              class="custom-transition"
              :src="drawing.url"
            />
            <v-btn
              color="red lighten-1"
              text
              @click="removeDrawing(drawing.id)"
            >
              Remove
            </v-btn>
          </template>
        </DraggableDiv>
      </div>
      <div v-for="note in notes" :key="note.id" class="ma-lg-1 ma-md-1 ma-sm-3 ma-xs-5" >
        <DraggableDiv v-if="note.sh" :color="note.color" :savedClientX="note.clientX" :savedClientY="note.clientY">
          <template slot="header">
            <v-img
              class="custom-transition"
              :src="note.imageURL"
              v-on:click="returnPositionOfCard"
            >
              <v-card-title class="d-none">
                {{ note.id }}
              </v-card-title>
            </v-img>
          </template>
          <template slot="main">
            <v-card-title>
              {{ note.title }}
            </v-card-title>

            <v-card-subtitle>
              Reminder: {{ modifyDate(note.reminderDate) }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="red lighten-1"
                text
                @click="removeNote(note.id)"
              >
                Remove
              </v-btn>
              <v-btn
                color="green lighten-1"
                text
                @click="openEditPanel(note.id, note.title, note.text, note.reminderDate, note.items, note.imageURL, note.color)"
              >
                Edit
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
                  <v-card-text>
                    {{ note.text }}
                  </v-card-text>
                  <v-list flat subheader three-line>
                    <v-list-item-group
                      multiple
                      active-class=""
                      v-for="item in note.items" :key="item[0]"
                    >
                      <v-list-item v-model="item.checked">
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
    <v-overlay v-if="addDrawing">
      <selection v-on:saveDrawingToDb="saveDrawing" v-on:cancelDrawing="addDrawing=false"></selection>
    </v-overlay>
    <v-overlay
      v-if="add || editing"
    >
      <v-card class="mx-auto mt-6 pa-6" max-width="800" light elevation="1" >
        <v-card-title class="d-none" model="editingNoteId">
        </v-card-title>
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
        <v-color-picker
          dot-size="30"
          v-model="picker"
          hide-mode-switch
          swatches-max-height="250"
        ></v-color-picker>
        <v-text-field
          v-model="image"
          label="Image url"
        ></v-text-field>
        <v-btn
          color="green lighten-1"
          text
          v-if="!editing"
          @click="saveNote"
        >
          Add
        </v-btn>
        <v-btn
          color="green lighten-1"
          text
          v-if="editing"
          @click="editNote"
        >
          Edit
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
          @click="add=false;editing=false;"
        >
          Close
        </v-btn>
      </v-card>
    </v-overlay>
    <v-overlay :value="reminderCalled">
      <v-card class="ma-5 pa-6" light elevation="1" max-width="600px" max-height="600px">
        <v-img
          :src="this.reminderData.imageURL"
        >
        </v-img>
        <v-card-title>
          Reminder! - {{this.reminderData.date}}
        </v-card-title>
        <v-row class="ma-2 pl-2">
          You are being reminded for your note: <b>{{" "+this.reminderData.title}}</b>.
        </v-row>
        <v-btn
          color="red lighten-1"
          text
          @click="reminderCalled = false"
          class="mt-2"
        >
          Close
        </v-btn>
      </v-card>
    </v-overlay>
  </v-container>
</template>

<style lang="scss" scoped>

.custom-transition{
  height: 150px;
  transition: 0.4s;
}

.custom-transition:hover {
  height:250px;
  transition: 0.4s;
}

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
import DraggableDiv from './DraggableDiv';
import Selection from './Selection';

import { API } from '../store/constants';

export default {
  name: 'Home',

  data: () => ({
    notes: [],
    drawings: [],
    drawingsId: 1,
    add: false,
    addDrawing: false,
    expand: false,
    reminder: false,
    datepicker: false,
    timepicker: false,
    reminderCalled: false,
    reminderData:{},
    reminders: [],
    title: '',
    text: '',
    todo: '',
    date: new Date().toISOString().substr(0, 10),
    type: '',
    time: null,
    menu1: false,
    menu2: false,
    modal2: false,
    picker: { r: 255, g: 255, b: 255, a: 1 },
    image: '',
    editing: false,
    editingNoteId: null,
  }),

  components: {
    DraggableDiv,
    Selection
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    loggedIn() {
      return this.$store.state.status.loggedIn;
    },
  },

  methods: {
    async loadNotes() {
      const response = await axios.post(`${API}/notes/get`, {
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
            clientX: element.clientX,
            clientY: element.clientY,
            imageURL: element.imageURL,
            color: element.color,
            reminderDate: element.reminderDate,
            show: false,
            sh: true
          });
        } else {
          const responsetodo = await axios.post(`${API}/notes/gettodo`, {
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
            text: element.text,
            imageURL: element.imageURL,
            clientX: element.clientX,
            clientY: element.clientY,
            color: element.color,
            items: itms,
            reminderDate: element.reminderDate,
            show: false,
            sh: true
          });
        }
      });
    },
    async saveNote() {
      if (this.todo === "") this.type = "Normal";
      else this.type = "Todo";
      if(this.image === "") this.image = "https://static8.depositphotos.com/1007173/1012/i/600/depositphotos_10129093-stock-photo-note-with-pin.jpg";
      const response = await axios.post(`${API}/notes/create`, {
        userid: this.user.id,
        title: this.title,
        type: this.type,
        clientX: 100,
        clientY: 120,
        color: 'rgba('+this.picker.r+', '+this.picker.g+', '+this.picker.b+', '+this.picker.a+')',
        imageURL: this.image,
        text: this.text,
        todo: this.todo,
        reminderDate: (this.reminder ? (this.date+" "+this.time+" UTC") : null),
      }, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`
        }
      });
      this.notes = [];
      this.image = "";
      this.loadNotes();
    },
    async removeNote(idnote) {
      const response = await axios.post(`${API}/notes/removenote`, {
        noteid: idnote
      }, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`
        }
      });
      this.notes = [];
      this.loadNotes();
    },
    async removeNoteWithoutLoading(idnote) {
      const response = await axios.post(`${API}/notes/removenote`, {
        noteid: idnote
      }, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`
        }
      });
    },
    async itemCheck(item) {
      const response = await axios.post(`${API}/notes/updatetodo`, {
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
    },
    async returnPositionOfCard (x){
      //this should be on close or refresh and position of component is not set
      const response = await axios.post(`${API}/notes/updateNotePos`, {
        clientX: x.target.parentElement.parentElement.parentElement.parentElement.offsetLeft,
        clientY: x.target.parentElement.parentElement.parentElement.parentElement.offsetTop,
        noteid: x.target.children[0].innerHTML,
      }, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`
        }
      });
    },
    async saveDrawing(e){
      this.addDrawing = false;
      //this.drawings.push({id: this.drawingsId, url: e});
      //this.drawingsId += 1;
      console.log(e.length);
      //SAVE TO DB
      // value too long for type character varying(1000)
      const response = await axios.post(`${API}/drawings/create`, {
        clientX: 0,
        clientY: 0,
        image: e,
      }, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`
        }
      });
      this.drawings = [];
      this.loadDrawings();
    },
    async removeDrawing(id){
      //removedrawing
      console.log(id);
      const response = await axios.post(`${API}/drawings/remove`, {
        drawingid: id
      }, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`
        }
      });
      // this.drawings = this.drawings.filter((drawing) => drawing.id == id);
      this.drawings = [];
      this.loadDrawings();
    },
    async loadDrawings(){
      const response = await axios.post(`${API}/drawings/get`, {
        userid: this.user.id,
      }, {
        headers: {
          'Authorization': `Bearer ${this.user.token}`
        }
      });
      const data = response.data.array;
      data.forEach(async element => {
        this.drawings.push({
          id: element.id,
          clientX: element.clientX,
          clientY: element.clientY,
          url: 'data:image/png;base64,' + Buffer.from(element.image.data).toString('base64')
        });
      });
    },
    modifyDate(date){
      if(date !== null){
        let stringDate = date+"";
        var tmp = stringDate.split('T');
        var tmp2 = tmp[1].split('.')[0];
        return tmp[0]+" "+tmp2.substring(0, tmp2.length - 3);
      }
    },
    getNow() {
      const today = new Date();
      const date = today.getFullYear()+'-'+this.format(today.getMonth()+1)+'-'+this.format(today.getDate());
      const time = today.getHours() + ":" + this.format(today.getMinutes()) ;
      const dateTime = date +' '+ time;
      this.notes.forEach(note => {
        if(this.modifyDate(note.reminderDate) === dateTime){
          this.reminderCalled = true;
          this.reminderData = {title: note.title, date: dateTime, imageURL: note.imageURL};
          note.reminderDate = null;
        }
      });
    },
    format(input){
      return (input < 10 ? '0' : '') + input;
    },
    openEditPanel(id, title, text, reminder, items, image, color){
      this.title = title;
      this.text = text;
      let itemsToString = "";
      if(typeof items !== "undefined"){
        items.forEach(item => {
          itemsToString = itemsToString + item.title+","
        });
      }
      this.todo = itemsToString.substring(0,itemsToString.length-1);
      let colors = color.substring(5, color.length-1).split(',');
      this.picker = {r: colors[0], g: colors[1], b: colors[2], a: colors[3]};
      this.image = image;

      if(reminder != null){
        this.reminder = true;
        let tmp = this.modifyDate(reminder).split(" ");
        this.date = tmp[0];
        this.time = tmp[1];
      }
      this.editingNoteId = id;
      this.editing = true;
    },
    async editNote(){
      this.saveNote();
      this.removeNoteWithoutLoading(this.editingNoteId);
      this.editingNoteId = null;
      this.editing = false;
    }
  },
  created() {
    if (!this.loggedIn) {
      this.$router.push('/login');
      return;
    }
    this.loadNotes();
    this.loadDrawings();
    setInterval(this.getNow, 5000);
  },
}
</script>
