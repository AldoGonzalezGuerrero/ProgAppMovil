import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  usuario: Usuario
  constructor(
    private activatedRouter : ActivatedRoute,
    private usuarioService : UsuarioService,
    private alertControl : AlertController,
    private router : Router
  ) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.usuario = this.usuarioService.getUsuario(Number(id));
    })
  }

}
