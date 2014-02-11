# Authorize.net Types

[![Build Status](http://img.shields.io/travis/durango/authorize-net-types.svg)](https://travis-ci.org/durango/authorize-net-types) [![Dependency Status](https://david-dm.org/durango/authorize-net-types.svg?theme=shields.io)](https://david-dm.org/durango/authorize-net-types) [![devDependency Status](https://david-dm.org/durango/authorize-net-types/dev-status.svg?theme=shields.io)](https://david-dm.org/durango/authorize-net-types#info=devDependencies)

Authorize.net data types for Node.JS

## Installation

    npm install auth-net-types

## Usage

    var Types = require('auth-net-types');
    Types<Type>([options]);

## Tests

    make test

## Types

### Customer
```js
var Customer = new Types.Customer({
  merchantCustomerId: 123,
  description: 'A customer with a lot of cash.',
  email: 'completelyfake@dontemail.com',
  customerProfileId: 1234
});
```

### CustomerBasic
```js
var Customer = new Types.CustomerBasic({
  merchantCustomerId: 123,
  description: 'A customer with a lot of cash.',
  email: 'completelyfake@dontemail.com',
  customerProfileId: 1234
});
```

### BillingAddress
```js
var BillingAddress = new Types.BillingAddress({
  firstName: 'Dan',
  lastName: 'Smith',
  company: 'Company LLC',
  address: '123 Sesame St',
  city: 'Johnesville',
  state: 'fl',
  zip: 123,
  country: 'us',
  phoneNumber: 5551231234,
  faxNumber: 5551231235,
  customerAddressId: 1
});
```

### ShippingAddress
```js
var ShippingAddress = new Types.ShippingAddress({
  firstName: 'Dan',
  lastName: 'Smith',
  company: 'Company LLC',
  address: '123 Sesame St',
  city: 'Johnesville',
  state: 'fl',
  zip: 123,
  country: 'us',
  phoneNumber: 5551231234,
  faxNumber: 5551231235,
  customerAddressId: 1
});
```

### Address
```js
var Address = new Types.Address({
  firstName: 'Dan',
  lastName: 'Smith',
  company: 'Company LLC',
  address: '123 Sesame St',
  city: 'Johnesville',
  state: 'fl',
  zip: 123,
  country: 'us',
  phoneNumber: 5551231234,
  faxNumber: 5551231235,
  customerAddressId: 1
});
```

### PaymentProfiles
```js
var billingAddress = {
  firstName: 'Dan',
  lastName: 'Smith',
  company: 'Company LLC',
  address: '123 Sesame St',
  city: 'Johnesville',
  state: 'fl',
  zip: 123,
  country: 'us',
  phoneNumber: 5551231234,
  faxNumber: 5551231235,
  customerAddressId: 1
}

var creditCard = {
  cardNumber: 41111111111111111,
  expirationDate: '2012-01',
  cardCode: 111
}

var profile = new Types.PaymentProfiles({
  customerType: 'individual',
  billTo: new Types.BillingAddress(billingAddress),
  payment: new Types.Payment({
    creditCard: new Types.CreditCard(creditCard)
  }),
  customerPaymentProfileId: 123
});
```

### PaymentProfile
```js
var billingAddress = {
  firstName: 'Dan',
  lastName: 'Smith',
  company: 'Company LLC',
  address: '123 Sesame St',
  city: 'Johnesville',
  state: 'fl',
  zip: 123,
  country: 'us',
  phoneNumber: 5551231234,
  faxNumber: 5551231235,
  customerAddressId: 1
}

var creditCard = {
  cardNumber: 41111111111111111,
  expirationDate: '2012-01',
  cardCode: 111
}

var profile = new Types.PaymentProfile({
  customerType: 'individual',
  billTo: new Types.BillingAddress(billingAddress),
  payment: new Types.Payment({
    creditCard: new Types.CreditCard(creditCard)
  }),
  customerPaymentProfileId: 123
});
```

### Payment
```js
var creditCard = {
  cardNumber: 41111111111111111,
  expirationDate: '2012-01',
  cardCode: 111
}

var bankAccount = {
  accountType: 'individual',
  routingNumber: '123456',
  accountNumber: '1234567890',
  nameOnAccount: 'Bob Smith',
  echeckType: 'WEB',
  bankName: 'Steal Yo Money, LLC.'
}

var payment = new Types.Payment({
  creditCard: new Types.CreditCard(creditCard),
  bankAccount: new Types.BankAccount(bankAccount)
});
```

### PaymentSimple
```js
var creditCard = {
  cardNumber: 41111111111111111,
  expirationDate: '2012-01',
  cardCode: 111
}

var bankAccount = {
  accountType: 'individual',
  routingNumber: '123456',
  accountNumber: '1234567890',
  nameOnAccount: 'Bob Smith',
  echeckType: 'WEB',
  bankName: 'Steal Yo Money, LLC.'
}

var payment = new Types.PaymentSimple({
  creditCard: new Types.CreditCard(creditCard),
  bankAccount: new Types.BankAccount(bankAccount)
});
```

### Transaction
```js
var tax = {
  amount: 5.42,
  name: 'Tax Item',
  description: 'Tax Desc'
}

var shipping = {
  amount: 5.99,
  name: 'Ship Item',
  description: 'Ship Desc'
}

var duty = {
  amount: 5.42,
  name: 'Duty Item',
  description: 'Duty Desc'
}

var order = {
  invoiceNumber: 542,
  description: 'Order Desc',
  orderNumber: 123
}

var lineItems = [
  {itemId: 123, name: 'Name 1', description: 'Desc 1', quantity: 1, unitPrice: 1.2, taxable: false},
  {itemId: 124, name: 'Name 2', description: 'Desc 2', quantity: 2, unitPrice: 5.63, taxable: true}
];

var transaction = {
  amount: 5.41,
  tax: new Types.Tax(tax),
  shipping: new Types.Shipping(shipping),
  duty: new Types.Duty(duty),
  lineItems: new Types.LineItems(lineItems),
  creditCardNumberMasked: '****',
  bankAccountNumberMasked: '****',
  customerProfileId: 5,
  customerPaymentProfileId: 8,
  customerShippingAddressId: 3,
  order: new Types.Order(order),
  transId: 111,
  taxExempt: true,
  recurringBilling: false,
  cardCode: 444,
  splitTenderId: 8934,
  approvalCode: 21931
}

var Transaction = new Types.Transaction(transaction);
```

### Duty
```js
var Duty = new Types.Duty({
  amount: 5.67,
  name: 'Duty Taxes',
  description: 'My Description'
});
```

### Order
```js
var Order = new Types.Order({
  invoiceNumber: 124,
  description: 'My Description',
  purchaseOrderNumber: 12345
});
```

### Shipping
```js
var Shipping = new Types.Shipping({
  amount: 5.67,
  name: 'Shipping Name',
  description: 'My Description'
});
```

### Tax
```js
var Tax = new Types.Tax({
  amount: 5.67,
  name: 'Taxes',
  description: 'My Description'
});
```

### LineItems
```js
var lineItems = [
  {itemId: 123, name: 'Name 1', description: 'Desc 1', quantity: 1, unitPrice: 1.2, taxable: false},
  {itemId: 124, name: 'Name 2', description: 'Desc 2', quantity: 2, unitPrice: 5.63, taxable: true}
];

var LineItems = new Types.LineItems(lineItems);
```

### CreditCard
```js
var CreditCard = new Types.CreditCard({
  cardNumber: 41111111111111111,
  expirationDate: '2012-01',
  cardCode: 111
});
```


### BankAccount
```js
var BankAccount = new Types.BankAccount({
  accountType: 'individual',
  routingNumber: '123456',
  accountNumber: '1234567890',
  nameOnAccount: 'Bob Smith',
  echeckType: 'WEB',
  bankName: 'Steal Yo Money, LLC.'
});
```

### PaymentSchedule
```js
var PaymentSchedule = new Types.PaymentSchedule({
  interval: {
    length: 30,
    unit: 'days'
  },
  startDate: '2012-01',
  totalOccurences: 10,
  trialOccurences: 5
});
```

### Subscription
```js
var paymentSchedule = {
  interval: {
    length: 30,
    unit: 'days'
  },
  startDate: '2012-01',
  totalOccurences: 10,
  trialOccurences: 5
}

var creditCard = {
  cardNumber: 41111111111111111,
  expirationDate: '2012-01',
  cardCode: 111
}

var order = {
  invoiceNumber: 124,
  description: 'My Description'
}

var billingAddress = {
  firstName: 'Dan',
  lastName: 'Smith',
  company: 'Company LLC',
  address: '123 Sesame St',
  city: 'Johnesville',
  state: 'fl',
  zip: 123,
  country: 'us',
  phoneNumber: 5551231234,
  faxNumber: 5551231235
}

var shippingAddress = {
  firstName: 'Dan',
  lastName: 'Smith',
  company: 'Company LLC',
  address: '123 Sesame St',
  city: 'Johnesville',
  state: 'fl',
  zip: 123,
  country: 'us',
  phoneNumber: 5551231234,
  faxNumber: 5551231235
}

var subscription = {
  name: 'Hello',
  paymentSchedule: new Types.PaymentSchedule(paymentSchedule),
  amount: 5.62,
  trialAmount: 2.30,
  payment: new Types.Payment({
    creditCard: new Types.CreditCard(creditCard)
  }),
  order: new Types.Order(order),
  customer: {
    id: 124,
    email: 'fake@fakemeai.com',
    phoneNumber: 5551231234,
    faxNumber: 5551231235
  },
  billTo: new Types.BillingAddress(billingAddress),
  shipTo: new Types.ShippingAddress(shippingAddress)
}

var Subscription = new Types.Subscription(subscription);
```
