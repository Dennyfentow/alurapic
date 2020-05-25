import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
    
    @Output() onTyping = new EventEmitter<string>();
    @Input() value: string = '';
    debounce: Subject<string> = new Subject<string>();
    
    ngOnInit(): void {
        // Debounce seria como se fosse um emitidor customizado de uma Promisse(Observable no rxjs)
        // onde lá na template, no evento "(keyup)", é enviado a cada 300 minissegundos(debounceTime) o método
        // dentro de subscribe
        this.debounce
        .pipe(debounceTime(300))
        .subscribe(filter => this.onTyping.emit(filter));
    }    
    ngOnDestroy(): void {
        // necessário destruir sempre o debounce para não ocorrer over de memória
        this.debounce.unsubscribe();
    }
 }