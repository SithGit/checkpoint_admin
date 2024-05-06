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
import { numberWithCommas, numberWithFullStop } from 'src/app/utils/round-number.shared';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from './custom-adapter';
import { ICSVData, VehicleTypePrice } from 'src/app/interfaces/csv.interface';

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
    ]
})
export default class DashboardComponent implements OnInit {
    checkPointData: CheckPointData[] | any = [];
    csvData: ICSVData;

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
                this.csvData = data;
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
        // Get filename with current date format
        const today = Date.now();
        const filename = `PTL-${today}.csv`;

        // Generate CSV header
        const csvHeader = [
            'ວັນທີ',
            '0',
            '15000',
            '20000',
            '25000',
            '40000',
            '50000',
            '100000',
            '200000',
            '500000',
            'ລວມເງິນ',
            'ລົດຈັກ',
            'ລົດສວ່ນຕົວ',
            'ລົດຕູ້',
            'ລົດບັນທຸກ 10 ລໍ້',
            'ລົດບັນທຸກ 14 ລໍ້',
            'ລົດບັນທຸກ 18 ລໍ້',
            'ລົດບັນທຸກ 22 ລໍ້',
            'ລົດບັນທຸກ 26 ລໍ້',
            'ລົດບັນທຸກ 30 ລໍ້',
            'ລົດບັນທຸກ 34 ລໍ້',
            'ລົດເທຣເລີ 6 ລໍ້',
            'ລົດເທຣເລີ 8 ລໍ້',
            'ລົດເມ 4-6',
            'ລົດເມ 8-10',
            'ລົດເມ 12-14',
            'ລວມຈຳນວນ',
            'ລວມເງິນທັງໝົດ',
            'ລວມຈຳນວນທັງໝົດ'
        ];

        console.log('csvHeader -->> ', csvHeader);

        // Generate CSV content
        const csvContent = this.generateCSVContent(this.csvData, csvHeader);

        console.log('finalCsvContent -->> ', csvContent);

        // Create Blob and download
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
    }

    generateCSVContent(data: ICSVData, csvHeader: string[]): string {
        let csvContent = csvHeader.join(',') + '\n';

        data.data.forEach((item: any) => {
            let row: any[] = [];
            csvHeader.forEach((header) => {
                if (header === 'ວັນທີ') {
                    row.push(item.date);
                } else if (header === 'ລວມເງິນ') {
                    row.push(numberWithFullStop(item.total_each));
                } else if (header === 'ລວມຈຳນວນ') {
                    row.push(numberWithFullStop(item.total_count));
                } else if (header === 'ລວມເງິນທັງໝົດ') {
                    row.push(numberWithFullStop(data.total_summarize));
                } else if (header === 'ລວມຈຳນວນທັງໝົດ') {
                    row.push(numberWithFullStop(data.total_vehicle_type_count));
                } else {
                    let found = item.vehicle_type_count.find((v: any) => v.vehicle_type === header);
                    if (found) {
                        row.push(numberWithFullStop(found?.count) ?? 0);
                    } else {
                        found = item.vehicle_type_price.find((v: VehicleTypePrice) => v.price === parseInt(header));
                        if (found) {
                            row.push(numberWithFullStop(found?.total_price) ?? 0);
                        } else {
                            row.push(0);
                        }
                    }
                }
            });
            csvContent += row.join(',') + '\n';
        });

        return csvContent;
    }
}
