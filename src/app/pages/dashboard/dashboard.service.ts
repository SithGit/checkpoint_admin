import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICheckPoint } from 'src/app/interfaces/arrival.interface';
import { getDateRange } from 'src/app/utils/get-date.util';

@Injectable({
    providedIn: 'root'
})
export class DataFetcherService {
    private apiUrl: string = 'https://api.ptlao.com';

    constructor(private http: HttpClient) {}

    getData(fromDate: string, toDate: string): Observable<ICheckPoint> {
        const { startDate, endDate } = getDateRange(fromDate, toDate);

        console.log('changed date', startDate, endDate);

        const getToken = localStorage.getItem('token');

        if (!getToken) {
            return null;
        }

        const setHeader = {
            headers: {
                Authorization: getToken
            }
        };

        return this.http.get<ICheckPoint>(`${this.apiUrl}/api/Reports/get-all-check-point?startDate=${startDate}&endDate=${endDate}`, setHeader);
    }

    getCSVData(fromDate: string, toDate: string): Observable<ICheckPoint> {
        const { startDate, endDate } = getDateRange(fromDate, toDate);

        console.log('changed date', startDate, endDate);

        const getToken = localStorage.getItem('token');

        if (!getToken) {
            return null;
        }

        const setHeader = {
            headers: {
                Authorization: getToken
            }
        };

        return this.http.get<ICheckPoint>(`${this.apiUrl}/api/Reports/get-all-check-point-by-day?startDate=${startDate}&endDate=${endDate}`, setHeader);
    }
}
