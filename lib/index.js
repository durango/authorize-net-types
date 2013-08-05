/**
  A class that contains all fields for a CIM Customer Profile.


  @param {Object} [options={}] An object with options.
    @param {String|Number} [options.merchantCustomerId=''] Merchant's customer ID.
    @param {String} [options.description=''] Description of the customer.
    @param {String} [options.email=''] Customer's email.
    @param {String|Number} [options.customerProfileId=''] Customer's profile ID
    @param {Array|Object|AuthorizePaymentProfiles} [options.paymentProfiles=AuthorizePaymentProfiles] An object with paymentProfile values.
      @param {String} [options.customerType=''] Customer's type (individual or business).
      @param {String|Number} [options.paymentProfileId=''] Customer's payment profile ID.
      @param {Array|Object|AuthorizeBillingAddress} [options.billTo=AuthorizeBillingAddress] An object with billing addresses.
        @param {String} [options.billTo.firstName=''] Billing addressee's first name.
        @param {String} [options.billTo.lastName=''] Billing addressee's last name.
        @param {String} [options.billTo.address=''] Billing address.
        @param {String} [options.billTo.city=''] Billing address' city.
        @param {String|Number} [options.billTo.zip=''] Billing address' ZIP/Postal code.
        @param {String} [options.billTo.country='']  Billing address' country.
        @param {String} [options.billTo.phoneNumber=''] Billing address' phone number.
        @param {String} [options.billTo.faxNumber=''] Billing address' fax number.
      @param {Array|Object|AuthorizePayment} [options.payment=AuthorizePayment] Payment information.
        @param {Object|AuthorizeCreditCard} [options.payment.creditCard=AuthorizeCreditCard] Credit card information.
          @param {String|Number} [options.payment.creditCard.cardNumber=''] Credit card's number.
          @param {String} [options.payment.creditCard.expirationDate=''] Credit card's expiration date.
          @param {String|Number} [options.payment.creditCard.cardCode=''] CCV/credit card's code.
        @param {Object|AuthorizeBankAccount} [options.payment.bankAccount=AuthorizeBankAccount] Bank account information.
          @param {String} [options.payment.bankAccount.accountType=''] Bank account's type (e.g. checking)
          @param {String|Number} [options.payment.bankAccount.routingNumber=''] Bank account's routing number.
          @param {String|Number} [options.payment.bankAccount.accountNumber=''] Bank acocunt's account number.
          @param {String} [options.payment.bankAccount.nameOnAccount=''] The bank acocunt's owner's name.
          @param {String} [options.payment.bankAccount.echeckType=''] The type of electronic check transaction (CCD, PPD, TEL, or WEB)
          @param {String} [options.payment.bankAccount.bankName=''] The bank's name.

  @example
    // Simple
    var Customer = new AuthorizeTypes.Customer({
      merchantCustomerId: 123,
      description: 'A customer with a lot of cash.',
      email: 'completelyfake@dontemail.com',
      customerProfileId: 1234
    });

    // With payment profile
    var Customer = new AuthorizationTypes.Customer({
      merchantCustomerId: 123,
      description: 'A customer with a lot of cash.',
      email: 'completelyfake@dontemail.com',
      customerProfileId: 1234,
      paymentProfiles: {
        customerType: 'individual',
        paymentProfileId: 12345,
        billTo: {
          firstName: 'Bob',
          lastName: 'Smith',
          address: '123 Sesame St',
          city: 'Johnesville',
          state: 'FL',
          zip: 123,
          country: 'US',
          phoneNumber: '555-123-1234',
          faxNumber: '555-123-1235'
        },
        payment: {
          creditCard: {
            cardCode: 123,
            cardNumber: '41111111111111111',
            expirationDate: '10-12'
          }
        }
      }
    });

  @class AuthorizeCustomer
  @constructor
*/

var AuthorizeCustomer = function(options) {
  if (options instanceof AuthorizeCustomer) {
    return options;
  }

  options = options || {};

  this.merchantCustomerId = options.merchantCustomerId || '';
  this.description        = options.description || '';
  this.email              = options.email || '';
  this.customerProfileId  = options.customerProfileId || '';
  this.shipToList         = new AuthorizeShippingAddress(options.shipToList);
  this.paymentProfiles    = new AuthorizePaymentProfiles(options.paymentProfiles);

  /*
  @returns {String} XML output for AuthorizePaymentProfileSimple.
  */
  this.toXml = function() {
    var xml = '' +
      '<profile>' +
        (!!this.merchantCustomerId ? '<merchantCustomerId>' + this.merchantCustomerId + '</merchantCustomerId>' : '') +
        (!!this.description ? '<description>' + this.description + '</description>' : '') +
        (!!this.email ? '<email>' + this.email + '</email>' : '') +
        this.paymentProfiles.toXml() +
        (this.shipToList.length > 0 ? '<shipToList>' + this.shipToList.toXml() + '</shipToList>' : '') +
      '</profile>';

    return xml;
  }
}
module.exports.Customer = AuthorizeCustomer;

/**
  A class that contains the basic fields for a CIM Customer Profile.


  @param {Object} [options={}] An object with options.
    @param {String|Number} [options.merchantCustomerId=''] Merchant's customer ID.
    @param {String} [options.description=''] Description of the customer.
    @param {String} [options.email=''] Customer's email.
    @param {String|Number} [options.customerProfileId=''] Customer's profile ID

  @example
    var CustomerBasic = new AuthorizeTypes.CustomerBasic({
      email: 'newfakeemail@email.com',
      merchantCustomerId: 1234,
      description: 'New description!',
      customerProfileId: 123
    }

  @class AuthorizeCustomerBasic
  @constructor
*/

var AuthorizeCustomerBasic = function(options) {
  if (options instanceof AuthorizeCustomerBasic) {
    return options;
  }

  options = options || {};

  this.merchantCustomerId = options.merchantCustomerId || '';
  this.description        = options.description || '';
  this.email              = options.email || '';
  this.customerProfileId  = options.customerProfileId || '';

  /*
  @returns {String} XML output for AuthorizePaymentProfileSimple.
  */
  this.toXml = function() {
    var xml = '' +
      '<profile>' +
        (!!this.merchantCustomerId ? '<merchantCustomerId>' + this.merchantCustomerId + '</merchantCustomerId>' : '') +
        (!!this.description ? '<description>' + this.description + '</description>' : '') +
        (!!this.email ? '<email>' + this.email + '</email>' : '') +
        (!!this.customerProfileId ? '<customerProfileId>' + this.customerProfileId + '</customerProfileId>' : '') +
      '</profile>';

    return xml;
  }
}
module.exports.CustomerBasic = AuthorizeCustomerBasic;

/**
  A class that contains all fields for a billing address.

  @param {Array|Object} [address=[{}]] An object/array of objects with options.
    @param {String} [address.firstName=''] Addressee's first name.
    @param {String} [address.lastName=''] Addressee's last name.
    @param {String} [address.company=''] Addresee's company name.
    @param {String} [address.address=''] Addressee's street address.
    @param {String} [address.city=''] Addressee's city.
    @param {String} [address.state=''] Addressee's state.
    @param {String|Number} [address.zip=''] Addressee's postal/ZIP code.
    @param {String} [address.country=''] Addressee's country.
    @param {String} [address.phoneNumber=''] Addressee's phone number.
    @param {String} [address.faxNumber=''] Addressee's fax number.
    @param {String} [address.customerAddressId=''] Customer's address ID.

  @example
    var billingAddress = new AuthorizeTypes.BillingAddress({
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

  @class AuthorizeBillingAddress
  @constructor
*/
var AuthorizeBillingAddress = function(addresses) {
  if (addresses instanceof AuthorizeBillingAddress) {
    return addresses;
  }

  this.bin  = [];
  addresses = addresses || [];
  addresses = Array.isArray(addresses) ? addresses : [addresses];
  var i = 0
    , length = addresses.length;

  for (i = 0; i < length; ++i) {
    this.bin[this.bin.length] = new AuthorizeAddress(addresses[i]);
  }

  this.length = this.bin.length;
  /*
  @returns {String} XML output for AuthorizePaymentProfileSimple.
  */
  this.toXml = function() {
    if (this.bin.length < 1) {
      return '';
    }

    var xml = '';
    for (var i = 0; i < this.bin.length; ++i) {
      xml += '<billTo>' + this.bin[i].toXml() + '</billTo>';
    }
    return xml;
  }
}
module.exports.BillingAddress = AuthorizeBillingAddress;

/**
  A class that contains all fields for a CIM Address.

  @param {Array|Object} [address=[{}]] An object/array of objects with options.
    @param {String} [address.firstName=''] Addressee's first name.
    @param {String} [address.lastName=''] Addressee's last name.
    @param {String} [address.company=''] Addresee's company name.
    @param {String} [address.address=''] Addressee's street address.
    @param {String} [address.city=''] Addressee's city.
    @param {String} [address.state=''] Addressee's state.
    @param {String|Number} [address.zip=''] Addressee's postal/ZIP code.
    @param {String} [address.country=''] Addressee's country.
    @param {String} [address.phoneNumber=''] Addressee's phone number.
    @param {String} [address.faxNumber=''] Addressee's fax number.
    @param {String} [address.customerAddressId=''] Customer's address ID.

  @example
    var shippingAddress = new AuthorizeTypes.ShippingAddress({
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

  @class AuthorizeShippingAddress
  @constructor
*/
var AuthorizeShippingAddress = function(addresses) {
  if (addresses instanceof AuthorizeShippingAddress) {
    return addresses;
  }

  this.bin  = [];
  addresses = addresses || [];
  addresses = Array.isArray(addresses) ? addresses : [addresses];
  var i = 0
    , length = addresses.length;

  for (i = 0; i < length; ++i) {
    this.bin[this.bin.length] = new AuthorizeAddress(addresses[i]);
  }

  this.length = this.bin.length;
  /*
  @returns {String} XML output for AuthorizePaymentProfileSimple.
  */
  this.toXml = function() {
    if (this.bin.length < 1) {
      return '';
    }

    var xml = '';
    for (var i = 0; i < this.bin.length; ++i) {
      xml += this.bin[i].toXml();
    }
    return xml;
  }
}
module.exports.ShippingAddress = AuthorizeShippingAddress;

/**
  A class that contains all fields for a CIM Address.

  @param {Array|Object} [address=[{}]] An object/array of objects with options.
    @param {String} [address.firstName=''] Addressee's first name.
    @param {String} [address.lastName=''] Addressee's last name.
    @param {String} [address.company=''] Addresee's company name.
    @param {String} [address.address=''] Addressee's street address.
    @param {String} [address.city=''] Addressee's city.
    @param {String} [address.state=''] Addressee's state.
    @param {String|Number} [address.zip=''] Addressee's postal/ZIP code.
    @param {String} [address.country=''] Addressee's country.
    @param {String} [address.phoneNumber=''] Addressee's phone number.
    @param {String} [address.faxNumber=''] Addressee's fax number.
    @param {String} [address.customerAddressId=''] Customer's address ID.

  @example
    var address = new AuthorizeTypes.Address({
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

  @class AuthorizeAddress
  @constructor
*/
var AuthorizeAddress = function(address) {
  if (address instanceof AuthorizeAddress) {
    return address;
  }

  address = address || {};

  this.firstName          = address.firstName || '';
  this.lastName           = address.lastName || '';
  this.company            = address.company || '';
  this.address            = address.address || '';
  this.city               = address.city || '';
  this.state              = address.state || '';
  this.zip                = address.zip || '';
  this.country            = address.country || '';
  this.phoneNumber        = address.phoneNumber || '';
  this.faxNumber          = address.faxNumber || '';
  this.customerAddressId  = address.customerAddressId || '';

  /*
  @returns {String} XML output for AuthorizePaymentProfileSimple.
  */
  this.toXml = function() {
    var xml = '' +
      (!!this.firstName ? '<firstName>' + this.firstName + '</firstName>' : '') +
      (!!this.lastName ? '<lastName>' + this.lastName + '</lastName>' : '') +
      (!!this.company ? '<company>' + this.company + '</company>' : '') +
      (!!this.address ? '<address>' + this.address + '</address>' : '') +
      (!!this.city ? '<city>' + this.city + '</city>' : '') +
      (!!this.state ? '<state>' + this.state + '</state>' : '') +
      (!!this.zip ? '<zip>' + this.zip + '</zip>' : '') +
      (!!this.country ? '<country>' + this.country + '</country>' : '') +
      (!!this.phoneNumber ? '<phoneNumber>' + this.phoneNumber + '</phoneNumber>' : '') +
      (!!this.faxNumber ? '<faxNumber>' + this.faxNumber + '</faxNumber>' : '') +
      (!!this.customerAddressId ? '<customerAddressId>' + this.customerAddressId + '</customerAddressId>' : '');

    return xml;
  }
}
module.exports.Address = AuthorizeAddress;

/**
  A class that contains all fields for a CIM Payment Profile with an XML output for multiple profiles.


  @param {Object|Array} [profiles=[{}]] An object/an array of objects of payment profiles.
    @param {String} [profiles.customerType=''] Customer's type, either individual or business.
    @param {Object|Array} [profiles.billTo=[{}]] An object/an array of objects of billing addresses.
      @param {String} [profiles.billTo.firstName=''] Addressee's first name.
      @param {String} [profiles.billTo.lastName=''] Addressee's last name.
      @param {String} [profiles.billTo.company=''] Addresee's company name.
      @param {String} [profiles.billTo.address=''] Addressee's street address.
      @param {String} [profiles.billTo.city=''] Addressee's city.
      @param {String} [profiles.billTo.state=''] Addressee's state.
      @param {String|Number} [profiles.billTo.zip=''] Addressee's postal/ZIP code.
      @param {String} [profiles.billTo.country=''] Addressee's country.
      @param {String} [profiles.billTo.phoneNumber=''] Addressee's phone number.
      @param {String} [profiles.billTo.faxNumber=''] Addressee's fax number.
      @param {String} [profiles.billTo.customerAddressId=''] Customer's address ID.
    @param {Object|Array} [profiles.payment=[{}]] An object/an array of objects of payments.
      @param {Object|Array} [options.payment.creditCard=[{}]] An array of objects/an object for credit cards.
        @param {String|Number} [options.payment.creditCard.cardNumber=''] Customer's credit card number.
        @param {String} [options.payment.creditCard.expirationDate=''] Customer's credit card expiration date.
        @param {String|Number} [options.payment.creditCard.cardCode=''] Customer's credit card code.
      @param {Object|Array} [options.payment.bankAccount=[{}]] An array of objects/an object of bank accounts.
        @param {String} [options.payment.bankAccount.accountType=''] Customer's bank account type (individual or business).
        @param {String|Number} [options.payment.bankAccount.routingNumber=''] Customer's routing number.
        @param {String|Number} [options.payment.bankAccount.accountNumber=''] Customer's account number.
        @param {String} [options.payment.bankAccount.nameOnAccount=''] Name on the bank account.
        @param {String} [options.payment.bankAccount.echeckType=''] Customer's echeck type.
        @param {String} [options.payment.bankAccount.bankName=''] Bank's name.
    @param {String|Number} [profiles.customerPaymentProfileId=''] Customer's payment profile ID.

  @example
    var profile = new Types.PaymentProfiles({
      customerType: 'individual',
      billTo: new Types.BillingAddress({
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
      }),
      payment: new Types.Payment({
        creditCard: {
          cardNumber: 41111111111111111,
          expirationDate: '2012-01',
          cardCode: 111
        }
      }),
      customerPaymentProfileId: 123
    });

  @class AuthorizePaymentProfiles
  @constructor
*/

var AuthorizePaymentProfiles = function(profiles) {
  if (profiles instanceof AuthorizePaymentProfiles) {
    return profiles;
  }

  this.bin = [];
  profiles = profiles || [];
  profiles = Array.isArray(profiles) ? profiles : [profiles];

  var i = 0
    , length = profiles.length;

  for (i = 0; i < length; ++i) {
    this.bin[this.bin.length] = {
      customerType: profiles[i].customerType || '',
      billTo:       new AuthorizeBillingAddress(profiles[i].billTo),
      payment:      new AuthorizePayment(profiles[i].payment),
      customerPaymentProfileId: profiles[i].paymentProfileId || profiles[i].customerPaymentProfileId || ''
    }
  }

  this.length = this.bin.length;
  /*
  @returns {String} XML output for AuthorizePaymentProfileSimple.
  */
  this.toXml = function() {
    if (this.bin.length < 1) {
      return '';
    }

    var xml = '';
    for (var i = 0; i < this.bin.length; ++i) {
      xml += '<paymentProfiles>' +
      (!!this.bin[i].customerType ? '<customerType>' + this.bin[i].customerType + '</customerType>' : '') +
      (!!this.bin[i].customerPaymentProfileId ? '<customerPaymentProfileId>' + this.bin[i].customerPaymentProfileId + '</customerPaymentProfileId>' : '') +
      this.bin[i].billTo.toXml() +
      this.bin[i].payment.toXml() +
      '</paymentProfiles>';
    }

    return xml;
  }
}
module.exports.PaymentProfiles = AuthorizePaymentProfiles;

/**
  A class that contains all fields for a CIM Payment Profile with an XML output of a single profile.


  @param {Object|Array} [profiles=[{}]] An object/an array of objects of payment profiles.
    @param {String} [profiles.customerType=''] Customer's type, either individual or business.
    @param {Object|Array} [profiles.billTo=[{}]] An object/an array of objects of billing addresses.
      @param {String} [profiles.billTo.firstName=''] Addressee's first name.
      @param {String} [profiles.billTo.lastName=''] Addressee's last name.
      @param {String} [profiles.billTo.company=''] Addresee's company name.
      @param {String} [profiles.billTo.address=''] Addressee's street address.
      @param {String} [profiles.billTo.city=''] Addressee's city.
      @param {String} [profiles.billTo.state=''] Addressee's state.
      @param {String|Number} [profiles.billTo.zip=''] Addressee's postal/ZIP code.
      @param {String} [profiles.billTo.country=''] Addressee's country.
      @param {String} [profiles.billTo.phoneNumber=''] Addressee's phone number.
      @param {String} [profiles.billTo.faxNumber=''] Addressee's fax number.
      @param {String} [profiles.billTo.customerAddressId=''] Customer's address ID.
    @param {Object|Array} [profiles.payment=[{}]] An object/an array of objects of payments.
      @param {Object|Array} [options.payment.creditCard=[{}]] An array of objects/an object for credit cards.
        @param {String|Number} [options.payment.creditCard.cardNumber=''] Customer's credit card number.
        @param {String} [options.payment.creditCard.expirationDate=''] Customer's credit card expiration date.
        @param {String|Number} [options.payment.creditCard.cardCode=''] Customer's credit card code.
      @param {Object|Array} [options.payment.bankAccount=[{}]] An array of objects/an object of bank accounts.
        @param {String} [options.payment.bankAccount.accountType=''] Customer's bank account type (individual or business).
        @param {String|Number} [options.payment.bankAccount.routingNumber=''] Customer's routing number.
        @param {String|Number} [options.payment.bankAccount.accountNumber=''] Customer's account number.
        @param {String} [options.payment.bankAccount.nameOnAccount=''] Name on the bank account.
        @param {String} [options.payment.bankAccount.echeckType=''] Customer's echeck type.
        @param {String} [options.payment.bankAccount.bankName=''] Bank's name.
    @param {String|Number} [profiles.customerPaymentProfileId=''] Customer's payment profile ID.

  @example
    var profile = new Types.PaymentProfile({
      customerType: 'individual',
      billTo: new Types.BillingAddress({
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
      }),
      payment: new Types.Payment({
        creditCard: {
          cardNumber: 41111111111111111,
          expirationDate: '2012-01',
          cardCode: 111
        }
      }),
      customerPaymentProfileId: 123
    });

  @class AuthorizePaymentProfile
  @constructor
*/
var AuthorizePaymentProfile = function(profiles) {
  if (profiles instanceof AuthorizePaymentProfile) {
    return profiles;
  }

  this.bin = [];

  profiles = profiles || [];
  profiles = Array.isArray(profiles) ? profiles : [profiles];
  var i = 0
    , length = profiles.length;

  for (i = 0; i < length; ++i) {
    this.bin[this.bin.length] = {
      customerType: profiles[i].customerType || '',
      billTo:       new AuthorizeBillingAddress(profiles[i].billTo),
      payment:      new AuthorizePayment(profiles[i].payment),
      customerPaymentProfileId: profiles[i].paymentProfileId || profiles[i].customerPaymentProfileId || ''
    }
  }

  this.length = this.bin.length;
  /*
  @returns {String} XML output for AuthorizePaymentProfiles.
  */
  this.toXml = function() {
    if (this.bin.length < 1) {
      return '';
    }

    var xml = '';
    for (var i = 0; i < this.bin.length; ++i) {
      xml += '<paymentProfile>' +
      (!!this.bin[i].customerType ? '<customerType>' + this.bin[i].customerType + '</customerType>' : '') +
      this.bin[i].billTo.toXml() +
      this.bin[i].payment.toXml() +
      (!!this.bin[i].customerPaymentProfileId ? '<customerPaymentProfileId>' + this.bin[i].customerPaymentProfileId + '</customerPaymentProfileId>' : '') +
      '</paymentProfile>';
    }

    return xml;
  }
}
module.exports.PaymentProfile = AuthorizePaymentProfile;

/*
var AuthorizePaymentProfileSimple = function(profiles) {
  if (profiles instanceof AuthorizePaymentProfileSimple) {
    return profiles;
  }

  this.bin = [];

  profiles = profiles || [];
  profiles = Array.isArray(profiles) ? profiles : [profiles];
  var i = 0
    , length = profiles.length;

  for (i = 0; i < length; ++i) {
    this.bin[this.bin.length] = {
      customerType: profiles[i].customerType || '',
      billTo:       new AuthorizeBillingAddress(profiles[i].billTo),
      payment:      new AuthorizePaymentSimple(profiles[i].payment),
      customerPaymentProfileId: profiles[i].customerPaymentProfileId || ''
    }
  }

  this.length = this.bin.length;
  this.toXml = function() {
    if (this.bin.length < 1) {
      return '';
    }

    var xml = '';
    for (var i = 0; i < this.bin.length; ++i) {
      xml += '<paymentProfile>' +
      (!!this.bin[i].customerType ? '<customerType>' + this.bin[i].customerType + '</customerType>' : '') +
      (!!this.bin[i].customerPaymentProfileId ? '<customerPaymentProfileId>' + this.bin[i].customerPaymentProfileId + '</customerPaymentProfileId>' : '') +
      this.bin[i].billTo.toXml() +
      this.bin[i].payment.toXml() +
      '</paymentProfile>';
    }

    return xml;
  }
}
module.exports.PaymentProfileSimple = AuthorizePaymentProfileSimple;
*/


/**
  A class that contains all fields for a CIM Payment with an XML output including <payment>


  @param {Object|Array} [options=[{}]] An array of objects/an object of options.
    @param {Object|Array} [options.creditCard=[{}]] An array of objects/an object for credit cards.
      @param {String|Number} [options.creditCard.cardNumber=''] Customer's credit card number.
      @param {String} [options.creditCard.expirationDate=''] Customer's credit card expiration date.
      @param {String|Number} [options.creditCard.cardCode=''] Customer's credit card code.
    @param {Object|Array} [options.bankAccount=[{}]] An array of objects/an object of bank accounts.
      @param {String} [options.bankAccount.accountType=''] Customer's bank account type (individual or business).
      @param {String|Number} [options.bankAccount.routingNumber=''] Customer's routing number.
      @param {String|Number} [options.bankAccount.accountNumber=''] Customer's account number.
      @param {String} [options.bankAccount.nameOnAccount=''] Name on the bank account.
      @param {String} [options.bankAccount.echeckType=''] Customer's echeck type.
      @param {String} [options.bankAccount.bankName=''] Bank's name.

  @example
    var payment = new Types.Payment({
        creditCard: new Types.CreditCard({
        cardNumber: 41111111111111111,
        expirationDate: '2012-01',
        cardCode: 111
      })
    });

    var payment = new Types.Payment({
      bankAccount: new Types.BankAccount({
        accountType: 'individual',
        routingNumber: '123456',
        accountNumber: '1234567890',
        nameOnAccount: 'Bob Smith',
        echeckType: 'WEB',
        bankName: 'Steal Yo Money, LLC.'
      })
    });

  @class AuthorizePayment
  @constructor
*/
var AuthorizePayment = function(options) {
  if (options instanceof AuthorizePayment) {
    return options;
  }
  options = options || [];
  options = Array.isArray(options) ? options : [options];

  this.bin = [];

  var i = 0
    , length = options.length;

  for (i = 0; i < length; ++i) {
    this.bin[this.bin.length] = {
      creditCard:   new AuthorizeCreditCard(options[i].creditCard),
      bankAccount:  new AuthorizeBankAccount(options[i].bankAccount)
    }
  }

  this.length = this.bin.length;
  /*
  @returns {String} XML output for AuthorizePaymentProfileSimple.
  */
  this.toXml = function() {
    if (this.bin.length < 1) {
      return '';
    }

    var xml = '<payment>';
    for (var i = 0; i < this.bin.length; ++i) {
      if (this.bin[i].creditCard.length > 0) {
        xml += this.bin[i].creditCard.toXml();
      }
      if (this.bin[i].bankAccount.length > 0) {
        xml += this.bin[i].bankAccount.toXml();
      }
    }
    xml += '</payment>';

    return xml;
  }
}
module.exports.Payment = AuthorizePayment;

/**
  A class that contains all fields for a CIM Payment with an XML output excluding <payment>


  @param {Object|Array} [options=[{}]] An array of objects/an object of options.
    @param {Object|Array} [options.creditCard=[{}]] An array of objects/an object for credit cards.
      @param {String|Number} [options.creditCard.cardNumber=''] Customer's credit card number.
      @param {String} [options.creditCard.expirationDate=''] Customer's credit card expiration date.
      @param {String|Number} [options.creditCard.cardCode=''] Customer's credit card code.
    @param {Object|Array} [options.bankAccount=[{}]] An array of objects/an object of bank acocunts.
      @param {String} [options.bankAccount.accountType=''] Customer's bank account type (individual or business).
      @param {String|Number} [options.bankAccount.routingNumber=''] Customer's routing number.
      @param {String|Number} [options.bankAccount.accountNumber=''] Customer's account number.
      @param {String} [options.bankAccount.nameOnAccount=''] Name on the bank account.
      @param {String} [options.bankAccount.echeckType=''] Customer's echeck type.
      @param {String} [options.bankAccount.bankName=''] Bank's name.

  @example
    var payment = new Types.PaymentSimple({
        creditCard: new Types.CreditCard({
        cardNumber: 41111111111111111,
        expirationDate: '2012-01',
        cardCode: 111
      })
    });

    var payment = new Types.PaymentSimple({
      bankAccount: new Types.BankAccount({
        accountType: 'individual',
        routingNumber: '123456',
        accountNumber: '1234567890',
        nameOnAccount: 'Bob Smith',
        echeckType: 'WEB',
        bankName: 'Steal Yo Money, LLC.'
      })
    });

  @class AuthorizePaymentSimple
  @constructor
*/
var AuthorizePaymentSimple = function(options) {
  if (options instanceof AuthorizePaymentSimple) {
    return options;
  }

  this.bin  = [];
  options   = options || [];
  options   = Array.isArray(options) ? options : [options];

  var i = 0
    , length = options.length;

  for (i = 0; i < length; ++i) {
    this.bin[this.bin.length] = {
      creditCard:   new AuthorizeCreditCard(options[i].creditCard),
      bankAccount:  new AuthorizeBankAccount(options[i].bankAccount)
    }
  }

  this.length = this.bin.length;

  /*
  @returns {String} XML output for AuthorizePaymentSimple.
  */
  this.toXml = function() {
    if (this.bin.length < 1) {
      return '';
    }

    var xml = '';
    for (var i = 0; i < this.bin.length; ++i) {
      if (this.bin[i].creditCard.length > 0) {
        xml += this.bin[i].creditCard.toXml();
      }
      if (this.bin[i].bankAccount.length > 0) {
        xml += this.bin[i].bankAccount.toXml();
      }
    }

    return xml;
  }
}
module.exports.PaymentSimple = AuthorizePaymentSimple;

/**
  A class that contains all fields for a CIM Transaction.


  @param {Object} [options={}] An object of options.
    @param {String|Number|Float} [options.amount=''] The transaction's amount.
    @param {Object} [options.tax={}] The transaction's tax information.
      @param {String|Number|Float} [options.tax.amount=''] Tax's amount.
      @param {String|Number} [options.tax.name=''] Tax's line item name.
      @param {String} [options.tax.description=''] Tax's description.
    @param {Object|Array} [options.shipping=[{}]] An array of objects/an object of shipping addresses.
      @param {String|Number|Float} [options.shipping.amount=''] Shipping's amount.
      @param {String|Number} [options.shipping.name=''] Shipping's line item name.
      @param {String} [options.shipping.description=''] Shipping's description.
    @param {Object} [options.duty={}] An object containing transaction's duty information.
      @param {String|Number|Float} [options.duty.amount=''] Duty's amount.
      @param {String} [options.duty.name=''] Duty's name.
      @param {String} [options.duty.description=''] Duty's description.
    @param {Object|Array} [options.lineItems=[{}]] An array of objects/an object of the transaction's line items.
      @param {String|Number} [options.lineItems.itemId=''] Line item's ID.
      @param {String} [options.lineItems.name=''] Line item's name.
      @param {String} [options.lineItems.description=''] Line item's description.
      @param {String|Number|Float} [options.lineItems.quantity=''] Line item's quantity.
      @param {String|Number|Float} [options.lineItems.unitPrice=''] Line item's unit price.
      @param {Boolean} [options.lineItems.taxable] If the line item is taxable or not.
    @param {String} [options.creditCardNumberMasked=''] Credit card's masked value (usually includes "*"s).
    @param {String} [options.bankAccountNumberMasked=''] Bank account's masked value (usually includes "*"s).
    @param {String|Number} [options.customerProfileId=''] Customer's profile ID.
    @param {String|Number} [options.customerPaymentProfileId=''] Customer's payment profile ID.
    @param {String|Number} [options.customerShippingAddressId=''] Customer's shipping address ID.
    @param {Object} [options.order={}] An object containing the order's information.
      @param {String|Number|Float} [options.order.invoiceNumber=''] Order's invoice number.
      @param {String} [options.order.description=''] Order's description.
      @param {String|Number} [options.order.orderNumber=''] Orders's purchase order number.
    @param {String|Number} [options.transId=''] Transaction's ID.
    @param {Boolean} [options.taxExempt=''] Determines whether the transaction is tax exempted or not (default is left out).
    @param {Boolean} [options.recurringBilling=''] Determines whether this transaction will be recurring (default is left out).
    @param {String|Number} [options.cardCode=''] Transaction's card code.
    @param {String|Number} [options.splitTenderId=''] The split tender's ID for the transaction.
    @param {String|Number} [options.approvalCode=''] The transaction's approval code (usually given to you from Auth.net after a verification process).

  @example
    var lineItems = [
      {itemId: 123, name: 'Name 1', description: 'Desc 1', quantity: 1, unitPrice: 1.2, taxable: false},
      {itemId: 124, name: 'Name 2', description: 'Desc 2', quantity: 2, unitPrice: 5.63, taxable: true}
    ];

    var transaction = new AuthorizeTypes.Transaction({
      amount: 5.41,
      tax: new Types.Tax({
        amount: 5.42,
        name: 'Tax Item',
        description: 'Tax Desc'
      }),
      shipping: new Types.Shipping({
        amount: 5.99,
        name: 'Ship Item',
        description: 'Ship Desc'
      }),
      duty: new Types.Duty({
        amount: 5.42,
        name: 'Duty Item',
        description: 'Duty Desc'
      }),
      lineItems: new Types.LineItems(lineItems),
      creditCardNumberMasked: '****',
      bankAccountNumberMasked: '****',
      customerProfileId: 5,
      customerPaymentProfileId: 8,
      customerShippingAddressId: 3,
      order: new Types.Order({
        invoiceNumber: 542,
        description: 'Order Desc',
        orderNumber: 123
      }),
      transId: 111,
      taxExempt: true,
      recurringBilling: false,
      cardCode: 444,
      splitTenderId: 8934,
      approvalCode: 21931
    });

  @class AuthorizeTransaction
  @constructor
*/
var AuthorizeTransaction = function(options) {
  if (options instanceof AuthorizeTransaction) {
    return options;
  }

  options = options || {};

  this.amount                    = options.amount || '';
  this.tax                       = new AuthorizeTax(options.tax);
  this.shipping                  = new AuthorizeShipping(options.shipping);
  this.duty                      = new AuthorizeDuty(options.duty);
  this.lineItems                 = new AuthorizeLineItems(options.lineItems);
  this.creditCardNumberMasked    = options.creditCardNumberMasked || '';
  this.bankRoutingNumberMasked   = options.bankRoutingNumberMasked || '';
  this.bankAccountNumberMasked   = options.bankAccountNumberMasked || '';
  this.customerProfileId         = options.customerProfileId || '';
  this.customerPaymentProfileId  = options.customerPaymentProfileId || '';
  this.customerShippingAddressId = options.customerShippingAddressId || '';
  this.order                     = new AuthorizeOrder(options.order);
  this.transId                   = options.transId || '';
  this.taxExempt                 = (options.hasOwnProperty('taxExempt') ? options.taxExempt.toString() : '');
  this.recurringBilling          = (options.hasOwnProperty('recurringBilling') ? options.recurringBilling.toString() : '');
  this.cardCode                  = options.cardCode || '';
  this.splitTenderId             = options.splitTenderId || '';
  this.approvalCode              = options.approvalCode || '';

  /*
  @returns {String} XML output for AuthorizeTransaction.
  */
  this.toXml = function() {
    var xml = '' +
      (!!this.amount ? '<amount>' + this.amount + '</amount>' : '') +
      this.tax.toXml() +
      this.shipping.toXml() +
      this.duty.toXml() +
      this.lineItems.toXml() +
      (!!this.customerProfileId ? '<customerProfileId>' + this.customerProfileId + '</customerProfileId>' : '') +
      (!!this.customerPaymentProfileId ? '<customerPaymentProfileId>' + this.customerPaymentProfileId + '</customerPaymentProfileId>' : '') +
      (!!this.customerShippingAddressId ? '<customerShippingAddressId>' + this.customerShippingAddressId + '</customerShippingAddressId>' : '') +
      (!!this.creditCardNumberMasked ? '<creditCardNumberMasked>' + this.creditCardNumberMasked + '</creditCardNumberMasked>' : '') +
      (!!this.bankRoutingNumberMasked ? '<bankRoutingNumberMasked>' + this.bankRoutingNumberMasked + '</bankRoutingNumberMasked>' : '') +
      (!!this.bankAccountNumberMasked ? '<bankAccountNumberMasked>' + this.bankAccountNumberMasked + '</bankAccountNumberMasked>' : '') +
      this.order.toXml() +
      (!!this.transId ? '<transId>' + this.transId + '</transId>' : '') +
      (!!this.taxExempt ? '<taxExempt>' + this.taxExempt + '</taxExempt>' : '') +
      (!!this.recurringBilling ? '<recurringBilling>' + this.recurringBilling + '</recurringBilling>' : '') +
      (!!this.cardCode ? '<cardCode>' + this.cardCode + '</cardCode>' : '') +
      (!!this.splitTenderId ? '<splitTenderId>' + this.splitTenderId + '</splitTenderId>' : '') +
      (!!this.approvalCode ? '<approvalCode>' + this.approvalCode + '</approvalCode>' : '');

    return xml;
  }
}
module.exports.Transaction = AuthorizeTransaction;

/**
  A class that contains all fields for a CIM Duty.


  @param {Object} [options={}] An object containing the duty's information.
    @param {String|Number|Float} [options.amount=''] Duty's amount.
    @param {String} [options.name=''] Duty's name.
    @param {String} [options.description=''] Duty's description.

  @example
    var Duty = new Types.Duty({
      amount: 5.67,
      name: 'Duty Taxes',
      description: 'My Description'
    });

  @class AuthorizeDuty
  @constructor
*/
var AuthorizeDuty = function(options) {
  if (options instanceof AuthorizeDuty) {
    return options;
  }

  options          = options || {};
  this.amount      = options.amount || '';
  this.name        = options.name || '';
  this.description = options.description || '';

  // Find any non-empty option value for our "length"
  this.length = Object.keys(options).filter(function(o) { return !!options[o]; }).length;

  /*
  @returns {String} XML output for AuthorizeDuty.
  */
  this.toXml = function() {
    if (this.length < 1) {
      return '';
    }

    var xml = '<duty>' +
      (!!this.amount ? '<amount>' + this.amount + '</amount>' : '') +
      (!!this.name ? '<name>' + this.name + '</name>' : '') +
      (!!this.description ? '<description>' + this.description + '</description>' : '') +
    '</duty>';

    return xml;
  }
}
module.exports.Duty = AuthorizeDuty;

/**
  A class that contains all fields for a CIM Order.


  @param {Object} [options={}] An object containing the order's information.
    @param {String|Number} [options.invoiceNumber=''] Order's invoice number.
    @param {String} [options.description=''] Order's description.
    @param {String|Number} [options.purchaseOrderNumber=''] Orders's purchase order number.

  @example
    var Order = new Types.Order({
      invoiceNumber: 124,
      description: 'My Description',
      purchaseOrderNumber: 12345
    });

  @class AuthorizeOrder
  @constructor
*/
var AuthorizeOrder = function(options) {
  if (options instanceof AuthorizeOrder) {
    return options;
  }

  options = options || {};
  this.invoiceNumber = options.invoiceNumber || '';
  this.description = options.description || '';
  this.purchaseOrderNumber = options.purchaseOrderNumber || '';

  // Find any non-empty option value for our "length"
  this.length = Object.keys(options).filter(function(o) { return !!options[o]; }).length;

  /*
  @returns {String} XML output for AuthorizeOrder.
  */
  this.toXml = function() {
    if (this.length < 1) {
      return '';
    }

    var xml = '<order>' +
      (!!this.invoiceNumber ? '<invoiceNumber>' + this.invoiceNumber + '</invoiceNumber>' : '') +
      (!!this.description ? '<description>' + this.description + '</description>' : '') +
      (!!this.purchaseOrderNumber ? '<purchaseOrderNumber>' + this.purchaseOrderNumber + '</purchaseOrderNumber>' : '') +
    '</order>';

    return xml;
  }
}
module.exports.Order = AuthorizeOrder;

/**
  A class that contains all fields for a CIM Transaction Shipping.


  @param {Object} [options={}] An object containing the shipping's information.
    @param {String|Number|Float} [options.amount=''] Shipping's amount.
    @param {String|Number} [options.name=''] Shipping's line item name.
    @param {String} [options.description=''] Shipping's description.

  @example
    var Shipping = new Types.Shipping({
      amount: 5.67,
      name: 'Shipping Name',
      description: 'My Description'
    });

  @class AuthorizeShipping
  @constructor
*/
var AuthorizeShipping = function(options) {
  if (options instanceof AuthorizeShipping) {
    return options;
  }

  options = options || {};
  this.amount = options.amount || '';
  this.name = options.name || '';
  this.description = options.description || '';

  // Find any non-empty option value for our "length"
  this.length = Object.keys(options).filter(function(o) { return !!options[o]; }).length;

  /*
  @returns {String} XML output for AuthorizeShipping.
  */
  this.toXml = function() {
    if (this.length < 1) {
      return '';
    }

    var xml = '<shipping>' +
      (!!this.amount ? '<amount>' + this.amount + '</amount>' : '') +
      (!!this.name ? '<name>' + this.name + '</name>' : '') +
      (!!this.description ? '<description>' + this.description + '</description>' : '') +
    '</shipping>';

    return xml;
  }
}
module.exports.Shipping = AuthorizeShipping;

/**
  A class that contains all fields for a CIM Transaction tax item.


  @param {Object} [options={}] An object containing the tax's information.
    @param {String|Number|Float} [options.amount=''] Tax's amount.
    @param {String|Number} [options.name=''] Tax's line item name.
    @param {String} [options.description=''] Tax's description.

  @example
    var Tax = new Types.Tax({
      amount: 5.67,
      name: 'Taxes',
      description: 'My Description'
    });

  @class AuthorizeTax
  @constructor
*/
var AuthorizeTax = function(options) {
  if (options instanceof AuthorizeTax) {
    return options;
  }

  options = options || {};

  this.amount = options.amount || '';
  this.name = options.name || '';
  this.description = options.description || '';

  // Find any non-empty option value for our "length"
  this.length = Object.keys(options).filter(function(o) { return !!options[o]; }).length;

  /*
  @returns {String} XML output for AuthorizeTax.
  */
  this.toXml = function() {
    if (this.length < 1) {
      return '';
    }

    var xml = '<tax>' +
      (!!this.amount ? '<amount>' + this.amount + '</amount>' : '') +
      (!!this.name ? '<name>' + this.name + '</name>' : '') +
      (!!this.description ? '<description>' + this.description + '</description>' : '') +
    '</tax>';

    return xml;
  }
}
module.exports.Tax = AuthorizeTax;

/**
  A class that contains all fields for a CIM Transaction Line Item.

  @param {Object|Array}[options=[{}]] An array of objects/an object of transaction line items.
    @param {String|Number} [options.itemId=''] Line item's ID.
    @param {String} [options.name=''] Line item's name.
    @param {String} [options.description=''] Line item's description.
    @param {String|Number|Float} [options.quantity=''] Line item's quantity.
    @param {String|Number|Float} [options.unitPrice=''] Line item's unit price.
    @param {Boolean} [options.taxable] If the line item is taxable or not.

  @example
    var lineItems = [
      {itemId: 123, name: 'Name 1', description: 'Desc 1', quantity: 1, unitPrice: 1.2, taxable: false},
      {itemId: 124, name: 'Name 2', description: 'Desc 2', quantity: 2, unitPrice: 5.63, taxable: true}
    ];

    var LineItems = new Types.LineItems(lineItems);

  @class AuthorizeLineItems
  @constructor
*/
var AuthorizeLineItems = function(options) {
  if (options instanceof AuthorizeLineItems) {
    return options;
  }

  options = options || [];
  options = Array.isArray(options) ? options : [options];

  this.bin = [];

  var i = 0
    , length = options.length;

  for (i = 0; i < length; ++i) {
    this.bin[this.bin.length] = options[i];
  }

  this.length = this.bin.length;

  /*
  @returns {String} XML output for AuthorizeLineItems.
  */
  this.toXml = function() {
    if (this.length < 1) {
      return '';
    }

    var xml = '';
    for (var i = 0; i < this.bin.length; ++i) {
      xml += '<lineItems>' +
        (!!this.bin[i].itemId ? '<itemId>' + this.bin[i].itemId + '</itemId>' : '') +
        (!!this.bin[i].name ? '<name>' + this.bin[i].name + '</name>' : '') +
        (!!this.bin[i].description ? '<description>' + this.bin[i].description + '</description>' : '') +
        (!!this.bin[i].quantity ? '<quantity>' + this.bin[i].quantity + '</quantity>' : '') +
        (!!this.bin[i].unitPrice ? '<unitPrice>' + this.bin[i].unitPrice + '</unitPrice>' : '') +
        (this.bin[i].hasOwnProperty('taxable') ? '<taxable>' + this.bin[i].taxable.toString() + '</taxable>' : '') +
      '</lineItems>';
    }

    return xml;
  }
}
module.exports.LineItems = AuthorizeLineItems;

/**
  A class that contains all fields for a CIM Credit Card.

  @param {Object} [options={}] An object containing customer's credit card information.
    @param {String|Number} [options.cardNumber=''] Customer's credit card number.
    @param {String} [options.expirationDate=''] Customer's credit card expiration date.
    @param {String|Number} [options.cardCode=''] Customer's credit card code.

  @example
    var CreditCard = new Types.CreditCard({
      cardNumber: 41111111111111111,
      expirationDate: '2012-01',
      cardCode: 111
    });

  @class AuthorizeCreditCard
  @constructor
 */
var AuthorizeCreditCard = function(options) {
  if (options instanceof AuthorizeCreditCard) {
    return options;
  }

  options = options || {};

  this.cardNumber     = options.cardNumber || '';
  this.expirationDate = options.expirationDate || '';
  this.cardCode       = options.cardCode || '';
  this.length         = !this.cardNumber ? 0 : 1;

  /*
  @returns {String} XML output for AuthorizeLineItems.
  */
  this.toXml = function() {
    if (!this.cardNumber) {
      return '';
    }

    var xml = '<creditCard>' +
      (!!this.cardNumber ? '<cardNumber>' + this.cardNumber + '</cardNumber>' : '') +
      (!!this.expirationDate ? '<expirationDate>' + this.expirationDate + '</expirationDate>' : '') +
      (!!this.cardCode ? '<cardCode>' + this.cardCode + '</cardCode>' : '') +
      '</creditCard>';

    return xml;
  }
}
module.exports.CreditCard = AuthorizeCreditCard;

/**
  A class that contains all fields for a CIM Bank Account.

  @param {Object} [options={}] An object containing customer's bank account information.
    @param {String} [options.accountType=''] Customer's bank account type (individual or business).
    @param {String|Number} [options.routingNumber=''] Customer's routing number.
    @param {String|Number} [options.accountNumber=''] Customer's account number.
    @param {String} [options.nameOnAccount=''] Name on the bank account.
    @param {String} [options.echeckType=''] Customer's echeck type.
    @param {String} [options.bankName=''] Bank's name.

  @example
    var BankAccount = new Types.BankAccount({
      accountType: 'individual',
      routingNumber: '123456',
      accountNumber: '1234567890',
      nameOnAccount: 'Bob Smith',
      echeckType: 'WEB',
      bankName: 'Steal Yo Money, LLC.'
    });

  @class AuthorizeBankAccount
  @constructor
*/
var AuthorizeBankAccount = function(options) {
  if (options instanceof AuthorizeBankAccount) {
    return options;
  }

  options = options || {};

  this.accountType    = options.accountType || '';
  this.routingNumber  = options.routingNumber || '';
  this.accountNumber  = options.accountNumber || '';
  this.nameOnAccount  = options.nameOnAccount || '';
  this.echeckType     = options.echeckType || '';
  this.bankName       = options.bankName || '';
  this.length         = !this.accountType ? 0 : 1;

  /*
  @returns {String} XML output for AuthorizeLineItems.
  */
  this.toXml = function() {
    if (!this.accountNumber) {
      return '';
    }

    var xml = '<bankAccount>' +
      (!!this.accountType ? '<accountType>' + this.accountType + '</accountType>' : '') +
      (!!this.routingNumber ? '<routingNumber>' + this.routingNumber + '</routingNumber>' : '') +
      (!!this.accountNumber ? '<accountNumber>' + this.accountNumber + '</accountNumber>' : '') +
      (!!this.echeckType ? '<echeckType>' + this.echeckType + '</echeckType>' : '') +
      (!!this.nameOnAccount ? '<nameOnAccount>' + this.nameOnAccount + '</nameOnAccount>' : '') +
      '</bankAccount>';

    return xml;
  }
}
module.exports.BankAccount = AuthorizeBankAccount;

/**
  A class that contains all fields for an AuthorizeNet ARB payment schedule.


  @param {Object} [options={}] Contains information about the payment schedule.
    @param {Object} [options.interval={}] Contains information about the interval of time between payments.
      @param {Number} [options.interval.length=0] The measurement of time, in association with the Interval Unit, that is used to define the frequency of the billing occurrences.
      @param {String} [options.interval.unit=''] The unit of time, in association with the Interval Length, between each billing occurrence.
    @param {String} [options.startDate=''] The date the subscription begins (also the date the initial billing occurs) (YYYY-MM-DD)
    @param {Number} [options.totalOccurrences=0] Number of billing occurrences or payments for the subscription.
    @param {Number} [options.trialOccurences=0]  Number of billing occurrences or payments in the trial period.

  @example
    var paymentSchedule = new AuthorizeTypes.PaymentSchedule({
      interval: {
        length: 30,
        unit: 'days'
      },
      startDate: '2012-01-01',
      totalOccurences: 9999,
      trialOccurences: 10
    });

  @class AuthorizePaymentSchedule
  @constructor
*/
var AuthorizePaymentSchedule = function(options) {
  if (options instanceof AuthorizePaymentSchedule) {
    return options;
  }

  options              = options || {};
  options.interval     = options.interval || {};

  this.interval        = options.interval;
  this.interval.length = options.interval.length || 0;
  this.interval.unit   = options.interval.unit || '';
  this.startDate       = options.startDate || '';
  this.totalOccurences = options.totalOccurences || 0;
  this.trialOccurences = options.trialOccurences || 0;

  this.length = (!!options.interval.length ? 1 : 0);
  /*
  @returns {String} XML output for AuthorizeLineItems.
  */
  this.toXml = function() {
    if (this.length < 1) {
      return '';
    }

    var xml = '<paymentSchedule>' +
      '<interval>' +
        (!!this.interval.length ? '<length>' + this.interval.length + '</length>' : '') +
        (!!this.interval.unit ? '<unit>' + this.interval.unit + '</unit>' : '') +
      '</interval>' +
      (!!this.startDate ? '<startDate>' + this.startDate + '</startDate>' : '') +
      (!!this.totalOccurences ? '<totalOccurences>' + this.totalOccurences + '</totalOccurences>' : '') +
      (!!this.trialOccurences ? '<trialOccurences>' + this.trialOccurences + '</trialOccurences>' : '') +
    '</paymentSchedule>';

    return xml;
  }
}
module.exports.PaymentSchedule = AuthorizePaymentSchedule;

/**
  A class that contains all fields for an AuthorizeNet ARB Subscription.


  @param {Object} [options={}] Contains information about the subscription.
    @param {String} [options.name=''] Merchant-assigned name for the subscription.
      @param {Object} [options.paymentSchedule={}] Contains information about the payment schedule.
        @param {Object} [options.paymentSchedule.interval={}] Contains information about the interval of time between payments.
          @param {Number} [options.paymentSchedule.interval.length=0] The measurement of time, in association with the Interval Unit, that is used to define the frequency of the billing occurrences.
          @param {String} [options.paymentSchedule.interval.unit=''] The unit of time, in association with the Interval Length, between each billing occurrence.
        @param {String} [options.paymentSchedule.startDate=''] The date the subscription begins (also the date the initial billing occurs) (YYYY-MM-DD)
        @param {Number} [options.paymentSchedule.totalOccurrences=0] Number of billing occurrences or payments for the subscription.
        @param {Number} [options.paymentSchedule.trialOccurences=0]  Number of billing occurrences or payments in the trial period.
    @param {Number} [options.amount=0] The amount to be billed to the customer for each payment in the subscription.
    @param {Number} [options.trialAmount=0] The amount to be charged for each payment during a trial period.
    @param {Object} [options.payment={}] Contains either the customer's credit card or bank account payment information.
      @param {Object} [options.payment.creditCard={}] An object for credit cards.
        @param {String|Number} [options.payment.creditCard.cardNumber=''] Customer's credit card number.
        @param {String} [options.payment.creditCard.expirationDate=''] Customer's credit card expiration date.
        @param {String|Number} [options.payment.creditCard.cardCode=''] Customer's credit card code.
      @param {Object} [options.payment.bankAccount={}] An object of bank accounts.
        @param {String} [options.payment.bankAccount.accountType=''] Customer's bank account type (individual or business).
        @param {String|Number} [options.payment.bankAccount.routingNumber=''] Customer's routing number.
        @param {String|Number} [options.payment.bankAccount.accountNumber=''] Customer's account number.
        @param {String} [options.payment.bankAccount.nameOnAccount=''] Name on the bank account.
        @param {String} [options.payment.bankAccount.echeckType=''] Customer's echeck type.
        @param {String} [options.payment.bankAccount.bankName=''] Bank's name.
    @param {Object} [options.order={}] Merchant-assigned invoice number for the subscription.
      @param {String} [options.order.invoiceNumber=''] Merchant-assigned invoice number for the subscription.
      @param {String} [options.order.description='']  Description of the subscription.
    @param {Object} [options.customer={}] Contains information about the customer.
      @param {String} [options.customer.id=''] Merchant-assigned identifier for the customer.
      @param {String} [options.customer.email=''] The customer's email address.
      @param {String} [options.customer.phoneNumber=''] The customer's phone number.
      @param {String} [options.customer.faxNumber=''] The customer's fax number.
    @param {Object} [options.billTo={}] Contains the customer's billing address information.
      @param {String} [options.billTo.firstName=''] The first name associated with the customer's billing address.
      @param {String} [options.billTo.lastName=''] The last name associated with the customer's billing address.
      @param {String} [options.billTo.company=''] The company associated with the customer's billing address.
      @param {String} [options.billTo.address=''] The customer's billing address.
      @param {String} [options.billTo.city=''] The city of the customer's billing address.
      @param {String} [options.billTo.state=''] The state of the customer's billing address.
      @param {String|Number} [options.billTo.zip=''] The ZIP code of the customer's billing address.
      @param {String} [options.billTo.country=''] The country of the customer's billing address.
    @param {Object} [options.shipTo={}] Contains the customer's shipping address information.
      @param {String} [options.shipTo.firstName=''] The first name associated with the customer's shipping address.
      @param {String} [options.shipTo.lastName=''] The last name associated with the customer's shipping address.
      @param {String} [options.shipTo.company=''] The company associated with the customer's shipping address.
      @param {String} [options.shipTo.address=''] The customer's shipping address.
      @param {String} [options.shipTo.city=''] The city of the customer's shipping address.
      @param {String} [options.shipTo.state=''] The state of the customer's shipping address.
      @param {String|Number} [options.shipTo.zip=''] The ZIP code of the customer's shipping address.
      @param {String} [options.shipTo.country=''] The country of the customer's shipping address.

  @example
    var subscription = {
      name: 'Hello',
      paymentSchedule: new Types.PaymentSchedule({
        interval: {
          length: 30,
          unit: 'days'
        },
        startDate: '2012-01',
        totalOccurences: 10,
        trialOccurences: 5
      }),
      amount: 5.62,
      trialAmount: 2.30,
      payment: new Types.Payment({
        creditCard: new Types.CreditCard({
          cardNumber: 41111111111111111,
          expirationDate: '2012-01',
          cardCode: 111
        })
      }),
      order: new Types.Order({
        invoiceNumber: 124,
        description: 'My Description'
      }),
      customer: {
        id: 124,
        email: 'fake@fakemeai.com',
        phoneNumber: 5551231234,
        faxNumber: 5551231235
      },
      billTo: new Types.BillingAddress({
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
      }),
      shipTo: new Types.ShippingAddress({
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
      })
    }

  @class AuthorizeSubscription
  @constructor
*/
var AuthorizeSubscription = function(options) {
  if (options instanceof AuthorizeSubscription) {
    return options;
  }

  options           = options || {};
  options.customer  = options.customer || {};

  this.name                 = options.name || '';
  this.paymentSchedule      = new AuthorizePaymentSchedule(options.paymentSchedule);
  this.amount               = options.amount || '';
  this.trialAmount          = options.trialAmount || '';
  this.payment              = new AuthorizePayment(options.payment);
  this.order                = new AuthorizeOrder(options.order);
  this.customer             = {};
  this.customer.id          = options.customer.id || '';
  this.customer.email       = options.customer.email || '';
  this.customer.phoneNumber = options.customer.phoneNumber || '';
  this.customer.faxNumber   = options.customer.faxNumber || '';
  this.billTo               = new AuthorizeBillingAddress(options.billTo);
  this.shipTo               = new AuthorizeShippingAddress(options.shipTo);

  /*
  @returns {String} XML output for AuthorizeLineItems.
  */
  this.toXml = function() {
    var xml = '<subscription>' +
      '<name>' + this.name + '</name>' +
      this.paymentSchedule.toXml() +
      (!!this.amount ? '<amount>' + this.amount + '</amount>' : '') +
      (!!this.trialAmount ? '<trialAmount>' + this.trialAmount + '</trialAmount>' : '') +
    this.payment.toXml() +
    this.order.toXml();

    if (!!this.customer.id || !!this.customer.email || !!this.customer.phoneNumber || !!this.customer.faxNumber) {
      xml += '<customer>' +
        (!!this.customer.id ? '<id>' + this.customer.id + '</id>' : '') +
        (!!this.customer.email ? '<email>' + this.customer.email + '</email>' : '') +
        (!!this.customer.phoneNumber ? '<phoneNumber>' + this.customer.phoneNumber + '</phoneNumber>' : '') +
        (!!this.customer.faxNumber ? '<faxNumber>' + this.customer.faxNumber + '</faxNumber>' : '') +
      '</customer>';
    }

    xml += this.billTo.toXml() +
    (this.shipTo.length > 0 ? '<shipTo>' + this.shipTo.toXml() + '</shipTo>' : '') +
    '</subscription>';

    return xml;
  }
}
module.exports.Subscription = AuthorizeSubscription;
