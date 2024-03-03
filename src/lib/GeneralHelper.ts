// string to date  - Date: 03-20-21
export function stringToDate(date: string): Date {
    let dateParts = date.split("-");
    let dateObject = new Date(+dateParts[2], dateParts[1] as any - 1, +dateParts[0]);
    return dateObject;
}