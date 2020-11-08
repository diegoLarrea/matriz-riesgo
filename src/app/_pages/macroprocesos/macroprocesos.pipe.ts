import { Pipe, PipeTransform } from '@angular/core';
import { Macroproceso } from 'src/_models/macroproceso';

@Pipe({
  name: 'macroprocesoPipe'
})
export class MacroprocesoPipe implements PipeTransform{
    transform(items: Macroproceso[], searchText: string): any[] {
        if (!items) return [];

        if(searchText == null || searchText == "") return items;

        searchText = searchText.toLowerCase();

        return items.filter(it => {
            return it.nombre.toLowerCase().includes(searchText) ||
            it.fecha_creacion.toLowerCase().includes(searchText) ||
            it.fecha_modificacion.toLowerCase().includes(searchText) ||
            it.descripcion.toLowerCase().includes(searchText) ||
            it.usuario_creacion.toLowerCase().includes(searchText) ||
            it.usuario_modificacion.toLowerCase().includes(searchText) ||
            it.id.toString().includes(searchText);
        });

    }
}