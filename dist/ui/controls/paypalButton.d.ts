import { VrControl, VrControlOptions, VrControlsEvent } from '../common';
import { PaypalStyleColorEnum, PaypalStyleLayoutEnum, PaypalStyleShapeEnum, PaypalStyleSizeEnum } from '../vr';
export declare class PaypalButtonOptions extends VrControlOptions {
    setupUrl?: PaypalSetupUrl;
    style?: PaypalStyle;
    intent?: string;
    createOrderRequest?: SetupPaymentRequest;
    approveRequest?: ExecutePaymentRequest;
    enableStandardCardFields?: boolean;
    onRendered?: (e: OnPaypalRenderedEvent) => void;
    onCancel?: (e: OnPaypalCancelEvent) => void;
    onBeforePayment?: (e: OnPaypalBeforePaymentEvent) => void;
}
export declare class PaypalButton extends VrControl {
    constructor(element: HTMLElement, options?: PaypalButtonOptions | null);
    private renderButton;
    private prepareWebApiCall;
    private manageError;
    getOptions(): PaypalButtonOptions;
}
declare class PaypalSetupUrl {
    clientId?: string;
    locale?: string;
    currency?: string;
    intent?: string;
    commit?: boolean;
}
declare class PaypalStyle {
    size?: PaypalStyleSizeEnum;
    color?: PaypalStyleColorEnum;
    shape?: PaypalStyleShapeEnum;
    height?: number;
    tagline?: boolean;
    layout?: PaypalStyleLayoutEnum;
    fundingicons?: boolean;
}
declare class PaypalWebApiRequest {
    authKey?: string;
    method?: string;
    successNotificationMessage?: boolean | string;
    errorNotificationMessage?: boolean | string;
    otherParameters?: any;
    loader?: HTMLElement | JQuery | string;
    callback?: (response?: any) => void;
    errorCallback?: (message?: string) => void;
    parameters?: () => any;
}
declare class SetupPaymentRequest extends PaypalWebApiRequest {
    cancelUrl?: string;
    returnUrl?: string;
}
declare class ExecutePaymentRequest extends PaypalWebApiRequest {
    paymentIdPropertyName?: string;
    payerIdPropertyName?: string;
}
declare class OnPaypalCancelEvent extends VrControlsEvent {
    sender: PaypalButton;
    data: any;
    actions: any;
}
declare class OnPaypalBeforePaymentEvent extends VrControlsEvent {
    sender: PaypalButton;
}
declare class OnPaypalRenderedEvent extends VrControlsEvent {
    sender: PaypalButton;
}
export {};
