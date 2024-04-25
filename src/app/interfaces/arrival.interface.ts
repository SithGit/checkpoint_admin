export interface Welcome {
    data: WelcomeDatum[];
}

export interface WelcomeDatum {
    vehicle_type: string;
    count: number;
    data: DatumDatum[];
}

export interface DatumDatum {
    id: string;
    Car_Arrive_Time: Date;
    Vehicle_Type: string;
    Axle_Type: string;
    Wheel_Base: string;
    Axle_Count: string;
    Wheel_Count: string;
    Car_Length: string;
    Wheel_Average_Brightness: string;
    Car_Height: string;
    Truck_Or_Passenger: string;
    Observed_Frames: string;
    Plate_Light: string;
    Plate_Variance: string;
    Average_Confidence: string;
    First_Char_Confidence: string;
    Recognize_Time: string;
    Street_Name: string;
    Street_Direction: string;
    IP: string;
    from_folder: string;
    create_at: Date;
    update_at: Date;
}
