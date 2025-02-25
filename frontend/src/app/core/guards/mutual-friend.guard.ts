import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AccountService} from '../services/account.service';
import {ItemService} from '../services/item.service';
import {catchError, map, of} from 'rxjs';

export const mutualFriendGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const itemService = inject(ItemService);

  const userId = accountService.currentUser()?.id;
  if (!userId) {
    router.navigate(['/login']);
    return of(false);
  }

  const itemId = route.params['id'];
  return itemService.getItem(itemId).pipe(
    map(item => {
      if (item.isPublic || item.appUserId === userId) {
        return true;
      } else {
        router.navigate(['/access-denied']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/access-denied']);
      return of(false);
    })
  );
};
