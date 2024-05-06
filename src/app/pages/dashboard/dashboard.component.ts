// angular import
import { Component, inject, OnInit } from '@angular/core';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbNavChangeEvent, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

// third party
import { NgApexchartsModule } from 'ng-apexcharts';
import { DataFetcherService } from './dashboard.service';
import { CheckPointData } from 'src/app/interfaces/arrival.interface';
import { IVehicleType } from 'src/app/interfaces/vehicle.type';
import { vehicles } from 'src/app/utils/vehicle.util';
import ApexCharts from 'apexcharts';
import { numberWithCommas } from 'src/app/utils/round-number.shared';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from './custom-adapter';

const MY_DATE_FORMATS = {
    parse: {
        dateInput: { year: 'numeric', month: 'short', day: 'numeric' }
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' }
    }
};

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [NgApexchartsModule, SharedModule, NgbTooltipModule, MatFormFieldModule, MatDatepickerModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
        // provideNativeDateAdapter()
    ]
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

    // Material date picker
    fromDate: string;
    toDate: string;
    range = new FormGroup({
        start: new FormControl(new Date()),
        end: new FormControl(new Date())
    });

    constructor(private dataFetcher: DataFetcherService) {}

    ngOnInit(): void {
        console.log('range -->> ', this.range.value);

        this.fetchDataOnDateRange();
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }

    setDate(startDate?: Date, endDate?: Date) {
        const fromYear = startDate.getFullYear();
        const fromMonth = this._to2digit(startDate.getMonth() + 1);
        const fromDay = this._to2digit(startDate.getDate());
        this.fromDate = `${fromYear}-${fromMonth}-${fromDay}`;

        const toYear = endDate.getFullYear();
        const toMonth = this._to2digit(endDate.getMonth() + 1);
        const toDay = this._to2digit(endDate.getDate());
        this.toDate = `${toYear}-${toMonth}-${toDay}`;
    }

    fetchDataOnDateRange() {
        this.setDate(this.range.value.start, this.range.value.end);
        console.log('from --->> ', this.fromDate, 'to --->> ', this.toDate);

        this.isLoading = true;
        this.dataFetcher.getCSVData(this.fromDate, this.toDate).subscribe(
            (data) => {
                this.csvData = data.data;
                console.log('csvData -->> ', this.csvData);
            },
            (error) => {
                this.isLoading = false;
                throw new Error(error);
            }
        );

        this.dataFetcher.getData(this.fromDate, this.toDate).subscribe(
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
