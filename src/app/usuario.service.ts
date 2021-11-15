import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosExistentes: Usuario[] =[
    {
      id: 0,
      usuario: 'TestDummy1',
      password: 'TestDummy1'
    },
    {
      id: 1,
      usuario: 'TestDummy2',
      password: 'TestDummy2'
    },
    {
      id: 2,
      usuario: 'TestDummy3',
      password: 'TestDummy3'
    },

  ]
  constructor() { }

  getListaUsuarios(){
    return this.usuariosExistentes
  }
  getUsuario(id : number)
  {
    return this.usuariosExistentes.find(x => {return x.id == id})
  }
}
