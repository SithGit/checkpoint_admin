export interface ICSVData {
    data: IVehicleData[];
    total_vehicle_type_count: number;
    total_summarize: number;
}

export interface IVehicleData {
    date: string;
    total_count: number;
    total_each: number;
    vehicle_type_count: VehicleTypeCount[];
    vehicle_type_price: VehicleTypePrice[];
}

export interface VehicleTypeCount {
    vehicle_type: string;
    count: number;
}

export interface VehicleTypePrice {
    vehicle_type: string;
    price: number;
    total_price: number;
}
