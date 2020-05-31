<template>
    <v-data-table
            :headers="headers"
            :items="scriptItems"
            sort-by="Script name"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Script Items</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Script</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="24" sm="16" md="12">
                                        <v-text-field v-model="editedItem.name" label="Script Name"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="24" sm="16" md="12">
                                        <v-text-field v-model="editedItem.script_body" label="Script"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="24" sm="16" md="12">
                                        <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="24" sm="16" md="12">
                                        <v-textarea v-model="editedItem.recommendations" label="Recommendation"></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                    small
                    @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="fetchScripts">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import { mapGetters } from "vuex"
    import { FETCH_SCRIPT, DELETE_SCRIPT_ITEM, ADD_SCRIPT_ITEM, CHANGE_SCRIPT_ITEM } from "../store/actions.type"

    export default {
        data: () => ({
            dialog: false,
            headers: [
                {
                    text: 'Script name',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Script', value: 'script_body' },
                { text: 'Description', value: 'description' },
                { text: 'Recommendation', value: 'recommendations' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            scriptTestItems: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                script_body: '',
                description: '',
                recommendations: ''
            },
            defaultItem: {
                name: '',
                script_body: '',
                description: '',
                recommendations: ''
            },
        }),

        computed: {
            ...mapGetters(["scriptItems"]),

            formTitle () {
                return this.editedIndex === -1 ? 'New Script' : 'Edit Script'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        // created () {
        //     this.initialize()
        // },

        mounted() {
            this.fetchScripts();
        },

        methods: {
            fetchScripts () {
                this.$store.dispatch(FETCH_SCRIPT);
            },

            deleteScriptItem(scriptItem) {
                this.$store.dispatch(DELETE_SCRIPT_ITEM, scriptItem);
                this.fetchScripts()
            },

            addScriptItem(scriptItem) {
                this.$store.dispatch(ADD_SCRIPT_ITEM, scriptItem);
                this.fetchScripts()
            },

            changeScriptItem(scriptItem, scriptId) {
                this.$store.dispatch(CHANGE_SCRIPT_ITEM, {scriptItem, scriptId});
                this.fetchScripts()
            },

            editItem (item) {
                this.editedIndex = this.scriptItems.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                confirm('Are you sure you want to delete this item?');
                this.deleteScriptItem(item.script_id)
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                    //Object.assign(this.vmItemsTest[this.editedIndex], this.editedItem)
                    this.changeScriptItem(this.editedItem, this.scriptItems[this.editedIndex].script_id)
                } else {
                    this.addScriptItem(this.editedItem)
                    //this.vmItems.push(this.editedItem)
                }
            },
        },
    }
</script>

<style scoped>

</style>