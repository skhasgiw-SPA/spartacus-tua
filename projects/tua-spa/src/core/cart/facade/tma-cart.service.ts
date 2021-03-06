/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <deborah.cholmeley-jones@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  ActiveCartService,
  AuthService,
  CartActions,
  CartDataService,
  CartService,
  OCC_USER_ID_ANONYMOUS,
  StateWithCart
} from '@spartacus/core';
import * as TmaCartEntryActions from '../store/actions/tma-cart-entry.actions';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TmaOrderEntry } from '../../model';
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TmaCartService extends CartService implements OnDestroy {

  protected cartId: string;
  protected userId: string = OCC_USER_ID_ANONYMOUS;

  protected destroyed$ = new Subject();

  constructor(
    protected store: Store<StateWithCart>,
    protected cartData: CartDataService,
    protected authService: AuthService,
    protected activeCartService: ActiveCartService
  ) {
    super(store, cartData, authService, activeCartService);

    this.authService.getOccUserId()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((userId: string) =>
        this.userId = userId
      );

    this.activeCartService.getActiveCartId()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((cartId: string) =>
        this.cartId = cartId
      );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  addCartEntry(cartEntry: TmaOrderEntry): void {
    this.store.dispatch(
      new TmaCartEntryActions.AddCartEntry({
        userId: this.userId,
        cartId: this.cartId,
        cartEntry
      })
    );
  }

  updateCartEntry(cartEntry: TmaOrderEntry): void {
    this.store.dispatch(
      new TmaCartEntryActions.UpdateCartEntry({
        userId: this.userId,
        cartId: this.cartId,
        cartEntry
      })
    );
  }

  loadCart() {
    this.store.dispatch(new CartActions.LoadCart({
      userId: this.userId,
      cartId: this.cartId
    }));
  }
}
