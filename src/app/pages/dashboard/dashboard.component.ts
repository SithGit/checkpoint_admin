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

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [NgApexchartsModule, SharedModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
    checkPointData: CheckPointData[] = [];
    tableData: any = [];
    vehicleType: IVehicleType[] = vehicles;
    isLoading = false;

    constructor(private dataFetcher: DataFetcherService) {}

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

                this.tableData = newValues.map((item) => item.data);
                this.checkPointData = newValues;
                console.log(this.checkPointData);
                console.log('table data', this.tableData);
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
}
