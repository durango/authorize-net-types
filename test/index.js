var Types = require(__dirname + '/../index')
  , chai = require('chai')
  , expect = chai.expect

describe('AuthorizationTypes', function() {
  describe('Customer', function() {
    it('should be able to create by calling new instances', function(done) {
      var Customer = new Types.Customer({
        merchantCustomerId: 123,
        description: 'A customer with a lot of cash & stuff.',
        email: 'completelyfake@dontemail.com',
        customerProfileId: 1234
      });

      expect(Customer).to.be.instanceOf(Types.Customer);
      expect(Customer.merchantCustomerId).to.equal(123);
      expect(Customer.description).to.equal('A customer with a lot of cash & stuff.');
      expect(Customer.customerProfileId).to.equal(1234);
      expect(Customer.toXml()).to.equal('<profile><merchantCustomerId>123</merchantCustomerId><description>A customer with a lot of cash &amp; stuff.</description><email>completelyfake@dontemail.com</email></profile>');

      // Let's create a paymentProfile
      var paymentProfiles = new Types.PaymentProfiles({
        customerType: 'individual',
        paymentProfileId: 12345,
        billTo: new Types.BillingAddress({
          firstName: 'Bob',
          lastName: 'Smith',
          address: '123 Sesame St',
          city: 'Johnesville',
          state: 'FL',
          zip: 123,
          country: 'US',
          phoneNumber: '555-123-1234',
          faxNumber: '555-123-1235'
        }),
        payment: new Types.Payment({
          creditCard: new Types.CreditCard({
            cardCode: 123,
            cardNumber: '41111111111111111',
            expirationDate: '10-12'
          })
        })
      });

      // Now associate it with our Customer Profile
      Customer.paymentProfiles = paymentProfiles;
      expect(Customer.paymentProfiles).to.be.instanceOf(Types.PaymentProfiles);
      expect(Customer.paymentProfiles).to.have.length(1);
      expect(Customer.paymentProfiles.bin).to.be.instanceOf(Array);
      expect(Customer.paymentProfiles.bin).to.have.length(1);
      expect(Customer.paymentProfiles.bin[0].customerType).to.equal('individual');
      expect(Customer.paymentProfiles.bin[0].customerPaymentProfileId).to.equal(12345);

      expect(Customer.paymentProfiles.bin[0].billTo).to.be.instanceOf(Types.BillingAddress);
      expect(Customer.paymentProfiles.bin[0].billTo).to.have.length(1);
      expect(Customer.paymentProfiles.bin[0].billTo.bin).to.be.instanceOf(Array);
      expect(Customer.paymentProfiles.bin[0].billTo.bin).to.have.length(1);
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].firstName).to.equal('Bob');
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].lastName).to.equal('Smith');
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].address).to.equal('123 Sesame St');
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].city).to.equal('Johnesville');
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].zip).to.equal(123);
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].country).to.equal('US');
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].phoneNumber).to.equal('555-123-1234');
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].faxNumber).to.equal('555-123-1235');

      expect(Customer.paymentProfiles.bin[0].payment).to.be.instanceOf(Types.Payment);
      expect(Customer.paymentProfiles.bin[0].payment).to.have.length(1);
      expect(Customer.paymentProfiles.bin[0].payment.bin).to.be.instanceOf(Array);
      expect(Customer.paymentProfiles.bin[0].payment.bin).to.have.length(1);

      expect(Customer.paymentProfiles.bin[0].payment.bin[0].creditCard).to.be.instanceOf(Types.CreditCard);
      expect(Customer.paymentProfiles.bin[0].payment.bin[0].creditCard).to.have.length(1);
      expect(Customer.paymentProfiles.bin[0].payment.bin[0].creditCard.cardNumber).to.equal('41111111111111111');
      expect(Customer.paymentProfiles.bin[0].payment.bin[0].creditCard.cardCode).to.equal(123);
      expect(Customer.paymentProfiles.bin[0].payment.bin[0].creditCard.expirationDate).to.equal('10-12');

      expect(Customer.toXml()).to.equal('<profile><merchantCustomerId>123</merchantCustomerId><description>A customer with a lot of cash &amp; stuff.</description><email>completelyfake@dontemail.com</email><paymentProfiles><customerType>individual</customerType><customerPaymentProfileId>12345</customerPaymentProfileId><billTo><firstName>Bob</firstName><lastName>Smith</lastName><address>123 Sesame St</address><city>Johnesville</city><state>FL</state><zip>123</zip><country>US</country><phoneNumber>555-123-1234</phoneNumber><faxNumber>555-123-1235</faxNumber></billTo><payment><creditCard><cardNumber>41111111111111111</cardNumber><expirationDate>10-12</expirationDate><cardCode>123</cardCode></creditCard></payment></paymentProfiles></profile>');

      done();
    });

    it('should be able to create by calling objects', function(done) {
      var Customer = {
        merchantCustomerId: 123,
        description: 'A customer with a lot of cash.',
        email: 'completelyfake@dontemail.com',
        customerProfileId: 1234
      }

      // Let's create a paymentProfile
      Customer.paymentProfiles = {
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

      // Since this is the physical Authorize Types library, we have to call some sort of instance
      Customer = new Types.Customer(Customer);

      expect(Customer).to.be.instanceOf(Types.Customer);
      expect(Customer.merchantCustomerId).to.equal(123);
      expect(Customer.description).to.equal('A customer with a lot of cash.');
      expect(Customer.customerProfileId).to.equal(1234);

      expect(Customer.paymentProfiles).to.be.instanceOf(Types.PaymentProfiles);
      expect(Customer.paymentProfiles).to.have.length(1);
      expect(Customer.paymentProfiles.bin).to.be.instanceOf(Array);
      expect(Customer.paymentProfiles.bin).to.have.length(1);
      expect(Customer.paymentProfiles.bin[0].customerType).to.equal('individual');
      expect(Customer.paymentProfiles.bin[0].customerPaymentProfileId).to.equal(12345);

      expect(Customer.paymentProfiles.bin[0].billTo).to.be.instanceOf(Types.BillingAddress);
      expect(Customer.paymentProfiles.bin[0].billTo).to.have.length(1);
      expect(Customer.paymentProfiles.bin[0].billTo.bin).to.be.instanceOf(Array);
      expect(Customer.paymentProfiles.bin[0].billTo.bin).to.have.length(1);
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].firstName).to.equal('Bob');
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].lastName).to.equal('Smith');
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].address).to.equal('123 Sesame St');
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].city).to.equal('Johnesville');
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].zip).to.equal(123);
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].country).to.equal('US');
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].phoneNumber).to.equal('555-123-1234');
      expect(Customer.paymentProfiles.bin[0].billTo.bin[0].faxNumber).to.equal('555-123-1235');

      expect(Customer.paymentProfiles.bin[0].payment).to.be.instanceOf(Types.Payment);
      expect(Customer.paymentProfiles.bin[0].payment).to.have.length(1);
      expect(Customer.paymentProfiles.bin[0].payment.bin).to.be.instanceOf(Array);
      expect(Customer.paymentProfiles.bin[0].payment.bin).to.have.length(1);

      expect(Customer.paymentProfiles.bin[0].payment.bin[0].creditCard).to.be.instanceOf(Types.CreditCard);
      expect(Customer.paymentProfiles.bin[0].payment.bin[0].creditCard).to.have.length(1);
      expect(Customer.paymentProfiles.bin[0].payment.bin[0].creditCard.cardNumber).to.equal('41111111111111111');
      expect(Customer.paymentProfiles.bin[0].payment.bin[0].creditCard.cardCode).to.equal(123);
      expect(Customer.paymentProfiles.bin[0].payment.bin[0].creditCard.expirationDate).to.equal('10-12');

      expect(Customer.toXml()).to.equal('<profile><merchantCustomerId>123</merchantCustomerId><description>A customer with a lot of cash.</description><email>completelyfake@dontemail.com</email><paymentProfiles><customerType>individual</customerType><customerPaymentProfileId>12345</customerPaymentProfileId><billTo><firstName>Bob</firstName><lastName>Smith</lastName><address>123 Sesame St</address><city>Johnesville</city><state>FL</state><zip>123</zip><country>US</country><phoneNumber>555-123-1234</phoneNumber><faxNumber>555-123-1235</faxNumber></billTo><payment><creditCard><cardNumber>41111111111111111</cardNumber><expirationDate>10-12</expirationDate><cardCode>123</cardCode></creditCard></payment></paymentProfiles></profile>');

      done();
    });
  });

  describe('CustomerBasic', function() {
    it('should be able to create by calling new instances', function(done) {
      var Customer = new Types.CustomerBasic({
        merchantCustomerId: 123,
        description: 'A customer with a lot of cash.',
        email: 'completelyfake@dontemail.com',
        customerProfileId: 1234
      });

      expect(Customer).to.be.instanceOf(Types.CustomerBasic);
      expect(Customer.merchantCustomerId).to.equal(123);
      expect(Customer.description).to.equal('A customer with a lot of cash.');
      expect(Customer.customerProfileId).to.equal(1234);
      expect(Customer.toXml()).to.equal('<profile><merchantCustomerId>123</merchantCustomerId><description>A customer with a lot of cash.</description><email>completelyfake@dontemail.com</email><customerProfileId>1234</customerProfileId></profile>');

      done();
    });

    it('should be able to create by calling objects', function(done) {
      var Customer = {
        merchantCustomerId: 123,
        description: 'A customer with a lot of cash.',
        email: 'completelyfake@dontemail.com',
        customerProfileId: 1234
      }

      // Since this is the physical Authorize Types library, we have to call some sort of instance
      Customer = new Types.CustomerBasic(Customer);

      expect(Customer).to.be.instanceOf(Types.CustomerBasic);
      expect(Customer.merchantCustomerId).to.equal(123);
      expect(Customer.description).to.equal('A customer with a lot of cash.');
      expect(Customer.customerProfileId).to.equal(1234);

      expect(Customer.toXml()).to.equal('<profile><merchantCustomerId>123</merchantCustomerId><description>A customer with a lot of cash.</description><email>completelyfake@dontemail.com</email><customerProfileId>1234</customerProfileId></profile>');

      done();
    });
  });

  describe('BillingAddress', function() {
    it('should be able to create by calling new instances', function(done) {
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
      , BillingAddress = new Types.BillingAddress(billingAddress);

      expect(BillingAddress).to.be.instanceof(Types.BillingAddress);
      expect(BillingAddress).to.have.length(1);
      expect(BillingAddress.bin).to.be.instanceof(Array);
      expect(BillingAddress.bin[0].firstName).to.equal(billingAddress.firstName);
      expect(BillingAddress.bin[0].lastName).to.equal(billingAddress.lastName);
      expect(BillingAddress.bin[0].company).to.equal(billingAddress.company);
      expect(BillingAddress.bin[0].address).to.equal(billingAddress.address);
      expect(BillingAddress.bin[0].city).to.equal(billingAddress.city);
      expect(BillingAddress.bin[0].state).to.equal(billingAddress.state);
      expect(BillingAddress.bin[0].zip).to.equal(billingAddress.zip);
      expect(BillingAddress.bin[0].country).to.equal(billingAddress.country);
      expect(BillingAddress.bin[0].phoneNumber).to.equal(billingAddress.phoneNumber);
      expect(BillingAddress.bin[0].faxNumber).to.equal(billingAddress.faxNumber);
      expect(BillingAddress.bin[0].customerAddressId).to.equal(billingAddress.customerAddressId);
      expect(BillingAddress.toXml()).to.equal('<billTo><firstName>Dan</firstName><lastName>Smith</lastName><company>Company LLC</company><address>123 Sesame St</address><city>Johnesville</city><state>fl</state><zip>123</zip><country>us</country><phoneNumber>5551231234</phoneNumber><faxNumber>5551231235</faxNumber><customerAddressId>1</customerAddressId></billTo>');

      done();
    });
  });

  describe('ShippingAddress', function() {
    it('should be able to create by calling new instances', function(done) {
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
        faxNumber: 5551231235,
        customerAddressId: 1
      }
      , ShippingAddress = new Types.ShippingAddress(shippingAddress);

      expect(ShippingAddress).to.be.instanceof(Types.ShippingAddress);
      expect(ShippingAddress).to.have.length(1);
      expect(ShippingAddress.bin).to.be.instanceof(Array);
      expect(ShippingAddress.bin[0].firstName).to.equal(shippingAddress.firstName);
      expect(ShippingAddress.bin[0].lastName).to.equal(shippingAddress.lastName);
      expect(ShippingAddress.bin[0].company).to.equal(shippingAddress.company);
      expect(ShippingAddress.bin[0].address).to.equal(shippingAddress.address);
      expect(ShippingAddress.bin[0].city).to.equal(shippingAddress.city);
      expect(ShippingAddress.bin[0].state).to.equal(shippingAddress.state);
      expect(ShippingAddress.bin[0].zip).to.equal(shippingAddress.zip);
      expect(ShippingAddress.bin[0].country).to.equal(shippingAddress.country);
      expect(ShippingAddress.bin[0].phoneNumber).to.equal(shippingAddress.phoneNumber);
      expect(ShippingAddress.bin[0].faxNumber).to.equal(shippingAddress.faxNumber);
      expect(ShippingAddress.bin[0].customerAddressId).to.equal(shippingAddress.customerAddressId);
      expect(ShippingAddress.toXml()).to.equal('<firstName>Dan</firstName><lastName>Smith</lastName><company>Company LLC</company><address>123 Sesame St</address><city>Johnesville</city><state>fl</state><zip>123</zip><country>us</country><phoneNumber>5551231234</phoneNumber><faxNumber>5551231235</faxNumber><customerAddressId>1</customerAddressId>');

      done();
    });
  });

  describe('Address', function() {
    it('should be able to create by calling new instances', function(done) {
      var address = {
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
      , Address = new Types.Address(address);

      expect(Address).to.be.instanceof(Types.Address);
      expect(Address.firstName).to.equal(Address.firstName);
      expect(Address.lastName).to.equal(Address.lastName);
      expect(Address.company).to.equal(Address.company);
      expect(Address.address).to.equal(Address.address);
      expect(Address.city).to.equal(Address.city);
      expect(Address.state).to.equal(Address.state);
      expect(Address.zip).to.equal(Address.zip);
      expect(Address.country).to.equal(Address.country);
      expect(Address.phoneNumber).to.equal(Address.phoneNumber);
      expect(Address.faxNumber).to.equal(Address.faxNumber);
      expect(Address.customerAddressId).to.equal(Address.customerAddressId);
      expect(Address.toXml()).to.equal('<firstName>Dan</firstName><lastName>Smith</lastName><company>Company LLC</company><address>123 Sesame St</address><city>Johnesville</city><state>fl</state><zip>123</zip><country>us</country><phoneNumber>5551231234</phoneNumber><faxNumber>5551231235</faxNumber><customerAddressId>1</customerAddressId>');

      done();
    });
  });

  describe('PaymentProfiles', function() {
    it('should be able to create by calling new instances', function(done) {
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

      expect(profile).to.be.instanceof(Types.PaymentProfiles);
      expect(profile).to.have.length(1);
      expect(profile.bin).to.be.instanceof(Array);
      expect(profile.bin[0].customerType).to.equal('individual');
      expect(profile.bin[0].billTo).to.be.instanceof(Types.BillingAddress);
      expect(profile.bin[0].payment).to.be.instanceof(Types.Payment);
      expect(profile.bin[0].payment.bin[0].creditCard).to.be.instanceof(Types.CreditCard);
      expect(profile.bin[0].customerPaymentProfileId).to.equal(123);
      expect(profile.toXml()).to.equal('<paymentProfiles><customerType>individual</customerType><customerPaymentProfileId>123</customerPaymentProfileId><billTo><firstName>Dan</firstName><lastName>Smith</lastName><company>Company LLC</company><address>123 Sesame St</address><city>Johnesville</city><state>fl</state><zip>123</zip><country>us</country><phoneNumber>5551231234</phoneNumber><faxNumber>5551231235</faxNumber><customerAddressId>1</customerAddressId></billTo><payment><creditCard><cardNumber>41111111111111110</cardNumber><expirationDate>2012-01</expirationDate><cardCode>111</cardCode></creditCard></payment></paymentProfiles>');

      done();
    });

    it('should be able to create by calling objects', function(done) {
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
        billTo: billingAddress,
        payment: {
          creditCard: creditCard
        },
        customerPaymentProfileId: 123
      });

      expect(profile).to.be.instanceof(Types.PaymentProfiles);
      expect(profile).to.have.length(1);
      expect(profile.bin).to.be.instanceof(Array);
      expect(profile.bin[0].customerType).to.equal('individual');
      expect(profile.bin[0].billTo).to.be.instanceof(Types.BillingAddress);
      expect(profile.bin[0].payment).to.be.instanceof(Types.Payment);
      expect(profile.bin[0].payment.bin[0].creditCard).to.be.instanceof(Types.CreditCard);
      expect(profile.bin[0].customerPaymentProfileId).to.equal(123);
      expect(profile.toXml()).to.equal('<paymentProfiles><customerType>individual</customerType><customerPaymentProfileId>123</customerPaymentProfileId><billTo><firstName>Dan</firstName><lastName>Smith</lastName><company>Company LLC</company><address>123 Sesame St</address><city>Johnesville</city><state>fl</state><zip>123</zip><country>us</country><phoneNumber>5551231234</phoneNumber><faxNumber>5551231235</faxNumber><customerAddressId>1</customerAddressId></billTo><payment><creditCard><cardNumber>41111111111111110</cardNumber><expirationDate>2012-01</expirationDate><cardCode>111</cardCode></creditCard></payment></paymentProfiles>');

      done();
    });
  });

  describe('PaymentProfile', function() {
    it('should be able to create by calling new instances', function(done) {
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

      expect(profile).to.be.instanceof(Types.PaymentProfile);
      expect(profile).to.have.length(1);
      expect(profile.bin).to.be.instanceof(Array);
      expect(profile.bin[0].customerType).to.equal('individual');
      expect(profile.bin[0].billTo).to.be.instanceof(Types.BillingAddress);
      expect(profile.bin[0].payment).to.be.instanceof(Types.Payment);
      expect(profile.bin[0].payment.bin[0].creditCard).to.be.instanceof(Types.CreditCard);
      expect(profile.bin[0].customerPaymentProfileId).to.equal(123);
      expect(profile.toXml()).to.equal('<paymentProfile><customerType>individual</customerType><billTo><firstName>Dan</firstName><lastName>Smith</lastName><company>Company LLC</company><address>123 Sesame St</address><city>Johnesville</city><state>fl</state><zip>123</zip><country>us</country><phoneNumber>5551231234</phoneNumber><faxNumber>5551231235</faxNumber><customerAddressId>1</customerAddressId></billTo><payment><creditCard><cardNumber>41111111111111110</cardNumber><expirationDate>2012-01</expirationDate><cardCode>111</cardCode></creditCard></payment><customerPaymentProfileId>123</customerPaymentProfileId></paymentProfile>');

      done();
    });

    it('should be able to create by calling objects', function(done) {
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
        billTo: billingAddress,
        payment: {
          creditCard: creditCard
        },
        customerPaymentProfileId: 123
      });

      expect(profile).to.be.instanceof(Types.PaymentProfile);
      expect(profile).to.have.length(1);
      expect(profile.bin).to.be.instanceof(Array);
      expect(profile.bin[0].customerType).to.equal('individual');
      expect(profile.bin[0].billTo).to.be.instanceof(Types.BillingAddress);
      expect(profile.bin[0].payment).to.be.instanceof(Types.Payment);
      expect(profile.bin[0].payment.bin[0].creditCard).to.be.instanceof(Types.CreditCard);
      expect(profile.bin[0].customerPaymentProfileId).to.equal(123);
      expect(profile.toXml()).to.equal('<paymentProfile><customerType>individual</customerType><billTo><firstName>Dan</firstName><lastName>Smith</lastName><company>Company LLC</company><address>123 Sesame St</address><city>Johnesville</city><state>fl</state><zip>123</zip><country>us</country><phoneNumber>5551231234</phoneNumber><faxNumber>5551231235</faxNumber><customerAddressId>1</customerAddressId></billTo><payment><creditCard><cardNumber>41111111111111110</cardNumber><expirationDate>2012-01</expirationDate><cardCode>111</cardCode></creditCard></payment><customerPaymentProfileId>123</customerPaymentProfileId></paymentProfile>');

      done();
    });
  });

  describe('Payment', function() {
    it('should be able to create by calling new instances', function(done) {
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

      expect(payment).to.be.instanceof(Types.Payment);
      expect(payment).to.have.length(1);
      expect(payment.bin).to.be.instanceof(Array);
      expect(payment.bin[0].creditCard).to.be.instanceof(Types.CreditCard);
      expect(payment.bin[0].bankAccount).to.be.instanceof(Types.BankAccount);
      expect(payment.toXml()).to.equal('<payment><creditCard><cardNumber>41111111111111110</cardNumber><expirationDate>2012-01</expirationDate><cardCode>111</cardCode></creditCard><bankAccount><accountType>individual</accountType><routingNumber>123456</routingNumber><accountNumber>1234567890</accountNumber><echeckType>WEB</echeckType><nameOnAccount>Bob Smith</nameOnAccount></bankAccount></payment>');

      done();
    });

    it('should be able to create by calling objects', function(done) {
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
        creditCard: creditCard,
        bankAccount: bankAccount
      });

      expect(payment).to.be.instanceof(Types.Payment);
      expect(payment).to.have.length(1);
      expect(payment.bin).to.be.instanceof(Array);
      expect(payment.bin[0].creditCard).to.be.instanceof(Types.CreditCard);
      expect(payment.bin[0].bankAccount).to.be.instanceof(Types.BankAccount);
      expect(payment.toXml()).to.equal('<payment><creditCard><cardNumber>41111111111111110</cardNumber><expirationDate>2012-01</expirationDate><cardCode>111</cardCode></creditCard><bankAccount><accountType>individual</accountType><routingNumber>123456</routingNumber><accountNumber>1234567890</accountNumber><echeckType>WEB</echeckType><nameOnAccount>Bob Smith</nameOnAccount></bankAccount></payment>');

      done();
    });
  });

  describe('PaymentSimple', function() {
    it('should be able to create by calling new instances', function(done) {
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

      expect(payment).to.be.instanceof(Types.PaymentSimple);
      expect(payment).to.have.length(1);
      expect(payment.bin).to.be.instanceof(Array);
      expect(payment.bin[0].creditCard).to.be.instanceof(Types.CreditCard);
      expect(payment.bin[0].bankAccount).to.be.instanceof(Types.BankAccount);
      expect(payment.toXml()).to.equal('<creditCard><cardNumber>41111111111111110</cardNumber><expirationDate>2012-01</expirationDate><cardCode>111</cardCode></creditCard><bankAccount><accountType>individual</accountType><routingNumber>123456</routingNumber><accountNumber>1234567890</accountNumber><echeckType>WEB</echeckType><nameOnAccount>Bob Smith</nameOnAccount></bankAccount>');

      done();
    });

    it('should be able to create by calling objects', function(done) {
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
        creditCard: creditCard,
        bankAccount: bankAccount
      });

      expect(payment).to.be.instanceof(Types.PaymentSimple);
      expect(payment).to.have.length(1);
      expect(payment.bin).to.be.instanceof(Array);
      expect(payment.bin[0].creditCard).to.be.instanceof(Types.CreditCard);
      expect(payment.bin[0].bankAccount).to.be.instanceof(Types.BankAccount);
      expect(payment.toXml()).to.equal('<creditCard><cardNumber>41111111111111110</cardNumber><expirationDate>2012-01</expirationDate><cardCode>111</cardCode></creditCard><bankAccount><accountType>individual</accountType><routingNumber>123456</routingNumber><accountNumber>1234567890</accountNumber><echeckType>WEB</echeckType><nameOnAccount>Bob Smith</nameOnAccount></bankAccount>');

      done();
    });
  });

  describe('Transaction', function() {
    it('should be able to create by calling new instances', function(done) {
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

      expect(Transaction).to.be.instanceof(Types.Transaction);
      expect(Transaction.amount).to.equal(transaction.amount);
      expect(Transaction.tax).to.be.instanceof(Types.Tax);
      expect(Transaction.shipping).to.be.instanceof(Types.Shipping);
      expect(Transaction.duty).to.be.instanceof(Types.Duty);
      expect(Transaction.lineItems).to.be.instanceof(Types.LineItems);
      expect(Transaction.creditCardNumberMasked).to.equal(transaction.creditCardNumberMasked);
      expect(Transaction.bankAccountNumberMasked).to.equal(transaction.bankAccountNumberMasked);
      expect(Transaction.customerProfileId).to.equal(transaction.customerProfileId);
      expect(Transaction.customerPaymentProfileId).to.equal(transaction.customerPaymentProfileId);
      expect(Transaction.customerShippingAddressId).to.equal(transaction.customerShippingAddressId);
      expect(Transaction.order).to.be.instanceof(Types.Order);
      expect(Transaction.transId).to.equal(transaction.transId);
      expect(Transaction.taxExempt).to.equal('true');
      expect(Transaction.recurringBilling).to.equal('false');
      expect(Transaction.cardCode).to.equal(transaction.cardCode);
      expect(Transaction.splitTenderId).to.equal(transaction.splitTenderId);
      expect(Transaction.approvalCode).to.equal(transaction.approvalCode);
      expect(Transaction.toXml()).to.equal('<amount>5.41</amount><tax><amount>5.42</amount><name>Tax Item</name><description>Tax Desc</description></tax><shipping><amount>5.99</amount><name>Ship Item</name><description>Ship Desc</description></shipping><duty><amount>5.42</amount><name>Duty Item</name><description>Duty Desc</description></duty><lineItems><itemId>123</itemId><name>Name 1</name><description>Desc 1</description><quantity>1</quantity><unitPrice>1.2</unitPrice><taxable>false</taxable></lineItems><lineItems><itemId>124</itemId><name>Name 2</name><description>Desc 2</description><quantity>2</quantity><unitPrice>5.63</unitPrice><taxable>true</taxable></lineItems><customerProfileId>5</customerProfileId><customerPaymentProfileId>8</customerPaymentProfileId><customerShippingAddressId>3</customerShippingAddressId><creditCardNumberMasked>****</creditCardNumberMasked><bankAccountNumberMasked>****</bankAccountNumberMasked><order><invoiceNumber>542</invoiceNumber><description>Order Desc</description></order><transId>111</transId><taxExempt>true</taxExempt><recurringBilling>false</recurringBilling><cardCode>444</cardCode><splitTenderId>8934</splitTenderId><approvalCode>21931</approvalCode>');

      done();
    });

    it('should be able to create by calling objects', function(done) {
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
        tax: tax,
        shipping: shipping,
        duty: duty,
        lineItems: lineItems,
        creditCardNumberMasked: '****',
        bankAccountNumberMasked: '****',
        customerProfileId: 5,
        customerPaymentProfileId: 8,
        customerShippingAddressId: 3,
        order: order,
        transId: 111,
        taxExempt: true,
        recurringBilling: false,
        cardCode: 444,
        splitTenderId: 8934,
        approvalCode: 21931
      }

      var Transaction = new Types.Transaction(transaction);

      expect(Transaction).to.be.instanceof(Types.Transaction);
      expect(Transaction.amount).to.equal(transaction.amount);
      expect(Transaction.tax).to.be.instanceof(Types.Tax);
      expect(Transaction.shipping).to.be.instanceof(Types.Shipping);
      expect(Transaction.duty).to.be.instanceof(Types.Duty);
      expect(Transaction.lineItems).to.be.instanceof(Types.LineItems);
      expect(Transaction.creditCardNumberMasked).to.equal(transaction.creditCardNumberMasked);
      expect(Transaction.bankAccountNumberMasked).to.equal(transaction.bankAccountNumberMasked);
      expect(Transaction.customerProfileId).to.equal(transaction.customerProfileId);
      expect(Transaction.customerPaymentProfileId).to.equal(transaction.customerPaymentProfileId);
      expect(Transaction.customerShippingAddressId).to.equal(transaction.customerShippingAddressId);
      expect(Transaction.order).to.be.instanceof(Types.Order);
      expect(Transaction.transId).to.equal(transaction.transId);
      expect(Transaction.taxExempt).to.equal('true');
      expect(Transaction.recurringBilling).to.equal('false');
      expect(Transaction.cardCode).to.equal(transaction.cardCode);
      expect(Transaction.splitTenderId).to.equal(transaction.splitTenderId);
      expect(Transaction.approvalCode).to.equal(transaction.approvalCode);
      expect(Transaction.toXml()).to.equal('<amount>5.41</amount><tax><amount>5.42</amount><name>Tax Item</name><description>Tax Desc</description></tax><shipping><amount>5.99</amount><name>Ship Item</name><description>Ship Desc</description></shipping><duty><amount>5.42</amount><name>Duty Item</name><description>Duty Desc</description></duty><lineItems><itemId>123</itemId><name>Name 1</name><description>Desc 1</description><quantity>1</quantity><unitPrice>1.2</unitPrice><taxable>false</taxable></lineItems><lineItems><itemId>124</itemId><name>Name 2</name><description>Desc 2</description><quantity>2</quantity><unitPrice>5.63</unitPrice><taxable>true</taxable></lineItems><customerProfileId>5</customerProfileId><customerPaymentProfileId>8</customerPaymentProfileId><customerShippingAddressId>3</customerShippingAddressId><creditCardNumberMasked>****</creditCardNumberMasked><bankAccountNumberMasked>****</bankAccountNumberMasked><order><invoiceNumber>542</invoiceNumber><description>Order Desc</description></order><transId>111</transId><taxExempt>true</taxExempt><recurringBilling>false</recurringBilling><cardCode>444</cardCode><splitTenderId>8934</splitTenderId><approvalCode>21931</approvalCode>');

      done();
    });
  })

  describe('Duty', function() {
    it('should be able to create by calling new instances', function(done) {
      var duty = {
        amount: 5.67,
        name: 'Duty Taxes',
        description: 'My Description'
      }

      var Duty = new Types.Duty(duty);

      expect(Duty).to.be.instanceof(Types.Duty);
      expect(Duty).to.have.length(3);
      expect(Duty.amount).to.equal(duty.amount);
      expect(Duty.name).to.equal(duty.name);
      expect(Duty.description).to.equal(duty.description);
      expect(Duty.toXml()).to.equal('<duty><amount>5.67</amount><name>Duty Taxes</name><description>My Description</description></duty>');

      done();
    });
  });

  describe('Order', function() {
    it('should be able to create by calling new instances', function(done) {
      var order = {
        invoiceNumber: 124,
        description: 'My Description',
        purchaseOrderNumber: 12345
      }

      var Order = new Types.Order(order);

      expect(Order).to.be.instanceof(Types.Order);
      expect(Order).to.have.length(3);
      expect(Order.invoiceNumber).to.equal(order.invoiceNumber);
      expect(Order.description).to.equal(order.description);
      expect(Order.purchaseOrderNumber).to.equal(order.purchaseOrderNumber);
      expect(Order.toXml()).to.equal('<order><invoiceNumber>124</invoiceNumber><description>My Description</description><purchaseOrderNumber>12345</purchaseOrderNumber></order>');

      done();
    });
  });

  describe('Shipping', function() {
    it('should be able to create by calling new instances', function(done) {
      var shipping = {
        amount: 5.67,
        name: 'Shipping Name',
        description: 'My Description'
      }

      var Shipping = new Types.Shipping(shipping);

      expect(Shipping).to.be.instanceof(Types.Shipping);
      expect(Shipping).to.have.length(3);
      expect(Shipping.amount).to.equal(shipping.amount);
      expect(Shipping.name).to.equal(shipping.name);
      expect(Shipping.description).to.equal(shipping.description);
      expect(Shipping.toXml()).to.equal('<shipping><amount>5.67</amount><name>Shipping Name</name><description>My Description</description></shipping>');

      done();
    });
  });

  describe('Tax', function() {
    it('should be able to create by calling new instances', function(done) {
      var tax = {
        amount: 5.67,
        name: 'Taxes',
        description: 'My Description'
      }

      var Tax = new Types.Tax(tax);

      expect(Tax).to.be.instanceof(Types.Tax);
      expect(Tax).to.have.length(3);
      expect(Tax.amount).to.equal(tax.amount);
      expect(Tax.name).to.equal(tax.name);
      expect(Tax.description).to.equal(tax.description);
      expect(Tax.toXml()).to.equal('<tax><amount>5.67</amount><name>Taxes</name><description>My Description</description></tax>');

      done();
    });
  });

  describe('LineItems', function() {
    it('should be able to create by calling new instances', function(done) {
      var lineItems = [
        {itemId: 123, name: 'Name 1', description: 'Desc 1', quantity: 1, unitPrice: 1.2, taxable: false},
        {itemId: 124, name: 'Name 2', description: 'Desc 2', quantity: 2, unitPrice: 5.63, taxable: true}
      ];

      var LineItems = new Types.LineItems(lineItems);

      expect(LineItems).to.be.instanceof(Types.LineItems);
      expect(LineItems).to.have.length(2);
      expect(LineItems.bin).to.be.instanceof(Array);
      expect(LineItems.bin[0]).to.deep.equal(lineItems[0]);
      expect(LineItems.bin[1]).to.deep.equal(lineItems[1]);

      expect(LineItems.toXml()).to.equal('<lineItems><itemId>123</itemId><name>Name 1</name><description>Desc 1</description><quantity>1</quantity><unitPrice>1.2</unitPrice><taxable>false</taxable></lineItems><lineItems><itemId>124</itemId><name>Name 2</name><description>Desc 2</description><quantity>2</quantity><unitPrice>5.63</unitPrice><taxable>true</taxable></lineItems>');
      done();
    });
  });

  describe('CreditCard', function() {
    it('should be able to create by calling new instances', function(done) {
      var creditCard = {
        cardNumber: 41111111111111111,
        expirationDate: '2012-01',
        cardCode: 111
      }

      var CreditCard = new Types.CreditCard(creditCard);

      expect(CreditCard).to.be.instanceof(Types.CreditCard);
      expect(CreditCard).to.have.length(1);
      expect(CreditCard.cardNumber).to.equal(creditCard.cardNumber);
      expect(CreditCard.expirationDate).to.equal(creditCard.expirationDate);
      expect(CreditCard.cardCode).to.equal(creditCard.cardCode);
      expect(CreditCard.toXml()).to.equal('<creditCard><cardNumber>41111111111111110</cardNumber><expirationDate>2012-01</expirationDate><cardCode>111</cardCode></creditCard>');

      done();
    });
  });

  describe('BankAccount', function() {
    it('should be able to create by calling new instances', function(done) {
      var bankAccount = {
        accountType: 'individual',
        routingNumber: '123456',
        accountNumber: '1234567890',
        nameOnAccount: 'Bob Smith',
        echeckType: 'WEB',
        bankName: 'Steal Yo Money, LLC.'
      }

      var BankAccount = new Types.BankAccount(bankAccount);

      expect(BankAccount).to.be.instanceof(Types.BankAccount);
      expect(BankAccount).to.have.length(1);
      expect(BankAccount.accountType).to.equal(bankAccount.accountType);
      expect(BankAccount.routingNumber).to.equal(bankAccount.routingNumber);
      expect(BankAccount.nameOnAccount).to.equal(bankAccount.nameOnAccount);
      expect(BankAccount.echeckType).to.equal(bankAccount.echeckType);
      expect(BankAccount.bankName).to.equal(bankAccount.bankName);
      expect(BankAccount.toXml()).to.equal('<bankAccount><accountType>individual</accountType><routingNumber>123456</routingNumber><accountNumber>1234567890</accountNumber><echeckType>WEB</echeckType><nameOnAccount>Bob Smith</nameOnAccount></bankAccount>');

      done();
    });
  });

  describe('PaymentSchedule', function() {
    it('should be able to create by calling new instances', function(done) {
      var paymentSchedule = {
        interval: {
          length: 30,
          unit: 'days'
        },
        startDate: '2012-01',
        totalOccurences: 10,
        trialOccurences: 5
      }

      var PaymentSchedule = new Types.PaymentSchedule(paymentSchedule);

      expect(PaymentSchedule).to.be.instanceof(Types.PaymentSchedule);
      expect(PaymentSchedule).to.have.length(1);
      expect(PaymentSchedule.interval).to.deep.equal(paymentSchedule.interval);
      expect(PaymentSchedule.startDate).to.equal(paymentSchedule.startDate);
      expect(PaymentSchedule.totalOccurences).to.equal(paymentSchedule.totalOccurences);
      expect(PaymentSchedule.trialOccurences).to.equal(paymentSchedule.trialOccurences);
      expect(PaymentSchedule.toXml()).to.equal('<paymentSchedule><interval><length>30</length><unit>days</unit></interval><startDate>2012-01</startDate><totalOccurences>10</totalOccurences><trialOccurences>5</trialOccurences></paymentSchedule>');

      done();
    });
  });

  describe('Subscription', function() {
    it('should be able to create by calling new instances', function(done) {
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

      expect(Subscription).to.be.instanceof(Types.Subscription);
      expect(Subscription.name).to.equal(subscription.name);
      expect(Subscription.paymentSchedule).to.be.instanceof(Types.PaymentSchedule);
      expect(Subscription.amount).to.equal(subscription.amount);
      expect(Subscription.trialAmount).to.equal(subscription.trialAmount);
      expect(Subscription.payment).to.be.instanceof(Types.Payment);
      expect(Subscription.order).to.be.instanceof(Types.Order);
      expect(Subscription.customer.id).to.equal(subscription.customer.id);
      expect(Subscription.customer.email).to.equal(subscription.customer.email);
      expect(Subscription.customer.phoneNumber).to.equal(subscription.customer.phoneNumber);
      expect(Subscription.customer.faxNumber).to.equal(subscription.customer.faxNumber);
      expect(Subscription.billTo).to.be.instanceof(Types.BillingAddress);
      expect(Subscription.shipTo).to.be.instanceof(Types.ShippingAddress);
      expect(Subscription.toXml()).to.equal('<subscription><name>Hello</name><paymentSchedule><interval><length>30</length><unit>days</unit></interval><startDate>2012-01</startDate><totalOccurences>10</totalOccurences><trialOccurences>5</trialOccurences></paymentSchedule><amount>5.62</amount><trialAmount>2.3</trialAmount><payment><creditCard><cardNumber>41111111111111110</cardNumber><expirationDate>2012-01</expirationDate><cardCode>111</cardCode></creditCard></payment><order><invoiceNumber>124</invoiceNumber><description>My Description</description></order><customer><id>124</id><email>fake@fakemeai.com</email><phoneNumber>5551231234</phoneNumber><faxNumber>5551231235</faxNumber></customer><billTo><firstName>Dan</firstName><lastName>Smith</lastName><company>Company LLC</company><address>123 Sesame St</address><city>Johnesville</city><state>fl</state><zip>123</zip><country>us</country><phoneNumber>5551231234</phoneNumber><faxNumber>5551231235</faxNumber></billTo><shipTo><firstName>Dan</firstName><lastName>Smith</lastName><company>Company LLC</company><address>123 Sesame St</address><city>Johnesville</city><state>fl</state><zip>123</zip><country>us</country><phoneNumber>5551231234</phoneNumber><faxNumber>5551231235</faxNumber></shipTo></subscription>');

      done();
    });

    it('should be able to create by calling objects', function(done) {
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
        paymentSchedule: paymentSchedule,
        amount: 5.62,
        trialAmount: 2.30,
        payment: {
          creditCard: creditCard
        },
        order: order,
        customer: {
          id: 124,
          email: 'fake@fakemeai.com',
          phoneNumber: 5551231234,
          faxNumber: 5551231235
        },
        billTo: billingAddress,
        shipTo: shippingAddress
      }

      var Subscription = new Types.Subscription(subscription);

      expect(Subscription).to.be.instanceof(Types.Subscription);
      expect(Subscription.name).to.equal(subscription.name);
      expect(Subscription.paymentSchedule).to.be.instanceof(Types.PaymentSchedule);
      expect(Subscription.amount).to.equal(subscription.amount);
      expect(Subscription.trialAmount).to.equal(subscription.trialAmount);
      expect(Subscription.payment).to.be.instanceof(Types.Payment);
      expect(Subscription.order).to.be.instanceof(Types.Order);
      expect(Subscription.customer.id).to.equal(subscription.customer.id);
      expect(Subscription.customer.email).to.equal(subscription.customer.email);
      expect(Subscription.customer.phoneNumber).to.equal(subscription.customer.phoneNumber);
      expect(Subscription.customer.faxNumber).to.equal(subscription.customer.faxNumber);
      expect(Subscription.billTo).to.be.instanceof(Types.BillingAddress);
      expect(Subscription.shipTo).to.be.instanceof(Types.ShippingAddress);
      expect(Subscription.toXml()).to.equal('<subscription><name>Hello</name><paymentSchedule><interval><length>30</length><unit>days</unit></interval><startDate>2012-01</startDate><totalOccurences>10</totalOccurences><trialOccurences>5</trialOccurences></paymentSchedule><amount>5.62</amount><trialAmount>2.3</trialAmount><payment><creditCard><cardNumber>41111111111111110</cardNumber><expirationDate>2012-01</expirationDate><cardCode>111</cardCode></creditCard></payment><order><invoiceNumber>124</invoiceNumber><description>My Description</description></order><customer><id>124</id><email>fake@fakemeai.com</email><phoneNumber>5551231234</phoneNumber><faxNumber>5551231235</faxNumber></customer><billTo><firstName>Dan</firstName><lastName>Smith</lastName><company>Company LLC</company><address>123 Sesame St</address><city>Johnesville</city><state>fl</state><zip>123</zip><country>us</country><phoneNumber>5551231234</phoneNumber><faxNumber>5551231235</faxNumber></billTo><shipTo><firstName>Dan</firstName><lastName>Smith</lastName><company>Company LLC</company><address>123 Sesame St</address><city>Johnesville</city><state>fl</state><zip>123</zip><country>us</country><phoneNumber>5551231234</phoneNumber><faxNumber>5551231235</faxNumber></shipTo></subscription>');

      done();
    });
  });
});
