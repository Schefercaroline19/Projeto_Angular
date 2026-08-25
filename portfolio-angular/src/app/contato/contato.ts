// src/app/contato/contato.ts
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContatoService, NovoContato } from '../contato.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [ReactiveFormsModule],   // libera formGroup/formControlName no HTML
  templateUrl: './contato.html',
})
export class Contato {
  private fb = inject(FormBuilder);
  private service = inject(ContatoService);
  enviando = false; sucesso = ''; erro = ''; // estados de tela

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mensagem: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit() {
    this.sucesso = ''; this.erro = '';
    if (this.form.invalid) {         // trava: nem chama a API se invalido
      this.form.markAllAsTouched(); // forca exibir os erros de campo
      return;
    }
    this.enviando = true; // desabilita o botao enquanto envia
    this.service.enviar(this.form.getRawValue() as NovoContato).subscribe({
      next: (resp) => {
        this.sucesso = resp.mensagem;
        this.form.reset(); // limpa o formulario
        this.enviando = false;
      },
      error: () => {
        this.erro = 'Nao foi possivel enviar. Tente novamente.';
        this.enviando = false; // reabilita o botao no erro
      },
    });
  }
}