/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <deborah.cholmeley-jones@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { CheckoutService } from '@spartacus/core';
import { OrderConfirmationTotalsComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { TmaOrder } from '../../../../../core/model';

@Component({
  selector: 'cx-order-confirmation-totals',
  templateUrl: './tma-order-confirmation-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TmaOrderConfirmationTotalsComponent extends OrderConfirmationTotalsComponent {

  order$: Observable<TmaOrder>;

  constructor(protected checkoutService: CheckoutService) {
    super(checkoutService);
  }
}
