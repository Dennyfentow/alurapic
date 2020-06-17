import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 

  constructor(
    private router: Router, // Acesso ao evento disparado na rota
    private activatedRoute: ActivatedRoute, // acesso a informação da rota acessada
    private titleService: Title) { }


  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd)) // Se for instancia de NavigationEnd somente passa o obs
      .pipe(map(() => this.activatedRoute)) // mudar o nome somente
      .pipe(map(route => {
        while(route.firstChild) route = route.firstChild; // é a primeira rota? se sim, retorna
        return route;
      }))
      .pipe(switchMap(route => route.data)) // vou parar de ouvir acima e passar o fluxo para route.data, no caso criar um outro observable com switchMap enviando route.data
      .subscribe(data => this.titleService.setTitle(data.title))
      
  }
}
