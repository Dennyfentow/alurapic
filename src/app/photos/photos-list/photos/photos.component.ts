import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges{

  @Input() photos: Photo[] = [];
  rows: any[] = [];

  constructor() { }
  /** no caso estava vindo vazio, o onChanges atribui um valor com o mesmo nomes da variavel
   quando ocorre uma mudança, no caso, após ter sido recebido o photos da API, este método
   é acionado */
  ngOnChanges(changes: SimpleChanges) { // SimplesChanges, no plural
    if(changes.photos) 
      this.rows = this.groupColumns(this.photos);
  }

  groupColumns(photos: Photo[]) {
  const newRows = [];

  for(let index = 0; index < photos.length; index +=3) {
      newRows.push(photos.slice(index, index + 3));
  }

  return newRows;
  }
}