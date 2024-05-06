export function numberWithCommasAndRounding(x: number, base = 500): string {
    const rounded = Math.ceil(x / base) * base; // Round up to nearest multiple of base
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberWithCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberWithFullStop(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
