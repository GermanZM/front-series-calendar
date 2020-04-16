import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(lista: any[], texto: string): any[] {
    const filterList = lista.filter(item => item.title.toUpperCase().startsWith(texto.toUpperCase()));
    return filterList;
  }

}
