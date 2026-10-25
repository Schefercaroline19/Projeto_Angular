// src/app/services/projeto.service.ts
import { Injectable, inject, numberAttribute } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Projeto {
  id?: number;
  nome: string;
  descricao: string;
  tecnologias: string;
  link_github: string;
  ano: number;
  status: 'rascunho' | 'publicado' | 'arquivado';
}

@Injectable({ providedIn: 'root' })
export class ProjetoService {
  private http = inject(HttpClient);
  private url = 'https://bookish-parakeet-7vqxpxxvp6p9hpw6q-3000.app.github.dev/api/projetos';

  // Nível B: lista todos (gestão) ou apenas publicados (catálogo)
  listar(todos?: boolean): Observable<Projeto[]> {
    const params = todos ? '?todos=1' : '?todos=0';
    return this.http.get<Projeto[]>(this.url + params);
  }

  criar(projeto: Projeto): Observable<any> {
    return this.http.post(this.url, projeto);
  }

  atualizar(id: number, projeto: Projeto): Observable<{ id?: number; mensagem?: string }> {
    return this.http.put<{ id?: number; mensagem?: string }>(`${this.url}/${id}`, projeto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}