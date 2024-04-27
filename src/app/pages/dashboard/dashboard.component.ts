// angular import
import { Component, OnInit, ViewChild } from '@angular/core';

// project import
import tableData from 'src/fake-data/default-data.json';
import { SharedModule } from 'src/app/theme/shared/shared.module';

// bootstrap import
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

// third party
import { NgApexchartsModule } from 'ng-apexcharts';
import { DataFetcherService } from './dashboard.service';
import { CheckPointData } from 'src/app/interfaces/arrival.interface';
import { IVehicleType } from 'src/app/interfaces/vehicle.type';
import { vehicles } from 'src/app/utils/vehicle.util';
import ApexCharts from 'apexcharts';
import { numberWithCommas } from 'src/app/utils/round-number.shared';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [NgApexchartsModule, SharedModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
    checkPointData: CheckPointData[] | any = [];
    tableData: any = [];
    totalIncome: string = '0';
    totalPassedVehicle: string = '0';
    vehicleType: IVehicleType[] = vehicles;
    isLoading = false;
    chartOptions: any;
    passedCarChartData: any;
    revenueChartData: any;

    constructor(private dataFetcher: DataFetcherService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.dataFetcher.getDayData().subscribe(
            (data) => {
                // refactor object to match to the VehicleType
                const newValues = data.data.map((item) => {
                    const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                    return {
                        vehicle_type: findVehicle.la,
                        count: numberWithCommas(item.count),
                        total: numberWithCommas(item.count * findVehicle.price)
                    };
                });

                this.checkPointData = newValues;
                this.totalIncome = numberWithCommas(
                    data.data.reduce((acc, item) => {
                        const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                        return acc + item.count * findVehicle.price;
                    }, 0)
                );
                this.totalPassedVehicle = numberWithCommas(
                    data.data.reduce((acc, item) => {
                        return acc + item.count;
                    }, 0)
                );

                // ---- chart data ----
                const seriesData = [
                    {
                        name: 'ຂໍ້ມູນການຜ່ານເຂົ້າອອກຂອງລົດແຕ່ລະປະເພດ',
                        data: data.data.map((item) => item.count)
                    }
                ];

                const categories = data.data.map((item) => {
                    const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                    return findVehicle.la;
                });

                const passedCarOptions = {
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
                    colors: ['#FFC55A'],
                    series: seriesData,
                    stroke: {
                        curve: 'smooth',
                        width: 2
                    },
                    xaxis: {
                        categories: categories
                    }
                };

                // revenue series data
                const revenueSeriesData = [
                    {
                        name: 'ລາຍຮັບທັງໝົດ',
                        data: data.data.map((item) => {
                            const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                            return item.count * findVehicle.price;
                        })
                    }
                ];

                this.chartOptions = {
                    chart: {
                        type: 'bar',
                        height: 365,
                        toolbar: {
                            show: false
                        }
                    },
                    colors: ['#8DECB4'],
                    plotOptions: {
                        bar: {
                            columnWidth: '12%',
                            borderRadius: 2
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    series: revenueSeriesData,
                    stroke: {
                        curve: 'smooth',
                        width: 2
                    },
                    xaxis: {
                        categories: categories,
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        }
                    },
                    yaxis: {
                        show: false
                    },
                    grid: {
                        show: false
                    }
                };

                setTimeout(() => {
                    this.passedCarChartData = new ApexCharts(document.querySelector('#visitor-chart-1'), passedCarOptions);
                    this.passedCarChartData.render();
                }, 500);

                this.isLoading = false;
            },
            (error) => {
                this.isLoading = false;
                throw new Error(error);
            }
        );
    }

    onNavChange(changeEvent: NgbNavChangeEvent) {
        if (changeEvent.nextId === 1) {
            this.isLoading = true;
            this.dataFetcher.getDayData().subscribe(
                (data) => {
                    // refactor object to match to the VehicleType
                    const newValues = data.data.map((item) => {
                        const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                        return {
                            vehicle_type: findVehicle.la,
                            count: numberWithCommas(item.count),
                            total: numberWithCommas(item.count * findVehicle.price)
                        };
                    });

                    this.checkPointData = newValues;
                    this.totalIncome = numberWithCommas(
                        data.data.reduce((acc, item) => {
                            const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                            return acc + item.count * findVehicle.price;
                        }, 0)
                    );
                    this.totalPassedVehicle = numberWithCommas(
                        data.data.reduce((acc, item) => {
                            return acc + item.count;
                        }, 0)
                    );

                    // ---- chart data ----
                    const seriesData = [
                        {
                            name: 'ຂໍ້ມູນການຜ່ານເຂົ້າອອກຂອງລົດແຕ່ລະປະເພດ',
                            data: data.data.map((item) => item.count)
                        }
                    ];

                    const categories = data.data.map((item) => {
                        const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                        return findVehicle.la;
                    });

                    const passedCarOptions = {
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
                        colors: ['#FFC55A'],
                        series: seriesData,
                        stroke: {
                            curve: 'smooth',
                            width: 2
                        },
                        xaxis: {
                            categories: categories
                        }
                    };

                    // revenue series data
                    const revenueSeriesData = [
                        {
                            name: 'ລາຍຮັບທັງໝົດ',
                            data: data.data.map((item) => {
                                const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                                return item.count * findVehicle.price;
                            })
                        }
                    ];

                    this.chartOptions = {
                        chart: {
                            type: 'bar',
                            height: 365,
                            toolbar: {
                                show: false
                            }
                        },
                        colors: ['#8DECB4'],
                        plotOptions: {
                            bar: {
                                columnWidth: '12%',
                                borderRadius: 2
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        series: revenueSeriesData,
                        stroke: {
                            curve: 'smooth',
                            width: 2
                        },
                        xaxis: {
                            categories: categories,
                            axisBorder: {
                                show: false
                            },
                            axisTicks: {
                                show: false
                            }
                        },
                        yaxis: {
                            show: false
                        },
                        grid: {
                            show: false
                        }
                    };

                    setTimeout(() => {
                        this.passedCarChartData = new ApexCharts(document.querySelector('#visitor-chart-1'), passedCarOptions);
                        this.passedCarChartData.render();
                    }, 500);

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
                            vehicle_type: findVehicle.la,
                            count: numberWithCommas(item.count),
                            total: numberWithCommas(item.count * findVehicle.price)
                        };
                    });

                    this.checkPointData = newValues;
                    this.totalIncome = numberWithCommas(
                        data.data.reduce((acc, item) => {
                            const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                            return acc + item.count * findVehicle.price;
                        }, 0)
                    );
                    this.totalPassedVehicle = numberWithCommas(
                        data.data.reduce((acc, item) => {
                            return acc + item.count;
                        }, 0)
                    );

                    // ---- chart data ----
                    const seriesData = [
                        {
                            name: 'ຂໍ້ມູນການຜ່ານເຂົ້າອອກຂອງລົດແຕ່ລະປະເພດ',
                            data: data.data.map((item) => item.count)
                        }
                    ];

                    const categories = data.data.map((item) => {
                        const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                        return findVehicle.la;
                    });

                    const passedCarOptions = {
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
                        colors: ['#FFC55A'],
                        series: seriesData,
                        stroke: {
                            curve: 'smooth',
                            width: 2
                        },
                        xaxis: {
                            categories: categories
                        }
                    };

                    // revenue series data
                    const revenueSeriesData = [
                        {
                            name: 'ລາຍຮັບທັງໝົດ',
                            data: data.data.map((item) => {
                                const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                                return item.count * findVehicle.price;
                            })
                        }
                    ];

                    this.chartOptions = {
                        chart: {
                            type: 'bar',
                            height: 365,
                            toolbar: {
                                show: false
                            }
                        },
                        colors: ['#8DECB4'],
                        plotOptions: {
                            bar: {
                                columnWidth: '12%',
                                borderRadius: 2
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        series: revenueSeriesData,
                        stroke: {
                            curve: 'smooth',
                            width: 2
                        },
                        xaxis: {
                            categories: categories,
                            axisBorder: {
                                show: false
                            },
                            axisTicks: {
                                show: false
                            }
                        },
                        yaxis: {
                            show: false
                        },
                        grid: {
                            show: false
                        }
                    };

                    setTimeout(() => {
                        this.passedCarChartData = new ApexCharts(document.querySelector('#visitor-chart-1'), passedCarOptions);
                        this.passedCarChartData.render();
                    }, 500);

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
                    // refactor object to match to the VehicleType
                    const newValues = data.data.map((item) => {
                        const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                        return {
                            vehicle_type: findVehicle.la,
                            count: numberWithCommas(item.count),
                            total: numberWithCommas(item.count * findVehicle.price)
                        };
                    });

                    this.checkPointData = newValues;
                    this.totalIncome = numberWithCommas(
                        data.data.reduce((acc, item) => {
                            const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                            return acc + item.count * findVehicle.price;
                        }, 0)
                    );
                    this.totalPassedVehicle = numberWithCommas(
                        data.data.reduce((acc, item) => {
                            return acc + item.count;
                        }, 0)
                    );

                    // ---- chart data ----
                    const seriesData = [
                        {
                            name: 'ຂໍ້ມູນການຜ່ານເຂົ້າອອກຂອງລົດແຕ່ລະປະເພດ',
                            data: data.data.map((item) => item.count)
                        }
                    ];

                    const categories = data.data.map((item) => {
                        const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                        return findVehicle.la;
                    });

                    const passedCarOptions = {
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
                        colors: ['#FFC55A'],
                        series: seriesData,
                        stroke: {
                            curve: 'smooth',
                            width: 2
                        },
                        xaxis: {
                            categories: categories
                        }
                    };

                    // revenue series data
                    const revenueSeriesData = [
                        {
                            name: 'ລາຍຮັບທັງໝົດ',
                            data: data.data.map((item) => {
                                const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
                                return item.count * findVehicle.price;
                            })
                        }
                    ];

                    const revenueOptions = {
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
                        colors: ['#C65BCF'],
                        series: revenueSeriesData,
                        stroke: {
                            curve: 'smooth',
                            width: 2
                        },
                        xaxis: {
                            categories: categories
                        }
                    };

                    setTimeout(() => {
                        this.passedCarChartData = new ApexCharts(document.querySelector('#visitor-chart-3'), passedCarOptions);
                        this.passedCarChartData.render();
                        this.revenueChartData = new ApexCharts(document.querySelector('#revenue-chart-3'), revenueOptions);
                        this.revenueChartData.render();
                    }, 500);

                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                    throw new Error(error);
                }
            );
        }
    }
}
