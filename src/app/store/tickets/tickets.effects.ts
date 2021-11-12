import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

@Injectable()
export class TicketsEffects {
    constructor(private actions$: Actions) {}
}

