"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// FormBuilder with formControl.
var forms_1 = require('@angular/forms');
// Angular 2 Material.
var card_1 = require('@angular2-material/card');
var input_1 = require('@angular2-material/input');
var button_1 = require('@angular2-material/button');
// Services.
var angular2localization_1 = require('angular2localization/angular2localization');
// Pipes.
var angular2localization_2 = require('angular2localization/angular2localization');
var angular2localization_3 = require('angular2localization/angular2localization');
// Directives for FormBuilder with formControl.
var angular2localization_4 = require('angular2localization/angular2localization');
// Directives for ngModel.
/*import {LocaleNumberValidator} from 'angular2localization/angular2localization';*/
var ValidationComponent = (function (_super) {
    __extends(ValidationComponent, _super);
    // FormBuilder with formControl.
    /*numberForm: FormGroup;
    decimal: AbstractControl;

    constructor(public locale: LocaleService, public localization: LocalizationService, private fb: FormBuilder) {
        super(locale, localization)

        this.numberForm = fb.group({
            'decimal': ['', validateLocaleNumber(this.locale, this.digits, this.minValue, this.maxValue)]
        });

        // 'decimal' control.
        this.decimal = this.numberForm.controls['decimal'];

    }

    onSubmit(value: any) {

        this.parsedValue = LocaleParser.Number(value.decimal, this.locale.getDefaultLocale());

    }*/
    // ngModel.
    function ValidationComponent(locale, localization) {
        _super.call(this, locale, localization);
        this.locale = locale;
        this.localization = localization;
        // Options.
        this.digits = "1.2-2";
        this.minValue = -Math.round(Math.random() * 10000) / 100;
        this.maxValue = Math.round(Math.random() * 10000) / 100;
        this.parsedValue = null;
    }
    ValidationComponent.prototype.onSubmit = function (value) {
        this.parsedValue = angular2localization_1.LocaleParser.Number(value, this.locale.getDefaultLocale());
    };
    ValidationComponent = __decorate([
        core_1.Component({
            templateUrl: './app/validation.component.html',
            pipes: [angular2localization_2.TranslatePipe, angular2localization_3.LocaleDecimalPipe],
            directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, angular2localization_4.LocaleNumberValidator, card_1.MD_CARD_DIRECTIVES, input_1.MD_INPUT_DIRECTIVES, button_1.MdButton]
        }), 
        __metadata('design:paramtypes', [angular2localization_1.LocaleService, angular2localization_1.LocalizationService])
    ], ValidationComponent);
    return ValidationComponent;
}(angular2localization_1.Locale));
exports.ValidationComponent = ValidationComponent;
