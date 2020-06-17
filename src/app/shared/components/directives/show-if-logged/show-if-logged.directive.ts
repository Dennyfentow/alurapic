import { Input, Directive, ElementRef, Renderer, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { Photo } from 'src/app/photos/photo/photo';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {
    @Input() ownedPhoto: Photo;

    currentDisplay: string;
    constructor(
        private element: ElementRef<any>,
        private rendeder: Renderer,
        private userService: UserService
    ) { }


    ngOnInit(): void {
        this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
        this.userService.getUser().subscribe(user => {
            if (user) {
                this.rendeder.setElementStyle(this.element.nativeElement, 'display', this.currentDisplay);
            } else {
                this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
                !this.userService.isLogged() &&
                    this.rendeder.setElementStyle(this.element.nativeElement, 'display', 'none');
            }
        })
    }

}