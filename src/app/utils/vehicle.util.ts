import { IVehicleType } from '../interfaces/vehicle.type';

export const vehicles: IVehicleType[] = [
    { type: 'M', en: 'motorcycle', la: 'ລົດຈັກ', axles: 2, wheels: 2, price: 0 },
    { type: 'A', en: 'passenger car', la: 'ລົດສວ່ນຕົວ', axles: 2, wheels: 4, price: 15000 },
    { type: 'C2', en: 'Minivan', la: 'ລົດຕູ້', axles: 2, wheels: 6, price: 20000 },
    { type: 'C3', en: 'truck', la: 'ລົດບັນທຸກ 10 ລໍ້', axles: 3, wheels: 10, price: 40000 },
    { type: 'C4', en: 'truck', la: 'ລົດບັນທຸກ 14 ລໍ້', axles: 4, wheels: 14, price: 50000 },
    { type: 'C5', en: 'truck', la: 'ລົດບັນທຸກ 18 ລໍ້', axles: 5, wheels: 18, price: 100000 },
    { type: 'C6', en: 'truck', la: 'ລົດບັນທຸກ 22 ລໍ້', axles: 6, wheels: 22, price: 100000 },
    { type: 'C7', en: 'truck', la: 'ລົດບັນທຸກ 26 ລໍ້', axles: 7, wheels: 26, price: 200000 },
    { type: 'C8', en: 'truck', la: 'ລົດບັນທຸກ 30 ລໍ້', axles: 8, wheels: 30, price: 500000 },
    { type: 'C9+', en: 'truck', la: 'ລົດບັນທຸກ 34 ລໍ້', axles: '>=9', wheels: '>=34', price: 500000 },
    { type: 'AR1', en: 'small trailer', la: 'ລົດເທຣເລີ 6 ລໍ້', axles: 3, wheels: 6, price: 15000 },
    { type: 'AR2', en: 'small trailer', la: 'ລົດເທຣເລີ 8 ລໍ້', axles: 4, wheels: 8, price: 15000 },
    { type: 'B2', en: 'bus', la: 'ລົດເມ 4-6', axles: 2, wheels: '4-6', price: 25000 },
    { type: 'B3', en: 'bus', la: 'ລົດເມ 8-10', axles: 3, wheels: '8-10', price: 40000 },
    { type: 'B4', en: 'bus', la: 'ລົດເມ 12-14', axles: 4, wheels: '12-14', price: 50000 }
];
