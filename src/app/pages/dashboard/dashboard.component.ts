// angular import
import { Component, OnInit, ViewChild } from '@angular/core';

// project import
import tableData from 'src/fake-data/default-data.json';
import { SharedModule } from 'src/app/theme/shared/shared.module';

// bootstrap import
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

// third party
import { NgApexchartsModule } from 'ng-apexcharts';
import ApexCharts from 'apexcharts';
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexXAxis,
    ApexYAxis,
    ApexStroke,
    ApexGrid,
    ApexLegend
} from 'ng-apexcharts';
import { DataFetcherService } from './dashboard.service';
import { CheckPointData } from 'src/app/interfaces/arrival.interface';
import { IVehicleType } from 'src/app/interfaces/vehicle.type';
import { vehicles } from 'src/app/utils/vehicle.util';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    xaxis: ApexXAxis;
    colors: string[];
    stroke: ApexStroke;
    grid: ApexGrid;
    yaxis: ApexYAxis;
    legend: ApexLegend;
};

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [NgApexchartsModule, SharedModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
    checkPointData: CheckPointData[] = [];
    vehicleType: IVehicleType[] = vehicles;
    isLoading = false;
    // public props
    @ViewChild('chart') chart: ChartComponent;
    chartOptions_4: Partial<ChartOptions>;
    chartOptions_5: Partial<ChartOptions>;
    chartOptions_6: Partial<ChartOptions>;

    monthChart: any;
    weekChart: any;
    dayChart: any;

    // constructor
    constructor(private dataFetcher: DataFetcherService) {
        this.chartOptions_6 = {
            chart: {
                type: 'bar',
                height: 430,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '20%',
                    borderRadius: 4
                }
            },
            stroke: {
                show: true,
                width: 8,
                colors: ['transparent']
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                show: true,
                fontFamily: `'Public Sans', sans-serif`,
                offsetX: 10,
                offsetY: 10,
                labels: {
                    useSeriesColors: false
                },
                markers: {
                    width: 10,
                    height: 10,
                    radius: 50
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 5
                }
            },
            colors: ['#A3D8FF', '#94FFD8'],
            series: [
                {
                    name: 'Net Profit',
                    data: [180, 90, 135, 114, 120, 145]
                },
                {
                    name: 'Revenue',
                    data: [120, 45, 78, 150, 168, 99]
                }
            ],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
            }
        };
    }

    // life cycle event
    ngOnInit(): void {
        this.isLoading = true;
        this.dataFetcher.getDayData().subscribe(
            (data) => {
                // refactor object to match to the VehicleType
                const newValues = data.data.map((item) => {
                    const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                    return {
                        ...item,
                        vehicle_type: findVehicle.la
                    };
                });

                this.checkPointData = newValues;
                console.log(this.checkPointData);

                this.isLoading = false;
            },
            (error) => {
                this.isLoading = false;
                throw new Error(error);
            }
        );
    }

    // public method
    onNavChange(changeEvent: NgbNavChangeEvent) {
        if (changeEvent.nextId === 1) {
            this.isLoading = true;
            this.dataFetcher.getDayData().subscribe(
                (data) => {
                    // refactor object to match to the VehicleType
                    const newValues = data.data.map((item) => {
                        const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                        return {
                            ...item,
                            vehicle_type: findVehicle.la
                        };
                    });

                    this.checkPointData = newValues;
                    console.log(this.checkPointData);

                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                    throw new Error(error);
                }
            );
        }

        if (changeEvent.nextId === 2) {
            this.isLoading = true;
            this.dataFetcher.getWeekData().subscribe(
                (data) => {
                    // refactor object to match to the VehicleType
                    const newValues = data.data.map((item) => {
                        const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                        return {
                            ...item,
                            vehicle_type: findVehicle.la
                        };
                    });

                    this.checkPointData = newValues;
                    console.log(this.checkPointData);

                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                    throw new Error(error);
                }
            );
        }

        if (changeEvent.nextId === 3) {
            this.isLoading = true;
            this.dataFetcher.getMonthData().subscribe(
                (data) => {
                    // refactor object to match to the VehicleType
                    const newValues = data.data.map((item) => {
                        const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                        return {
                            ...item,
                            vehicle_type: findVehicle.la
                        };
                    });

                    this.checkPointData = newValues;
                    console.log(this.checkPointData);

                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                    throw new Error(error);
                }
            );
        }
    }

    monthOptions = {
        chart: {
            height: 450,
            type: 'area',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#1890ff', '#13c2c2'],
        series: [
            {
                name: 'Page Views',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35]
            },
            {
                name: 'Sessions',
                data: [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41]
            }
        ],
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    };

    weekOptions = {
        chart: {
            height: 450,
            type: 'area',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#1890ff', '#13c2c2'],
        series: [
            {
                name: 'Page Views',
                data: [31, 40, 28, 51, 42, 109, 100]
            },
            {
                name: 'Sessions',
                data: [11, 32, 45, 32, 34, 52, 41]
            }
        ],
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
    };

    dayOptions = {
        chart: {
            height: 450,
            type: 'area',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#75A47F', '#00215E', '#FFC55A', '#FC4100', '#FF76CE', '#FDFFC2', '#FFC2C2', '#C2FFC2', '#C2C2FF', '#803D3B', '#1E0342', '#222831'],
        series: this.checkPointData.map((item) => {
            return {
                name: item.vehicle_type,
                data: this.checkPointData.map((i) => i.count)
            };
        }),
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            categories: this.checkPointData.map((item) => item.vehicle_type)
        }
    };

    card = [
        {
            title: 'Total Page Views',
            amount: '4,42,236',
            background: 'bg-light-primary ',
            border: 'border-primary',
            icon: 'ti ti-trending-up',
            percentage: '59.3%',
            color: 'text-primary',
            number: '35,000'
        },
        {
            title: 'Total Users',
            amount: '78,250',
            background: 'bg-light-success ',
            border: 'border-success',
            icon: 'ti ti-trending-up',
            percentage: '70.5%',
            color: 'text-success',
            number: '8,900'
        },
        {
            title: 'Total Order',
            amount: '18,800',
            background: 'bg-light-warning ',
            border: 'border-warning',
            icon: 'ti ti-trending-down',
            percentage: '27.4%',
            color: 'text-warning',
            number: '1,943'
        },
        {
            title: 'Total Sales',
            amount: '$35,078',
            background: 'bg-light-danger ',
            border: 'border-danger',
            icon: 'ti ti-trending-down',
            percentage: '27.4%',
            color: 'text-danger',
            number: '$20,395'
        }
    ];

    tables = tableData;

    transaction = [
        {
            background: 'text-success bg-light-success',
            icon: 'ti ti-gift',
            title: 'Order #002434',
            time: 'Today, 2:00 AM',
            amount: '+ $1,430',
            percentage: '78%'
        },
        {
            background: 'text-primary bg-light-primary',
            icon: 'ti ti-message-circle',
            title: 'Order #984947',
            time: '5 August, 1:45 PM',
            amount: '- $302',
            percentage: '8%'
        },
        {
            background: 'text-danger bg-light-danger',
            icon: 'ti ti-settings',
            title: 'Order #988784',
            time: '7 hours ago',
            amount: '- $682',
            percentage: '16%'
        }
    ];
}
