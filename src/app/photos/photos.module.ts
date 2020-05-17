import { NgModule } from '@angular/core';

import { PhotoModule } from './photo/photo.module';
import { PhotosFormModule } from './photos-form/photos-form.module';
import { PhotoListModule } from './photos-list/photos-list.module';


@NgModule({
    declarations: [  // Componentes Visiveis entre si(privados)

    ],
    imports: [
        PhotoModule,
        PhotosFormModule,
        PhotoListModule,
    ]
})
export class PhotosModule { }