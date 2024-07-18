import { BehaviorSubject } from "rxjs";

export const isSellerLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);