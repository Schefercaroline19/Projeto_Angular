// src/app/contato/contato.ts
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContatoService, NovoContato } from '../contato.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contato.html',
})
export class Contato {
  private fb = inject(FormBuilder);
  private service = inject(ContatoService);
  
  // Estados da tela
  enviando = false;
  sucesso = '';
  erro = '';
  enviado = false; // NOVO: controla se já foi enviado com sucesso

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mensagem: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit() {
    // Reset dos estados anteriores
    this.sucesso = '';
    this.erro = '';
    this.enviado = false;
    
    // Validação do formulário
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    // Inicia o envio
    this.enviando = true;
    
    this.service.enviar(this.form.getRawValue() as NovoContato).subscribe({
      next: (resp) => {
        // Sucesso!
        this.sucesso = resp.mensagem || 'Mensagem enviada com sucesso! ✨';
        this.enviado = true;
        this.form.reset(); // limpa o formulário
        this.enviando = false;
        
        // Limpa a mensagem de sucesso após 5 segundos
        setTimeout(() => {
          this.sucesso = '';
          this.enviado = false;
        }, 5000);
      },
      error: (err) => {
        // Erro!
        console.error('Erro ao enviar:', err);
        this.erro = 'Não foi possível enviar. Tente novamente. 😿';
        this.enviando = false;
        
        // Limpa a mensagem de erro após 5 segundos
        setTimeout(() => {
          this.erro = '';
        }, 5000);
      },
    });
  }
}