import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICheckPoint } from 'src/app/interfaces/arrival.interface';
import { getTodayDateRange } from 'src/app/utils/get-date.util';

@Injectable({
    providedIn: 'root'
})
export class DataFetcherService {
    constructor(private http: HttpClient) {}

    getDayData(): Observable<ICheckPoint> {
        const { startDate, endDate } = getTodayDateRange();

        const getToken = localStorage.getItem('token');

        if (!getToken) {
            return null;
        }

        const setHeader = {
            headers: {
                Authorization: getToken
            }
        };

        return this.http.get<ICheckPoint>(`http://202.137.134.162:3000/api/Reports/get-all-check-point?startDate=${startDate}&endDate=${endDate}`, setHeader);
    }
}
