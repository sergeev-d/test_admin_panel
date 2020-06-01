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
        <v-responsive height="400" width="800" max-height="800" max-width="1000">
            <canvas ref="myChart"></canvas>
        </v-responsive>

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

        computed: {
            ...mapGetters(["graphItems", "vmDict", "scriptsDict"]),
        },

        beforeDestroy () {
            this.closeGraph()
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
                this.graphReqItem = this.defReqItem;
                if (this.chart) {
                    this.chart.clear()
                }
            },

            createValues(){
                let temp = [];
                this.graphItems.forEach((item) => {
                    let v_item = {};
                    v_item.x = this.formatDate(item.datetime);
                    v_item.y = item.value;
                    temp.push(v_item);
                });
                return temp;
            },

            createLabels(){
                let temp = [];
                this.graphItems.forEach((item) => {
                    temp.push(this.formatDate(item.datetime));
                });
                return temp;
            },

            formatDate(date){
                    let d = new Date(date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear(),
                        hour = d.getHours(),
                        minute = d.getMinutes();



                    if (month.length < 2)
                        month = '0' + month;
                    if (day.length < 2)
                        day = '0' + day;

                    return [year, month, day].join('/')+' '+hour+':'+minute;
            },

            createGraph() {
                this.chart = new Chart(this.$refs.myChart, {
                    type: 'line',
                    data: {
                        labels: this.createLabels(),
                        datasets: [{
                            label: 'Graph',
                            fill: false,
                            data: this.createValues(),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
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
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'value'
                                },
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 100
                                },
                                beginAtZero: true,
                            }]
                        },
                    }
                });
            }
        }
    }
</script>

<style>
</style>