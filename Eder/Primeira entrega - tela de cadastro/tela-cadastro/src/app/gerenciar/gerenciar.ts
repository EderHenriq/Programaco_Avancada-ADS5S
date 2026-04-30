import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario';

@Component({
  selector: 'app-gerenciar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gerenciar.html',
  styleUrl: './gerenciar.css'
})
export class Gerenciar implements OnInit {
  cadastrosSalvos: any[] = [];
  formEdicao!: FormGroup;
  indiceEdicao: number | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cadastrosSalvos = this.usuarioService.getUsuarios();
    this.formEdicao = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      telefones: this.fb.array([])
    });
  }

  get telefones(): FormArray {
    return this.formEdicao.get('telefones') as FormArray;
  }

  criarNovoTelefone(numero: string = '', tipo: string = 'Celular'): FormGroup {
    return this.fb.group({
      numero: [numero, Validators.required],
      tipo: [tipo, Validators.required]
    });
  }

  adicionarTelefone(): void {
    this.telefones.push(this.criarNovoTelefone());
  }

  removerTelefone(indice: number): void {
    if (this.telefones.length > 1) {
      this.telefones.removeAt(indice);
    } else {
      alert('Você precisa informar pelo menos um telefone!');
    }
  }

  excluirUsuario(index: number) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.removerUsuario(index);
    }
  }

  editarUsuario(index: number) {
    this.indiceEdicao = index;
    const usuario = this.cadastrosSalvos[index];
    
    // Clear array
    this.telefones.clear();
    
    // Add phones
    if (usuario.telefones && usuario.telefones.length > 0) {
      usuario.telefones.forEach((tel: any) => {
        this.telefones.push(this.criarNovoTelefone(tel.numero, tel.tipo));
      });
    } else {
      this.adicionarTelefone();
    }

    this.formEdicao.patchValue({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha
    });
  }

  salvarEdicao() {
    if (this.formEdicao.valid && this.indiceEdicao !== null) {
      this.usuarioService.atualizarUsuario(this.indiceEdicao, this.formEdicao.value);
      alert('Usuário atualizado com sucesso!');
      this.cancelarEdicao();
    } else {
      this.formEdicao.markAllAsTouched();
      alert('Verifique os campos do formulário.');
    }
  }

  cancelarEdicao() {
    this.indiceEdicao = null;
    this.formEdicao.reset();
  }
}
