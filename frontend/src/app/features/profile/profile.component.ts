import {Component, computed, effect, inject, OnInit} from '@angular/core';
import {AccountService} from '../../core/services/account.service';
import {User} from '../../shared/models/user';
import {Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    ButtonDirective,
    Ripple
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  accountService = inject(AccountService);
  private router = inject(Router);
  user = this.accountService.currentUser();

  private fb = inject(FormBuilder);

  profileForm = this.fb.group({
    firstName: [this.user?.firstName || '', Validators.required],
    lastName: [this.user?.lastName || '', Validators.required],
    email: [this.user?.email || '', [Validators.required, Validators.email]]
  });

  ngOnInit(): void {
    if(!this.user){
      this.router.navigateByUrl('/account/login')
    }
  }

  onSubmit(){
    if(this.profileForm.valid) {
      this.accountService.updateProfile(this.profileForm.value).subscribe({
        next: () => {
          console.log('Profile updated successfully');
        },
        error: error => {
          console.error('Error updating profile:', error);
        }
      });
    }
  }
}
