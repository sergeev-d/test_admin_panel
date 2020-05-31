<template>
    <div>
<!--        <v-card>-->
            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>{{ userIcon }}</v-icon>
<!--                    <v-img></v-img>-->
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        {{currentUser.login}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{currentUser.role_name}}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
                <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        :to="item.href"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                        @click="logout"
                >
                    <v-list-item-icon>
                        <v-icon>{{ logoutIcon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ logoutTitle }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
<!--        </v-card>-->
    </div>
</template>

<script>
    import { LOGOUT } from "../store/actions.type"
    import { mapGetters } from "vuex"

    export default {
        name: 'OptionList',
        components: {},
        computed: {
            ...mapGetters({
                currentUser : 'currentUser'
            })
        },
        data () {
            return {
                items: [],
                userItems: [],
                userIcon: 'mdi-account-circle',
                logoutIcon: 'mdi-logout',
                logoutTitle: 'Logout'
            }
        },
        methods: {
            logout() {
                this.$store.dispatch(LOGOUT)
                    .then(() => this.$router.push({path: "/login"}))
            },
            prepareItems() {
                if ( this.currentUser.role_name === "admin") {
                    this.items = [
                        { title: 'Scripts', icon: 'mdi-script', href: '/scripts' },
                        { title: 'VM', icon: 'mdi-view-dashboard', href: '/vm' },
                        { title: 'Users', icon: 'mdi-account-multiple', href: '/users' },
                        { title: 'About', icon: 'mdi-help-box', href: '/about' }
                    ]
                } else {
                    this.items = [
                        { title: 'VM', icon: 'mdi-settings', href: '/configuration' },
                        { title: 'Charts', icon: 'mdi-chart-line', href: '/charts' },
                        { title: 'About', icon: 'mdi-help-box', href: '/about' }
                    ]
                }
            }
        },
        beforeMount() {
            this.prepareItems()
        }
    }
</script>

<style>
</style>