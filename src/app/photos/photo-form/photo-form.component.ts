import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { PhotoService } from '../photo/photo.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;
  percentDone = 0;

  constructor(
    private formBuilder: FormBuilder,
    private photosService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload() {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    this.photosService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => { // Finalize com isso 
        this.router.navigate(['/user', this.userService.getUserName()])

      }))
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type == HttpEventType.UploadProgress) { // em progresso
            this.percentDone = Math.round( (100 * event.loaded) / event.total); // calculo do percentual
            console.log('calculo', this.percentDone);
            console.log('loaded', event.loaded );
            console.log('total', event.total);
          } else if (event.type == HttpEventType.Response) { // Final
            this.alertService.success('Upload Complete', true);
          }
        },
        err => {
          console.log(err);
          this.alertService.danger('Upload error!', true);
        });
  }

  handleFile(file: File) {
    this.file = file; // salvando o File normal que dá acesso ao seu binário
    const reader = new FileReader(); // FileReader é um objeto de javascript puro
    reader.readAsDataURL(file); // transformar em base64 o file que possui o binário
    reader.onload = (event: any) => this.preview = event.target.result; // após transformar, atribuir para o elemento preview para exibir no Preview
  }

}
