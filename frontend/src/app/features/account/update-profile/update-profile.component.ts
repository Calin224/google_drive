import {Component, inject, OnInit} from '@angular/core';
import {AccountService} from '../../../core/services/account.service';
import {Router} from '@angular/router';
import {ProfileService} from '../../../core/services/profile.service';
import {FollowService} from '../../../core/services/follow.service';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../../../shared/models/user';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {FileUpload, FileUploadHandlerEvent} from 'primeng/fileupload';
import {Avatar} from 'primeng/avatar';
import {ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {Drawer} from 'primeng/drawer';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Ripple} from 'primeng/ripple';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-update-profile',
  imports: [
    Avatar,
    ButtonDirective,
    Card,
    Drawer,
    FileUpload,
    FloatLabel,
    FormsModule,
    InputText,
    PrimeTemplate,
    ReactiveFormsModule,
    Ripple,
    Toast
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
  providers: [MessageService]
})
export class UpdateProfileComponent implements OnInit {
  accountService = inject(AccountService);
  private router = inject(Router);
  user = this.accountService.currentUser();
  private profileService = inject(ProfileService);
  private followService = inject(FollowService);

  private fb = inject(FormBuilder);

  profileForm = this.fb.group({
    firstName: [this.user?.firstName || '', Validators.required],
    lastName: [this.user?.lastName || '', Validators.required],
    email: [this.user?.email || '', [Validators.required, Validators.email]]
  });

  uploadedImage: any;
  visible: boolean = false;

  followers?: User[];
  following?: User[];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    if (!this.user) {
      this.router.navigateByUrl('/account/login')
    }

    this.followService.getFollowing().subscribe({
      next: res => {
        this.following = res;
      }
    })

    this.followService.getFollowers().subscribe({
      next: res => {
        this.followers = res;
      }
    })
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
