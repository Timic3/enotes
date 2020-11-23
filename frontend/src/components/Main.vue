<template>
  <v-container>
    <v-row>
      <v-col cols="12">
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
        </v-btn>-->
        <v-btn
          color="red lighten-1"
          text
        >
          Clear
        </v-btn>
      </v-col>
      <div v-for="note in notes" :key="note.title" class="ma-lg-1 ma-md-1" >
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
              @click="note.sh=false"
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
              <div  v-if="note.type=='TODO'">
                <v-divider></v-divider>
                <v-list flat subheader three-line>
                  <v-list-item-group
                    v-model="settings"
                    multiple
                    active-class=""
                    v-for="item in note.items" :key="item"
                  >
                    <v-list-item>
                      <template v-slot:default="{ active }">
                        <v-list-item-action>
                          <v-checkbox :input-value="active"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                          <v-list-item-title>{{ item[0] }}</v-list-item-title>
                          <v-list-item-subtitle>{{ item[1] }}</v-list-item-subtitle>
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
          @click="add=false"
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
export default {
  name: 'Main',

  data: () => ({
    notes: [
      {
        title: 'Note1',
        type: 'Normal',
        text: 'Description of note1',
        show: false,
        sh:true,
      },
      {
        title: 'Note2',
        type: 'Normal',
        text: 'Description of note2',
        show: false,
        sh:true,
      },
      {
        title: 'TODO Note1',
        type: 'TODO',
        items: [["Clean room","This is description of Clean room"], ["Wash dishes", "This is description of Wash dishes"], ["Do your homework", "This is description of Do your homework"]],
        show: false,
        sh:true,
      },
      {
        title: 'Note3',
        type: 'Normal',
        text: 'Description of note3',
        show: false,
        sh:true,
      },
    ],
    add: false,
    reminder: false,
  }),
}
</script>
