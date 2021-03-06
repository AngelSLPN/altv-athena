export interface Item {
    name: string;
    uuid: string;
    description: string;
    icon: string;
    quantity: number;
    weight: number;
    slot: number;
    data: { [key: string]: any };
}
