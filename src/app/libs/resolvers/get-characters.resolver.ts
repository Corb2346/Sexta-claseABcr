
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, concatMap, Observable, of, tap } from 'rxjs';
import { UnoServiceService } from 'src/app/services/uno-services.service';

@Injectable({
  providedIn: 'root'
})
export class GetCharactersResolver implements Resolve<any> {
  
  
  constructor(private unoService : UnoServiceService, private router: Router){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    const characterName: any = route.queryParams['nombre'];

    console.log("id es:",name);

    console.log('resolver > ', route);
    console.log('R-state',state);
    
    return this.unoService.getCharacters().pipe(
      tap((resp) =>{
        console.log(resp);
        
      }),
      concatMap((response: any) => {
        console.log("resp",response);
        let temp = (response.results as any[]).find(item => {
          console.log("item",item);
          return item.name.includes(characterName)
          
        })?.name
        if(!temp){
            //throw new Error("error temp");
            throw{
              status: 404
            }
        }
        console.log("find",temp);
        
        //return this.unoService.getCharacter(response.results[1].name);
        return this.unoService.getCharacter(temp);
      }),
      tap((resp) =>{
        console.log(resp);
        
      }),

      /*if(resp === null){
          this.router.navigate(['404'])
      } concatMap((response: any) => {
        return this.unoService.getCharacter(response.results[characterName].name);
      
      }),
      tap((resp) =>{
        console.log(resp);
        
      })
      
      */

      catchError((error: any) => {
        if(error.status === 404){
          this.router.navigate(['404'])
        }
        console.log(error);
        
        return of(error) ;
        })

        )
      }

}
