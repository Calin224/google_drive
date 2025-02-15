import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {ItemService} from '../../../core/services/item.service';
import {Router} from '@angular/router';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-create-item',
  imports: [
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss'
})
export class CreateItemComponent {
  private fb = inject(FormBuilder);
  private itemService = inject(ItemService);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<CreateItemComponent>);
  private accountService = inject(AccountService);
  // private snackbarService = inject(SnackbarService);

  createItemForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required]
  })

  onSubmit(){
    if (this.createItemForm.valid) {
      const formValues = this.createItemForm.value;
      const user = this.accountService.currentUser();
      const item = {
        name: formValues.name!,
        description: formValues.description!,
        category: formValues.category!,
      };

      this.itemService.createItem(item).subscribe({
        next: createdItem => {
          this.router.navigateByUrl(`/item/${createdItem.id}`);
          this.dialogRef.close();
        }
      });
    }
  }

}
