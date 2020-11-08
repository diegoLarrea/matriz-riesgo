import { Pipe, PipeTransform } from '@angular/core';
import { ViewProceso } from 'src/_models/proceso';

@Pipe({
  name: 'procesoPipe'
})
export class ProcesoPipe implements PipeTransform{
    transform(items: ViewProceso[], searchText: string): any[] {
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
            it.usuario_modificacion.toLowerCase().includes(searchText) ||
            it.macroprocesoNombre.toLowerCase().includes(searchText) ||
            it.id.toString().includes(searchText);
        });

    }
}