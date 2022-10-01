import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { UnoComponent } from "./components/uno/uno/uno.component";


const routes : Routes = [
    {
        path:'',
        redirectTo:'get-Character',
        pathMatch: 'full'
    },
    {
        path:'get-Character',
        component: UnoComponent
    }
];

@NgModule ({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class UnoRoutingModule {


}