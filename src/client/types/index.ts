export interface APIGeneralResponse {
    pass: boolean;
    data: string;
}

export interface Item {
    title: string;
    icon: React.ReactElement;
    value: string | number;
    component: React.ReactElement;
};