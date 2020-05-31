<template>
    <div id="main-container">
        <v-app>
            <v-navigation-drawer app>
                <option-list></option-list>
            </v-navigation-drawer>

<!--            <v-app-bar app>-->
<!--                &lt;!&ndash; &ndash;&gt;-->
<!--            </v-app-bar>-->

            <!-- Sizes your content based upon application components -->
            <v-content>

                <!-- Provides the application the proper gutter -->
                <v-container fluid>

                    <!-- If using vue-router -->
                    <router-view></router-view>
                </v-container>
            </v-content>

            <v-footer app>
                <!-- -->
            </v-footer>
        </v-app>
    </div>
</template>

<script>
    import OptionList from "@/components/OptionList";

    export default {
        name: "MainView.vue",
        components: {
            OptionList
        }
    }
</script>

<style scoped>

</style>