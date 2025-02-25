import { Component, inject } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';
import {Router, RouterLink} from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {Button} from 'primeng/button';
import {IftaLabel} from 'primeng/iftalabel';
import {Card} from 'primeng/card';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatButton,
    Button,
    IftaLabel,
    Card,
    InputText,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  })

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => {
        this.accountService.getUserInfo().subscribe();
        this.router.navigateByUrl('/');
      }
    })
  }
}
