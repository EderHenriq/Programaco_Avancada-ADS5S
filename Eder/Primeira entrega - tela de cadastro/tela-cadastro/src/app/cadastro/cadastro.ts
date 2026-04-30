import { Component, OnInit } from '@angular/core'; // Recompile
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../services/usuario';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro implements OnInit {
  meuFormulario!: FormGroup;

  constructor(
    private construtorDeFormulario: FormBuilder,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario(): void {
    this.meuFormulario = this.construtorDeFormulario.group({
      nome: [''],
      email: [''],
      senha: [''],
      telefones: this.construtorDeFormulario.array([])
    });

    this.adicionarTelefone();
  }

  get telefones(): FormArray {
    return this.meuFormulario.get('telefones') as FormArray;
  }
  criarNovoTelefone(): FormGroup {
    return this.construtorDeFormulario.group({
      numero: [''],
      tipo: ['Celular']
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

  enviarCadastro(): void {
    this.usuarioService.adicionarUsuario(this.meuFormulario.value);
    alert('Cadastro realizado com sucesso!');
    this.iniciarFormulario();
  }
}
