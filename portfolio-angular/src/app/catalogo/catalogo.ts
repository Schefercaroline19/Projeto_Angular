// src/app/catalogo/catalogo.ts
import { Component, OnInit, inject } from '@angular/core';
import { ProjetoService } from '../services/projeto.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class Catalogo implements OnInit {
  projetos: any[] = [];
  carregando = false;
  erro = '';

  private projetoService = inject(ProjetoService);

  ngOnInit() {
    this.carregarPublicados();
  }

  carregarPublicados() {
    this.carregando = true;
    this.erro = '';
    
    // Nível B: filtra apenas publicados
    this.projetoService.listar(false).subscribe({
      next: (dados) => {
        this.projetos = dados;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro:', err);
        this.erro = 'Não foi possível carregar o catálogo.';
        this.carregando = false;
      }
    });
  }
}