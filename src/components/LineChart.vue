<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Charts</v-toolbar-title>
            <v-divider
                    class="mx-4"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-select
                    :items="vmConf"
                    item-text="name"
                    item-value="id"
                    single-line
                    label="Script"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="fillData">Show Graph</v-btn>
            <v-btn color="blue darken-1" text @click="closeGraph">Close Graph</v-btn>
        </v-toolbar>
        <canvas ref="myChart" :width=1000 :height=1000></canvas>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    import { FETCH_GRAPH, FETCH_VMCONF } from "../store/actions.type"
    import Chart from 'chart.js';

    export default {
        data () {
            return {
                datacollection: null,
                chart: null
            }
        },
        mounted () {
            this.getVMConf();
        },
        methods: {
            fillData () {
                const vmId = 1;
                const scriptId = 5;
                this.$store.dispatch(FETCH_GRAPH, { vmId, scriptId }).then(() =>
                    this.createGraph()
                ).catch((e) => alert("Что-то пошло не так" + e))

            },
            getVMConf () {
                this.$store.dispatch(FETCH_VMCONF);
            },
            closeGraph () {
                if (this.chart) {
                    this.chart.clear()
                }
            },
            getGraphValues(){
                this.graphItems.forEach(
                    item => {
                    item.datetime = new Date(item.datetime)})
                return this.graphItems;
            },
            createGraph() {
                this.chart = new Chart(this.$refs.myChart, {
                    type: 'line',
                    data: {
                        // labels: 'Series',
                        //labels: [1590624929473, 1590625285201, 1590625295211, 1590625305198],
                        datasets: [{
                            label: 'Line Dataset',
                            data: this.getGraphValues,
                            // backgroundColor: [
                            //     'rgba(255, 99, 132, 0.2)',
                            //     'rgba(54, 162, 235, 0.2)',
                            //     'rgba(255, 206, 86, 0.2)',
                            //     'rgba(75, 192, 192, 0.2)',
                            //     'rgba(153, 102, 255, 0.2)',
                            //     'rgba(255, 159, 64, 0.2)'
                            // ],
                            // borderColor: [
                            //     'rgba(255, 99, 132, 1)',
                            //     'rgba(54, 162, 235, 1)',
                            //     'rgba(255, 206, 86, 1)',
                            //     'rgba(75, 192, 192, 1)',
                            //     'rgba(153, 102, 255, 1)',
                            //     'rgba(255, 159, 64, 1)'
                            // ],
                            // borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                type: 'time',
                                // distribution: 'series',
                                // distribution: 'linear',
                                // position: 'bottom',
                                time: {
                                    // unit: 'hour',
                                    // format: 'timeFormat'
                                    // displayFormats: {
                                    //     minute: 'h:mm a'
                                    // }
                                },
                                // offset: true,
                                // stacked: true
                            }],
                            yAxes: [{
                                type: 'linear',
                                position: 'left',
                                beginAtZero: false,
                                distribution: 'linear',
                                // stacked: true
                            }]
                        }
                    }
                });
            }

        },
        computed: {
            ...mapGetters(["graphItems", "vmConf"]),
        },
        beforeDestroy () {
            this.closeGraph()
        }

    }
</script>

<style>
</style>