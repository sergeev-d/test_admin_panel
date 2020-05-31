<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Charts</v-toolbar-title>
            <v-divider
                    class="mx-4"
                    inset
                    vertical
            ></v-divider>
            <v-row>
                <v-col>
                    <v-select
                            v-model="graphReqItem.vm_id"
                            :items="vmDict"
                            item-text=ip
                            item-value=vm_id
                            single-line
                            label="IP Address"
                    ></v-select>
                </v-col>
                <v-col>
                    <v-select
                            v-model="graphReqItem.script_id"
                            :items="scriptsDict"
                            item-text=name
                            item-value=script_id
                            single-line
                            label="Script Name"
                    ></v-select>
                </v-col>
            </v-row>
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
    const timeFormat = 'MM/DD/YYYY HH:mm';

    export default {
        data () {
            return {
                chart: null,
                graphReqItem: {
                    vm_id: '',
                    script_id: '',
                },
                defReqItem: {
                    vm_id: '',
                    script_id: '',
                }
            }
        },
        mounted () {
            this.getVMConf();
        },
        methods: {
            fillData () {
                //todo validations
                let vmId = this.graphReqItem.vm_id;
                let scriptId = this.graphReqItem.script_id;
                this.$store.dispatch(FETCH_GRAPH, { vmId, scriptId }).then(() =>
                    this.createGraph()
                ).catch((e) => alert("Что-то пошло не так" + e))

            },
            getVMConf () {
                this.$store.dispatch(FETCH_VMCONF);
            },
            closeGraph () {
                this.graphReqItem = this.defReqItem
                if (this.chart) {
                    this.chart.clear()
                }
            },
            getGraphValues(){
                this.graphItems.forEach(
                    item => {
                    item.datetime = new Date(item.datetime).format(timeFormat)});
                return this.graphItems;
            },
            createGraph() {
                this.chart = new Chart(this.$refs.myChart, {
                    type: 'line',
                    data: {
                        datasets: [{
                            fill: false,
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
                    // options: {
                    //     scales: {
                    //         xAxes: [{
                    //             type: 'time',
                    //             // distribution: 'series',
                    //             // distribution: 'linear',
                    //             // position: 'bottom',
                    //             time: {
                    //                 // unit: 'hour',
                    //                 // format: 'timeFormat'
                    //                 // displayFormats: {
                    //                 //     minute: 'h:mm a'
                    //                 // }
                    //             },
                    //             // offset: true,
                    //             // stacked: true
                    //         }],
                    //         yAxes: [{
                    //             type: 'linear',
                    //             position: 'left',
                    //             beginAtZero: false,
                    //             distribution: 'linear',
                    //             // stacked: true
                    //         }]
                    //     }
                    // }
                    options: {
                        title: {
                            text: 'Chart.js Time Scale'
                        },
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    parser: timeFormat,
                                    // round: 'day'
                                    tooltipFormat: 'll HH:mm'
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Date'
                                }
                            },
                            y: {
                                scaleLabel: {
                                    display: true,
                                    labelString: 'value'
                                }
                            }
                        },
                    }
                });
            }

        },
        computed: {
            ...mapGetters(["graphItems", "vmDict", "scriptsDict"]),
        },
        beforeDestroy () {
            this.closeGraph()
        }

    }
</script>

<style>
</style>