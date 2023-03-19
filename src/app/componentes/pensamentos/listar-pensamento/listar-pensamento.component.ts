import { Pensamento } from './../pensamento';
import { Component } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent {
  listaPensamentos: Pensamento[] = [];

  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favorito: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(private service: PensamentoService, private router: Router) {}
  ngOnInit(): void {
    this.service
      .listar(this.paginaAtual, this.filtro, this.favorito)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      });
  }

  carregarMaisPensamentos() {
    this.service
      .listar(++this.paginaAtual, this.filtro, this.favorito)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos.push(...listaPensamentos);
        if (!listaPensamentos.length) {
          this.haMaisPensamentos = false;
        }
      });
  }
  pesquisarPensamento() {
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favorito)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      });
  }

  listarFavoritos() {
    this.titulo = 'Meus Favoritos';
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.favorito = true;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favorito)
      .subscribe((listarPensamentosFavoritos) => {
        this.listaPensamentos = listarPensamentosFavoritos;
        this.listaFavoritos = listarPensamentosFavoritos;
      });
  }

  recaregarComponente() {
    this.favorito = false;
    this.paginaAtual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
