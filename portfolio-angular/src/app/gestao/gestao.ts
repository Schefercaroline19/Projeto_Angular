// src/app/gestao/gestao.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjetoService } from '../services/projeto.service';

@Component({
  selector: 'app-gestao',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './gestao.html',
  styleUrls: ['./gestao.css']
})
export class Gestao implements OnInit {
  private fb = inject(FormBuilder);
  private projetoService = inject(ProjetoService);

  form!: FormGroup;
  projetos: any[] = [];
  editandoId: number | null = null;
  
  // Estados
  carregando = false;
  salvando = false;
  erroCarregar = '';
  erroSalvar = '';
  erroExcluir = '';

  ngOnInit() {
    this.inicializarForm();
    this.carregar();
  }

  inicializarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: [''],
      tecnologias: [''],
      link_github: [''],
      ano: ['', [Validators.required, Validators.min(2000), Validators.max(2030)]],
      status: ['rascunho']
    });
  }

  carregar() {
    this.carregando = true;
    this.erroCarregar = '';
    this.erroExcluir = '';
    
    this.projetoService.listar(true).subscribe({
      next: (dados) => {
        this.projetos = dados;
        this.carregando = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar:', err);
        this.erroCarregar = 'Não foi possível carregar a lista de projetos. Tente novamente.';
        this.carregando = false;
      }
    });
  }

  salvar() {
    this.erroSalvar = '';
    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    const dados = this.form.value;

    if (this.editandoId) {
      this.projetoService.atualizar(this.editandoId, dados).subscribe({
        next: () => {
          this.carregar();
          this.limparFormulario();
          this.salvando = false;
        },
        error: (err: any) => {
          console.error('Erro ao salvar:', err);
          this.erroSalvar = 'Erro ao salvar o projeto. Tente novamente.';
          this.salvando = false;
        }
      });
    } else {
      this.projetoService.criar(dados).subscribe({
        next: () => {
          this.carregar();
          this.limparFormulario();
          this.salvando = false;
        },
        error: (err: any) => {
          console.error('Erro ao criar:', err);
          this.erroSalvar = 'Erro ao criar o projeto. Tente novamente.';
          this.salvando = false;
        }
      });
    }
  }

  editar(projeto: any) {
    this.editandoId = projeto.id;
    this.form.patchValue({
      nome: projeto.nome,
      descricao: projeto.descricao,
      tecnologias: projeto.tecnologias,
      link_github: projeto.link_github,
      ano: projeto.ano,
      status: projeto.status || 'rascunho'
    });
  }

  excluir(projeto: any) {
    const confirmacao = confirm(`Tem certeza que deseja excluir o projeto "${projeto.nome}"?`);
    
    if (!confirmacao) {
      return;
    }

    this.erroExcluir = '';
    this.projetoService.excluir(projeto.id).subscribe({
      next: () => {
        this.projetos = this.projetos.filter(p => p.id !== projeto.id);
      },
      error: (err: any) => {
        console.error('Erro ao excluir:', err);
        this.erroExcluir = 'Erro ao excluir o projeto. Tente novamente.';
        setTimeout(() => this.erroExcluir = '', 5000);
      }
    });
  }

  limparFormulario() {
    this.editandoId = null;
    this.form.reset({
      nome: '',
      descricao: '',
      tecnologias: '',
      link_github: '',
      ano: '',
      status: 'rascunho'
    });
  }
}