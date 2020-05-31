<template>
    <v-data-table
            :headers="headers"
            :items="vmConf"
            sort-by="id"
            class="elevation-1"
            group-by="ip"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>VM Configurations</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Configuration</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="16" sm="12" md="8">
                                        <v-select
                                                v-model="vmConfEditedItem.vm_id"
                                                :items="vmDict"
                                                item-text=ip
                                                item-value=vm_id
                                                single-line
                                                label="IP Address"
                                        ></v-select>
                                    </v-col>
                                </v-row>
                                <v-spacer></v-spacer>
                                <v-row>
                                    <v-col cols="16" sm="12" md="8">
                                        <v-select
                                                v-model="vmConfEditedItem.script_id"
                                                :items="scriptsDict"
                                                item-text=name
                                                item-value=script_id
                                                single-line
                                                label="Script Name"
                                        ></v-select>
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
            <v-btn color="primary" @click="fetchVMConf">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import {ADD_VMCONF_ITEM, DELETE_VMCONF_ITEM, FETCH_VMCONF} from "../store/actions.type";
    import { mapGetters } from "vuex"

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
                { text: 'Script', value: 'name' },
                { text: 'Description', value: 'description' },
                { text: 'Recommendation', value: 'recommendations' },
                { text: 'Actions', value: 'actions', sortable: false }
            ],
            vmConfEditedIndex: -1,
            vmConfEditedItem: {
                vm_id: '',
                script_id: '',
            },
            vmConfDefaultItem: {
                vm_id: '',
                script_id: '',
            },
        }),

        computed: {
            ...mapGetters(["vmConf", "vmDict", "scriptsDict"]),

            formTitle () {
                return this.vmConfEditedIndex === -1 ? 'New Configuration' : 'Edit Configuration'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        mounted() {
            this.fetchVMConf();
        },

        methods: {
            fetchVMConf () {
                this.$store.dispatch(FETCH_VMCONF)
                    .catch((e) => alert(e));
            },

            deleteVmConfItem(id) {
                this.$store.dispatch(DELETE_VMCONF_ITEM, id).then(() => this.fetchVMConf());
            },

            addVmConfItem(vmConfItem) {
                this.$store.dispatch(ADD_VMCONF_ITEM, vmConfItem).then(() => this.fetchVMConf());
            },

            deleteItem (item) {
                const index = this.vmConf.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.vmConf.splice(index, 1)
                this.deleteVmConfItem(item.id)
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.vmConfEditedItem = Object.assign({}, this.vmConfDefaultItem);
                    this.vmConfEditedIndex = -1
                })
            },

            save () {
                this.addVmConfItem(this.vmConfEditedItem);
                this.close()
            },
        },
    }
</script>