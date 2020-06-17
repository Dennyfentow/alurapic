import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = []; // Data Binding - dado vai do Componente para a Template
  filter: string = ''; // Event Binding - dado vai da Template para o Componente 
  // Caso usado em conjunto com o Angular Expression ou Data Binding, a atualização da view é simultanea com a atualização 

  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
  ) { }

  ngOnInit(): void {
    // No caso aqui está sendo devolvido o resultado do resolver pronto, ou seja, antes do componente carregar
    // já estará pronto a lista de photos feitos pelo Resolver
    this.activatedRoute.params.subscribe(params => { // executado toda vez que é alterado a rota para esta página
      this.userName = params.userName;
      this.photos = this.activatedRoute.snapshot.data['photos'];
    });
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        // this.photos.push(...photos); // não funciona por que o Angular só percebe quando a variável é atribuida, não alterada
        this.photos = this.photos.concat(photos);

        // Se as photos recebidas forem no total 0, será false, porém queremos atribuir quando for false, por isto, "!"
        if (!photos.length) this.hasMore = false;
      });
  }
}
