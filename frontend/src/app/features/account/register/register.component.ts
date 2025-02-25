import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AccountService} from '../../../core/services/account.service';
import {SnackbarService} from '../../../core/services/snackbar.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {Router, RouterLink} from '@angular/router';
import {MessageService} from 'primeng/api';
import {Card} from 'primeng/card';
import {IftaLabel} from 'primeng/iftalabel';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    RouterLink,
    Card,
    IftaLabel,
    InputText,
    Button
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  accountService = inject(AccountService);
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);
  validationErrors: string[] = [];

  constructor(private messageService: MessageService) {  }

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary:"Success!", detail: "Registration successful!", life:3000});
        this.router.navigateByUrl('/account/login');
      },
      error: errors => this.validationErrors = errors
    })
  }
}
