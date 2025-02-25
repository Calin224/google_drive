import {Component} from '@angular/core';
import {inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountService} from '../../../core/services/account.service';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Button, ButtonDirective, ButtonIcon} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Card} from 'primeng/card';
import {FolderService} from '../../../core/services/folder.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-create-folder',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    Card,
    ButtonDirective
  ],
  templateUrl: './create-folder.component.html',
  styleUrl: './create-folder.component.css',
  providers: [MessageService]
})
export class CreateFolderComponent {
  private fb = inject(FormBuilder);
  private folderService = inject(FolderService);
  private router = inject(Router);
  protected dialogRef = inject(MatDialogRef<CreateFolderComponent>);
  private accountService = inject(AccountService);

  constructor(private messageService: MessageService) {
  }

  isSubmitting = false;

  createFolderForm = this.fb.group({
    name: ['', Validators.required],
  })

  onSubmit() {
    if (!this.isSubmitting && this.createFolderForm.valid) {
      this.isSubmitting = true;

      const formValues = this.createFolderForm.value;
      const folder = {
        name: formValues.name
      };

      this.folderService.createFolder(folder).subscribe({
        next: response => {
          this.messageService.add({severity: 'success', summary:'Success', detail:"Thread created successfully!", life: 3000})
          this.router.navigateByUrl('/folder/' + response.id);
          this.dialogRef.close('created');
        },
        error: error => {
          this.isSubmitting = false;
          console.error('Error creating folder:', error);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
}
