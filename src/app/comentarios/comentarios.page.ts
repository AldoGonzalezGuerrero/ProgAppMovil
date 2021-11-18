import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { AlertController } from '@ionic/angular';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  usuario : [];
  sesion = true;
  listado = [];
  post: [];

  constructor(
    private activatedRouter : ActivatedRoute,
    private alertControl : AlertController,
    private router : Router,
    private api : ApirestService,
    ) { }

  ngOnInit() {
    const comprobacion = JSON.parse(localStorage.getItem("1"));
    console.log(comprobacion);
    if (comprobacion == null){
      this.sesion = false;
    }
    else{
      this.usuario = comprobacion;
      this.post = JSON.parse(localStorage.getItem("2"));
      this.listar();
    }
  }

  listar() {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.api.getPost(String(id));
      this.api.getCommentsPost(String(id));
      this.listado = this.api.listado;
      console.log(this.listado);
    })
  }
  }
