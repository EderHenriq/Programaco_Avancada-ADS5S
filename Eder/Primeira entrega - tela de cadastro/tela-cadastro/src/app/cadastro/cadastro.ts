import { Component, OnInit } from '@angular/core'; // Recompile
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro implements OnInit {
  meuFormulario!: FormGroup;
  cadastrosSalvos: any[] = [];

  constructor(private construtorDeFormulario: FormBuilder) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario(): void {
    this.meuFormulario = this.construtorDeFormulario.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      telefones: this.construtorDeFormulario.array([])
    });

    this.adicionarTelefone();
  }

  get telefones(): FormArray {
    return this.meuFormulario.get('telefones') as FormArray;
  }
  criarNovoTelefone(): FormGroup {
    return this.construtorDeFormulario.group({
      numero: ['', Validators.required],
      tipo: ['Celular', Validators.required]
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
    if (this.meuFormulario.valid) {
      this.cadastrosSalvos.push(this.meuFormulario.value);
      alert('Cadastro realizado com sucesso!');
      this.iniciarFormulario();
    } else {
      this.meuFormulario.markAllAsTouched();
      alert('Existem campos inválidos ou vazios. Verifique o formulário.');
    }
  }
}
