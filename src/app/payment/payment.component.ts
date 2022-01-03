import { Component, DoCheck, OnInit } from '@angular/core';
import { StartBarRuteService } from '../startBarRuteService/startbarrute.service';
import { PaymentService } from '../paymentService/payment.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { StripeService, StripeElementsService, StripeCardComponent } from 'ngx-stripe'
import { StripeElementsOptions, StripeCardElementOptions} from '@stripe/stripe-js'
import { ViewChild } from '@angular/core'
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  
  loading?: boolean;
  strikeCheckout:any = null;
  stripeForm!: FormGroup ;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'auto'
  };

  constructor(
    private ruteService: StartBarRuteService,
    private paymentService: PaymentService,
    private stripeService: StripeService,
    private fb: FormBuilder,
    private router: Router
  ) {}



  ngOnInit() {
    this.stripeForm = this.fb.group({
      email: ['', [Validators.required , Validators.email]]
    })
  }

  createToken(): void {
    const name  = this.stripeForm.get('email')!.value ;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          console.log(result.token.id);
          this.paymentService.postHistory()
          this.router.navigate(['/success'])
        } else if (result.error) {
          this.router.navigate(['/error'])
        }
      });
  }

}
