// angular import
import { Component, inject, OnInit } from '@angular/core';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbNavChangeEvent, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

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
    imports: [NgApexchartsModule, SharedModule, NgbTooltipModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
    checkPointData: CheckPointData[] | any = [];
    csvData: CheckPointData[] = [];

    tableData: any = [];
    totalIncome: string = '0';
    totalPassedVehicle: string = '0';
    vehicleType: IVehicleType[] = vehicles;
    isLoading = false;
    chartOptions: any;
    passedCarChartData: any;
    revenueChartData: any;

    // Date picker range
    calendar = inject(NgbCalendar);
    formatter = inject(NgbDateParserFormatter);
    minDate: NgbDateStruct;
    maxDate: NgbDateStruct;

    hoveredDate: NgbDate | null = null;
    fromDate: NgbDate | null = this.calendar.getPrev(this.calendar.getToday(), 'd', 0);
    toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 0);
    isDisabled = (date: NgbDate, current: { month: number }) => date.month !== current.month;

    constructor(private dataFetcher: DataFetcherService) {
        const today = new Date();
        this.maxDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
        this.minDate = { year: this.maxDate.year, month: this.maxDate.month, day: this.maxDate.day - 7 };
    }

    ngOnInit(): void {
        this.fetchDataOnDateRange();
    }

    fetchDataOnDateRange() {
        const startDate = `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`;
        const endDate = `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`;

        console.log('from --->> ', startDate, 'to --->> ', endDate);

        this.isLoading = true;
        this.dataFetcher.getCSVData(startDate, endDate).subscribe(
            (data) => {
                this.csvData = data.data;
                console.log('csvData -->> ', this.csvData);
            },
            (error) => {
                this.isLoading = false;
                throw new Error(error);
            }
        );

        this.dataFetcher.getData(startDate, endDate).subscribe(
            (data) => {
                console.log('fetchDataOnDateRange -->> ', data.data);
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

    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
            this.toDate = date;
            console.log('from -', this.fromDate, 'to -', this.toDate);
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
    }

    isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
        return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
        const newDate = date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
        return newDate;
    }

    validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
        const parsed = this.formatter.parse(input);
        return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }

    csvExport() {
        // get filename with current date format like PTL-2021-09-01.csv
        const today = Date.now();
        const filename = `PTL-${today}.csv`;

        const csvData = this.csvData.map((item, index: number) => {
            const findVehicle = this.vehicleType.find((v) => v.type === item.vehicle_type);
            const total = item.count * findVehicle.price;

            const sumAmount = numberWithCommas(total);
            const countAmount = numberWithCommas(item.count);
            const totalSumAmount = numberWithCommas(total);
            const totalSumCount = numberWithCommas(item.count);
            const totalCountAmount = numberWithCommas(item.count);

            // Adjust the return statement to match the structure of your data
            return `${new Date()},${sumAmount},${countAmount},${totalSumAmount},${totalCountAmount},${today.toString()},${vehicles[0].price},${vehicles[1].price},${vehicles[3].price},${vehicles[4].price},${vehicles[5].price},${vehicles[6].price},${vehicles[7]},${vehicles[8].price},${vehicles[9].price},${vehicles[10].price},${vehicles[11].price},${vehicles[12].price},${vehicles[1].price},${vehicles[6].price},${vehicles[8].price},${vehicles[13].price},${vehicles[1].price},${vehicles[3].price},${vehicles[4].price},${vehicles[5].price},${vehicles[6].price},${vehicles[7]},${vehicles[8].price},${vehicles[9].price},${vehicles[10].price},${vehicles[11].price},${vehicles[12].price},${vehicles[1].price},${vehicles[6].price},${vehicles[8].price}`;
        });

        const csvHeader = [
            'Data, Amount,Sum - Amount,Count - Amount,Total Sum - Amount,Total Count - Amount,Date,15.000,20.000,25.000,30.000,35.000,40.000,45.000,50.000,100.000,115.000,120.000,125.000,200.000,400.000,500.000,15.000,20.000,25.000,30.000,35.000,40.000,45.000,50.000,100.000,115.000,120.000,125.000,200.000,400.000,500.000'
        ];

        csvHeader.push(...csvData);

        const csvContent = csvHeader.join('\n');

        console.log('csvContent -->> ', csvContent);
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}
