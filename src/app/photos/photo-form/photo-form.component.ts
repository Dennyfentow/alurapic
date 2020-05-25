import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;

  constructor(
    private formBuilder: FormBuilder,
    private photosService: PhotoService,
    private router: Router) { }

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
    this.photosService.upload(description,allowComments,this.file)
      .subscribe(() => this.router.navigate(['']));
  }

  handleFile(file: File) {
    this.file = file; // salvando o File normal que dá acesso ao seu binário
    const reader = new FileReader(); // FileReader é um objeto de javascript puro
    reader.readAsDataURL(file); // transformar em base64 o file que possui o binário
    reader.onload = (event: any) => this.preview = event.target.result; // após transformar, atribuir para o elemento preview para exibir no Preview
  }

}
