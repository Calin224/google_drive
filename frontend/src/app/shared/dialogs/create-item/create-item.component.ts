import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {ItemService} from '../../../core/services/item.service';
import {Router} from '@angular/router';
import { AccountService } from '../../../core/services/account.service';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Button, ButtonDirective, ButtonIcon} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-create-item',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    Card,
    ButtonDirective
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss'
})
export class CreateItemComponent {
  private fb = inject(FormBuilder);
  private itemService = inject(ItemService);
  private router = inject(Router);
  protected dialogRef = inject(MatDialogRef<CreateItemComponent>);
  private accountService = inject(AccountService);

  folderId!: number;
  isSubmitting = false;

  createItemForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required]
  })

  onSubmit() {
    if (!this.isSubmitting && this.createItemForm.valid) {
        this.isSubmitting = true;
        const formValues = this.createItemForm.value;
        const item = {
            name: formValues.name!,
            description: formValues.description!,
            category: formValues.category!,
            folderId: this.folderId
        };

        this.itemService.createItem(item, this.folderId).subscribe({
            next: createdItem => {
                this.dialogRef.close('created');
            },
            error: error => {
                this.isSubmitting = false;
                console.error('Error creating item:', error);
            },
            complete: () => {
                this.isSubmitting = false;
            }
        });
    }
}

}
