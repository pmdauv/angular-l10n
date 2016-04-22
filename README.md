# Angular 2 Localization
> An Angular 2 library to translate messages, dates and numbers.

## Sample app
Sample application that implements the translation: [demo](http://robisim74.github.io/angular2localization)

## Installation
You can add `angular2localization` to your project via [Node and npm](https://nodejs.org):
```
npm install --save angular2localization
```
To load the package you have two methods:
- Loading the bundle:
```Html
<!--loads angular2localization-->
<script src="node_modules/angular2localization/bundles/angular2localization.js"></script>
```
- Using SystemJS:
```Html
<!--configures SystemJS-->
<script>
    System.config({
        defaultJSExtensions: true,
        map: {
            'angular2localization': 'node_modules/angular2localization'
        }
    });
</script>
```

## Getting the translation
### Messages
```
expression | translate
```
where `expression` is a string key that indicates the message to translate.

For example, to get the translation, add in the template:
```Html
{{ 'TITLE' | translate }}
```
and include `TranslatePipe` in the component:
```TypeScript
import {TranslatePipe} from 'angular2localization/angular2localization';

@Component({
     ...
     pipes: [TranslatePipe]
})
```
With Angular 2 `I18nSelectPipe` that displays the string that matches the current value:
```Html
{{ gender | i18nSelect: inviteMapping | translate }}
```
With Angular 2 `I18nPluralPipe` that pluralizes the value properly:
```Html
{{ messages.length | i18nPlural: messageMapping | translate }}
```

### Dates
```
expression | localedate[:format]
```
where `expression` is a date object or a number (milliseconds since UTC epoch) and `format` indicates which date/time components to include. See Angular 2 `DatePipe` for further information.

For example, to get the local date, add in the template:
```Html
{{ today | localedate: 'fullDate' }}
```
and include `LocaleDatePipe` in the component.

### Numbers
#### Decimals
```
expression | number[:digitInfo]
```
where `expression` is a number and `digitInfo` has the following format: `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`. See Angular 2 `DecimalPipe` for further information.

For example, to get the local decimal, add in the template:
```Html
{{ pi | localedecimal:'1.5-5' }}
```
and include `LocaleDecimalPipe` in the component.
#### Percentages
```
expression | percent[:digitInfo]
```

For example, to get the local percentage, add in the template:
```Html
{{ a | localepercent:'1.1-1' }}
```
and include `LocalePercentPipe` in the component.
#### Currencies
```
expression | currency[:symbolDisplay[:digitInfo]]]
```
where `symbolDisplay` is a boolean indicating whether to use the currency symbol (e.g. $) or the currency code (e.g. USD) in the output. 

For example, to get the local currency, add in the template:
```Html
{{ b | localecurrency:true:'1.2-2' }}
```
and include `LocaleCurrencyPipe` in the component.

## First scenario
> You need to localize dates and numbers, but no messages.

### Basic usage
Add in the route component in order to access the data of location from anywhere in the application:
```TypeScript
// Services.
import {LocaleService} from 'angular2localization/angular2localization';

@Component({
     selector: 'app-component',
     ...
     providers: [LocaleService], // Inherited by all descendants.
})
 
export class AppComponent {
 
     constructor(public locale: LocaleService,) {
 
         // Initializes LocaleService.
         this.locale.definePreferredLanguage('en'); // Required: default language (ISO 639 two-letter code).
          
         // Default country for date & numbers (ISO 3166 two-letter, uppercase code). 
         this.locale.definePreferredCountry('US');
         // Optional: default currency (ISO 4217 three-letter code).
         this.locale.definePreferredCurrency('USD');
 
     }
 
}
```

## Second scenario
> You only need to translate messages.

### Basic usage
Add in the route component in order to access the data of location from anywhere in the application:
```TypeScript
// Services.
import {LocaleService} from 'angular2localization/angular2localization';
import {LocalizationService} from 'angular2localization/angular2localization';

@Component({
     selector: 'app-component',
     ...
     providers: [LocaleService, LocalizationService], // Localization providers: inherited by all descendants.
})
 
export class AppComponent {
 
     constructor(public locale: LocaleService, public localization: LocalizationService) {
 
         // Initializes LocaleService.
         this.locale.addLanguage('en'); // Required: adds a new language (ISO 639 two-letter code).
         this.locale.addLanguage('it');
         // Add a new language here.
         this.locale.definePreferredLanguage('en', 30); // Required: default language and expiry (No days). If the expiry is omitted, the cookie becomes a session cookie.
 
     }
 
}
```
Also add in the main:
```TypeScript
bootstrap(AppComponent, [HTTP_PROVIDERS]);
```
#### Direct loading
To initialize `LocalizationService` for the direct loading, add the following code in the body of the constructor of the route component:
```TypeScript
var translationEN = {
     TITLE: 'Angular 2 Localization',
     CHANGE_LANGUAGE: 'Change language',
     ...
}
// Add a new translation here.
 
this.localization.addTranslation('en', translationEN); // Required: adds a new translation with the given language code.
// Add a new translation with the given language code here.
```
#### Asynchronous loading
To initialize `LocalizationService` for the asynchronous loading add the following code in the body of the constructor of the route component:
```TypeScript
this.localization.translationProvider('./resources/locale-'); // Required: initializes the translation provider with the given path prefix.
```
and create the `json` files of the translations such as `locale-en.json`:
```
{
    "TITLE": "Angular 2 Localization",
    "CHANGE_LANGUAGE": "Change language",
    ...
}
```
#### Special characters
You can use quotes inside a string, as long as they don't match the quotes surrounding the string:
```
"It wasn't a dream."
```
Because strings must be written within quotes, use the `\` escape character to insert special characters into the values of the translations:
```
"\"What's happened to me?\" he thought."
```

### Advanced use with AsyncRoute
If you use an `AsyncRoute` in an extended application, you can create an instance of `LocalizationService` for every asynchronously loaded component.
Each instance is different, and can be directly or asynchronously loaded, as in this example:
```TypeScript
export class I18nComponent {

    // Instantiates a new LocalizationService for this component and for its descendants.
    constructor(public localizationI18n: LocalizationService) {

        this.localizationI18n.translationProvider('./resources/locale-i18n-'); // Required: initializes the translation provider with the given path prefix.

    }

}
```
In this way, application performance and memory usage are optimized.

### Changing language
To change language at runtime, call the following method:
```TypeScript
this.locale.setCurrentLanguage(language);
```
where `language` is the two-letter code of the new language (ISO 639).

## Third scenario
> You need to translate messages, dates and numbers.

### Basic usage
In addition to what has been said for the messages, add the following code in the body of the constructor of the route component:
```TypeScript
// Default country for date & numbers (ISO 3166 two-letter, uppercase code). 
this.locale.definePreferredCountry('US');
// Optional: default currency (ISO 4217 three-letter code).
this.locale.definePreferredCurrency('USD');
```
### Changing country and currency
To change country at runtime, call the following method:
```TypeScript
this.locale.setCurrentCountry(country);
```
where `country` is the two-letter, uppercase code of the new country (ISO 3166).

To change currency at runtime, call the following method:
```TypeScript
this.locale.setCurrentCurrency(currency);
```
where `currency` is the three-letter code of the new currency (ISO 4217).

See the [demo](http://robisim74.github.io/angular2localization) for a sample code.

## Internationalization API
To localize dates and numbers, this library uses Intl, through the classes available in Angular 2. For browsers compatibility, follow this [issue](https://github.com/angular/angular/issues/3333).

##License
MIT