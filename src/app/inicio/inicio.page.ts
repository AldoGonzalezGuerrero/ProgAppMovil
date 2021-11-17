import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { AlertController } from '@ionic/angular';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  usuario : [];
  sesion = true;
  listado = [];
  constructor(
    private activatedRouter : ActivatedRoute,
    private usuarioService : UsuarioService,
    private alertControl : AlertController,
    private router : Router,
    private api : ApirestService,
  ) { }

  ngOnInit() {
    const comprobacion = JSON.parse(localStorage.getItem("1"));
    console.log(comprobacion);
    if (comprobacion == null){
      this.sesion = false;
      console.log(this.sesion);
    }
    else{
      this.usuario = comprobacion;
      console.log(this.usuario);
    }
  }

  listar() {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.api.getPostsUsuario(String(id));
      this.listado = this.api.listado;
      console.log(this.listado);
    })
  }
  limpiarPosts(){
    this.listado = [];
  }
  async limpiarStorage()
  {
    const alert = await this.alertControl.create({
      cssClass: 'my-custom-class',
      header: '¿Cerrar sesión?',
      message: '<strong>¿Está seguro?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        }, {
          text: 'Si',
          handler: () => {
            localStorage.clear();
            this.router.navigate(['/home'])
          }
        }
      ]
    });
    await alert.present();
  }
}
