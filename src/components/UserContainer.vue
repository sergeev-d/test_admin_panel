<template>
    <v-data-table
            :headers="headers"
            :items="userItems"
            sort-by="Script name"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Users</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="600px">
<!--                    <template v-slot:activator="{ on }">-->
<!--                        <v-btn color="primary" dark class="mb-2" v-on="on">New User</v-btn>-->
<!--                    </template>-->
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="24" sm="16" md="12">
                                        <v-text-field v-model="editedItem.login" label="User"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="24" sm="16" md="12">
                                        <v-text-field v-model="editedItem.user_id" label="User Id"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="24" sm="16" md="12">
                                        <v-textarea v-model="editedItem.role_name" label="Role Name"></v-textarea>
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
<!--            <v-icon-->
<!--                    small-->
<!--                    class="mr-2"-->
<!--                    @click="editItem(item)"-->
<!--            >-->
<!--                mdi-pencil-->
<!--            </v-icon>-->
            <v-icon
                    small
                    @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="fetchUsers">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import { mapGetters } from "vuex"
    import { FETCH_USER, DELETE_USER_ITEM } from "../store/actions.type"

    export default {
        data: () => ({
            dialog: false,
            headers: [
                {
                    text: 'User',
                    align: 'start',
                    sortable: false,
                    value: 'login',
                },
                { text: 'User ID', value: 'user_id' },
                { text: 'Role Name', value: 'role_name' },
                { text: 'Status', value: 'user_status' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            editedIndex: -1,
            editedItem: {
                login: '',
                user_id: 0,
                role_name: '',
                user_status: '',
            },
            defaultItem: {
                login: '',
                user_id: 0,
                role_name: '',
                user_status: '',
            },
        }),

        computed: {
            ...mapGetters(["userItems"]),

            formTitle () {
                return this.editedIndex === -1 ? 'New User' : 'Edit User'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },


        mounted() {
            this.fetchUsers();
        },

        methods: {
            fetchUsers () {
                this.$store.dispatch(FETCH_USER);
            },

            deleteUserItem(userId) {
                this.$store.dispatch(DELETE_USER_ITEM, userId).then(() => this.fetchUsers());
            },
            //
            // addScriptItem(scriptItem) {
            //     this.$store.dispatch(ADD_SCRIPT_ITEM, scriptItem).then(() => this.fetchScripts());
            // },
            //
            // changeScriptItem(scriptItem, scriptId) {
            //     this.$store.dispatch(CHANGE_SCRIPT_ITEM, {scriptItem, scriptId}).then(() => this.fetchScripts());
            // },

            // editItem (item) {
            //     this.editedIndex = this.scriptItems.indexOf(item);
            //     this.editedItem = Object.assign({}, item);
            //     this.dialog = true
            // },
            //
            deleteItem (item) {
                confirm('Are you sure you want to delete this item?');
                this.deleteUserItem(item.user_id)
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
                    this.changeScriptItem(this.editedItem, this.scriptItems[this.editedIndex].user_id)
                } else {
                    this.addScriptItem(this.editedItem)
                }
            },
        },
    }
</script>

<style scoped>

</style>