import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private cadastrosSalvos: any[] = [];

  constructor() { }

  getUsuarios() {
    return this.cadastrosSalvos;
  }

  adicionarUsuario(usuario: any) {
    this.cadastrosSalvos.push(usuario);
  }

  atualizarUsuario(index: number, usuarioEditado: any) {
    if (index >= 0 && index < this.cadastrosSalvos.length) {
      this.cadastrosSalvos[index] = usuarioEditado;
    }
  }

  removerUsuario(index: number) {
    if (index >= 0 && index < this.cadastrosSalvos.length) {
      this.cadastrosSalvos.splice(index, 1);
    }
  }
}
