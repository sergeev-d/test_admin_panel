<template>
    <v-data-table
            :headers="headers"
            :items="vmItems"
            sort-by="calories"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>VM Items</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.ip" label="IP Address"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.dns_name" label="Domain Name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.cpu" type="number" label="CPU (core)"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.memory" type="number" label="Memory (GB)"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.hdd" type="number" label="HDD (GB)"></v-text-field>
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
            <v-btn color="primary" @click="fetchVM">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import { mapGetters } from "vuex"
    import { FETCH_VM, DELETE_VM_ITEM, ADD_VM_ITEM, CHANGE_VM_ITEM } from "../store/actions.type"

    export default {
        data: () => ({
            dialog: false,
            headers: [
                {
                    text: 'IP VM',
                    align: 'start',
                    sortable: false,
                    value: 'ip',
                },
                { text: 'Domain Name', value: 'dns_name' },
                { text: 'CPU (Core)', value: 'cpu' },
                { text: 'Memory (GB)', value: 'memory' },
                { text: 'HDD (GB)', value: 'hdd' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            vmItemsTest: [],
            editedIndex: -1,
            editedItem: {
                ip: '',
                dns_name: '',
                cpu: 0,
                memory: 0,
                hdd: 0
            },
            defaultItem: {
                ip: '',
                dns_name: '',
                cpu: 0,
                memory: 0,
                hdd: 0
            },
        }),

        computed: {
            ...mapGetters(["vmItems"]),

            formTitle () {
                return this.editedIndex === -1 ? 'New VM Item' : 'Edit VM Item'
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

        created() {
            this.fetchVM();
        },

        methods: {
            fetchVM () {
                this.$store.dispatch(FETCH_VM);
            },

            deleteScriptItem(vmId) {
                this.$store.dispatch(DELETE_VM_ITEM, vmId);
                this.fetchVM()
            },

            addScriptItem(vmItem) {
                this.$store.dispatch(ADD_VM_ITEM, vmItem);
                this.fetchVM()
            },

            changeScriptItem(vmItem, vmId) {
                this.$store.dispatch(CHANGE_VM_ITEM, {vmItem, vmId});
                this.fetchVM()
            },

            editItem (item) {
                this.editedIndex = this.vmItems.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                confirm('Are you sure you want to delete this item?');
                this.deleteScriptItem(item.vm_id)
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                    this.changeScriptItem(this.editedItem, this.vmItems[this.editedIndex].vm_id)
                } else {
                    this.addScriptItem(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>

<style scoped>

</style>