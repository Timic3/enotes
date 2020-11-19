<template >
	<v-container>
		<v-row>
            <v-col cols="12">
				<h2 class="headline font-weight-bold mb-3">
					Here are your notes:
				</h2>
            </v-col>
            <div v-for="note in notes" :key="note.title" class="ma-lg-1 ma-md-1">
				<v-card
                    elevation="1" 
                    outlined
                    max-width="500"
                    
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
                            <v-divider></v-divider>
                            <v-card-text>
                                {{ note.text }}
                            </v-card-text>
                        </div>
                    </v-expand-transition>
				</v-card>
            </div>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: 'HelloWorld',

		data: () => ({
			notes: [
				{
                    title: 'Note1',
                    text: 'Description of note1',
                    show: false,
				},
				{
                    title: 'Note2',
                    text: 'Description of note2',
                    show: false,
				},
				{
                    title: 'Note3',
                    text: 'Description of note3',
                    show: false,
				},
			],
            
		}),
	}
</script>
