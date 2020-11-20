<template>
	<v-container>
		<v-row>
            <v-col cols="12">
                <v-btn
                    color="green lighten-1"
                    text
                >
                    Add note
                </v-btn>
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
                </v-btn>
            </v-col>
            <div v-for="note in notes" :key="note.title" class="ma-lg-1 ma-md-1" >
				<v-card
                    elevation="1" 
                    outlined
                    max-width="438"
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
				},
				{
                    title: 'Note2',
                    type: 'Normal',
                    text: 'Description of note2',
                    show: false,
                },
                {
                    title: 'TODO Note1',
                    type: 'TODO',
                    items: [["Clean room","This is description of Clean room"], ["Wash dishes", "This is description of Wash dishes"], ["Do your homework", "This is description of Do your homework"]],
                    show: false,
				},
				{
                    title: 'Note3',
                    type: 'Normal',
                    text: 'Description of note3',
                    show: false,
				},
			],
            
		}),
	}
</script>
