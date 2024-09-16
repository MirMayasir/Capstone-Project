export interface Subscriptions{
    subscriptionID : number;
    username:string;
    isSubscribed:boolean;
    subscriptionDate:Date;
    unsubscribeDate:Date | null;
    planType:string;
}