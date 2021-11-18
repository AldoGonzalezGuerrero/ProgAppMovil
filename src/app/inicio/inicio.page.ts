import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private alertControl : AlertController,
    private router : Router,
    private api : ApirestService,
  ) { }

  ngOnInit() {
    const comprobacion = JSON.parse(localStorage.getItem("1"));
    if (comprobacion == null){
      this.sesion = false;
    }
    else{
      this.usuario = comprobacion;
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

  verComentarios(id:String){
    this.router.navigate(['/comentarios', id]);
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
