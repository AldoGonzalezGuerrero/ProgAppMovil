import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  ingresado = false;
  existe = true;
  listaUsuarios = [];
  contrasena = "";
  constructor(
    private usuarioService: UsuarioService
    ) { }

  ngOnInit() {
  }

  recuperar(nom: HTMLInputElement){
    const usuario = nom.value;
    this.listaUsuarios = this.usuarioService.getListaUsuarios();
    for (let i of this.listaUsuarios){
      if (usuario == i.usuario){
        this.ingresado = true;
        this.contrasena = i.password;
        this.existe = true;
        break;
      }
    }
    if (this.ingresado === false){
      this.existe = false;
    }
  }
}
