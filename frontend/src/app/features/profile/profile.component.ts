import {Component, inject, OnInit} from '@angular/core';
import {AccountService} from '../../core/services/account.service';
import {Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Button, ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Avatar} from 'primeng/avatar';
import {FileUpload, FileUploadHandlerEvent} from 'primeng/fileupload';
import {NgForOf, NgIf} from '@angular/common';
import {ProfileService} from '../../core/services/profile.service';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {Card} from 'primeng/card';
import {Drawer} from 'primeng/drawer';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    ButtonDirective,
    Ripple,
    Avatar,
    FileUpload,
    Toast,
    Card,
    PrimeTemplate,
    Drawer,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [
    MessageService
  ]
})
export class ProfileComponent implements OnInit {
  accountService = inject(AccountService);
  private router = inject(Router);
  user = this.accountService.currentUser();
  private profileService = inject(ProfileService);

  private fb = inject(FormBuilder);

  profileForm = this.fb.group({
    firstName: [this.user?.firstName || '', Validators.required],
    lastName: [this.user?.lastName || '', Validators.required],
    email: [this.user?.email || '', [Validators.required, Validators.email]]
  });

  uploadedImage: any;
  visible: boolean = false;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    if (!this.user) {
      this.router.navigateByUrl('/account/login')
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
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

  onUploadImage(event: FileUploadHandlerEvent) {
    const file: File = event.files[0];
    this.profileService.addProfilePicture(file).subscribe({
      next: _ => {
        this.accountService.getUserInfo();
        this.messageService.add({severity: 'success', summary: "Success!", detail: "Profile picture updated successfully!", key: 'br', life: 3000});
      },
    })
  }
}
