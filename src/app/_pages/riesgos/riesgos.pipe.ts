import { Pipe, PipeTransform } from '@angular/core';
import { Riesgo } from 'src/_models/riesgo';

@Pipe({
  name: 'riesgosPipe'
})
export class RiesgosPipe implements PipeTransform{
    transform(items: Riesgo[], searchText: string): any[] {
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