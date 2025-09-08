import { VrControl, VrControlsEvent, VrControlOptions } from "../common.js";
import { PaypalStyleColorEnum, PaypalStyleSizeEnum, PaypalStyleShapeEnum, PaypalStyleLayoutEnum, ControlTypeEnum, puma, hideLoader, notify, NotifierTypeEnum, showLoader } from "../vr.js";
class PaypalButtonOptions extends VrControlOptions {
  setupUrl;
  style;
  intent;
  createOrderRequest;
  approveRequest;
  enableStandardCardFields;
  onRendered;
  onCancel;
  onBeforePayment;
}
class PaypalButton extends VrControl {
  constructor(element, options) {
    if (options == null)
      options = new PaypalButtonOptions();
    if (options.style == null) options.style = new PaypalStyle();
    if (options.style.color == null) options.style.color = PaypalStyleColorEnum.Gold;
    if (options.style.size == null) options.style.size = PaypalStyleSizeEnum.Responsive;
    if (options.style.shape == null) options.style.shape = PaypalStyleShapeEnum.Rect;
    if (options.style.height == null) options.style.height = 30;
    if (options.style.tagline == null) options.style.tagline = false;
    if (options.style.fundingicons == null) options.style.fundingicons = true;
    if (options.style.layout == null) options.style.layout = PaypalStyleLayoutEnum.Horizontal;
    if (options.enableStandardCardFields == null) options.enableStandardCardFields = true;
    if (options.intent == null) options.intent = "CAPTURE";
    if (options.createOrderRequest == null) options.createOrderRequest = new SetupPaymentRequest();
    if (options.createOrderRequest.authKey == null) options.createOrderRequest.authKey = "1D7822D72F5397BEF65D677C89E85";
    if (options.createOrderRequest.method == null) options.createOrderRequest.method = "/api/PaypalWebApi/CreatePayment/";
    if (options.approveRequest == null) options.approveRequest = new ExecutePaymentRequest();
    if (options.approveRequest.authKey == null) options.approveRequest.authKey = "1D7822D72F5397BEF65D677C89E85";
    if (options.approveRequest.method == null) options.approveRequest.method = "/api/PaypalWebApi/ExecutePayment/";
    super(element, options, ControlTypeEnum.PaypalButton);
    if (options.setupUrl != null) {
      if (options.setupUrl.clientId == null)
        throw Error("PayPal clientId obbligatorio");
      if (options.setupUrl.currency == null) options.setupUrl.currency = "EUR";
      if (options.setupUrl.intent == null) options.setupUrl.intent = "capture";
      if (options.setupUrl.commit == null) options.setupUrl.commit = false;
      if (options.setupUrl.locale == null) options.setupUrl.locale = "it_IT";
      puma.getScript(`<script src='https://www.paypal.com/sdk/js?client-id=` + options.setupUrl.clientId + `&currency=` + options.setupUrl.currency + `&intent=` + options.setupUrl.intent + `&commit=` + options.setupUrl.commit + `&locale=` + options.setupUrl.locale + `'><\/script>`).then(() => this.renderButton());
    } else
      this.renderButton();
  }
  //#region Methods
  renderButton() {
    let options = this.getOptions();
    paypal.Buttons({
      enableStandardCardFields: options.enableStandardCardFields,
      style: options.style,
      createOrder: (data, actions) => {
        showLoader(options.createOrderRequest.loader);
        if (options.onBeforePayment != null) {
          let beforePaymentEvent = new OnPaypalBeforePaymentEvent();
          beforePaymentEvent.sender = this;
          options.onBeforePayment(beforePaymentEvent);
          if (beforePaymentEvent.isDefaultPrevented()) {
            hideLoader();
            return false;
          }
        }
        let json = this.prepareWebApiCall(
          options.createOrderRequest,
          0
          /* CreateOrder */
        );
        return fetch(
          options.createOrderRequest.method,
          {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(json)
          }
        ).then((res) => {
          let json2 = res.json();
          return json2;
        }).then(
          (data2) => {
            if (data2.token != null && data2.token != "") {
              if (options.createOrderRequest.successNotificationMessage != null) {
                if (options.createOrderRequest.successNotificationMessage === true)
                  options.createOrderRequest.successNotificationMessage = "Pagamento creato correttamente";
                if (options.createOrderRequest.successNotificationMessage !== false)
                  notify(options.createOrderRequest.successNotificationMessage);
              }
              if (options.createOrderRequest.callback != null)
                options.createOrderRequest.callback(data2);
              return data2.token;
            } else
              this.manageError(options.createOrderRequest, 1, data2);
          },
          (exception) => {
            hideLoader();
            this.manageError(
              options.createOrderRequest,
              0
              /* CreateOrder */
            );
          }
        );
      },
      onApprove: (data, actions) => {
        let json = this.prepareWebApiCall(options.approveRequest, 2, data);
        showLoader(options.approveRequest.loader);
        return fetch(
          options.approveRequest.method,
          {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(json)
          }
        ).then(
          (response) => {
            hideLoader();
            if (response.ok == true) {
              if (options.approveRequest.successNotificationMessage != null) {
                if (options.approveRequest.successNotificationMessage === true)
                  options.approveRequest.successNotificationMessage = "Pagamento creato correttamente";
                if (options.approveRequest.successNotificationMessage !== false)
                  notify(options.approveRequest.successNotificationMessage);
              }
              if (options.approveRequest.callback != null)
                options.approveRequest.callback(response);
            } else
              this.manageError(options.createOrderRequest, 2, response);
          },
          (exception) => {
            hideLoader();
            this.manageError(options.createOrderRequest, 2, exception);
          }
        );
      },
      onCancel: (data, actions) => {
        hideLoader();
        if (options.onCancel != null) {
          let cancelEvent = new OnPaypalCancelEvent();
          cancelEvent.sender = this;
          cancelEvent.data = data;
          cancelEvent.actions = actions;
          options.onCancel(cancelEvent);
        }
      },
      onError: (data) => {
        hideLoader();
        notify("Si è verificato un errore", { type: NotifierTypeEnum.Error });
      }
    }).render(this.element()).then(() => {
      if (options.onRendered != null) {
        let renderedEvent = new OnPaypalRenderedEvent();
        renderedEvent.sender = this;
        options.onRendered(renderedEvent);
      }
    });
  }
  prepareWebApiCall(request, requestType, data = null) {
    let json = {};
    json.AuthKey = request.authKey;
    if (request.method.startsWith("api/"))
      request.method = "/" + request.method;
    if (!request.method.endsWith("/"))
      request.method = request.method + "/";
    if (requestType == 0) {
      if (request.cancelUrl != null)
        json[request.cancelUrl] = request.cancelUrl;
      if (request.returnUrl != null)
        json[request.returnUrl] = request.returnUrl;
    } else if (requestType == 2 && data != null) {
      if (request.paymentIdPropertyName == null)
        request.paymentIdPropertyName = "paymentId";
      json[request.paymentIdPropertyName] = data.paymentID;
      if (request.payerIdPropertyName == null)
        request.payerIdPropertyName = "payerId";
      json[request.payerIdPropertyName] = data.payerID;
    }
    if (request.otherParameters != null) {
      let jsonParameters = Object.getOwnPropertyNames(request.otherParameters);
      for (let param of jsonParameters)
        json[param] = request.otherParameters[param];
    }
    if (request.parameters != null) {
      let parameters = request.parameters();
      let jsonParameters = Object.getOwnPropertyNames(parameters);
      for (let param of jsonParameters)
        json[param] = parameters[param];
    }
    return json;
  }
  manageError(request, requestType, data = void 0) {
    if (request.errorNotificationMessage != null) {
      if (request.errorNotificationMessage === true) {
        let error = "";
        switch (requestType) {
          case 1:
            error = String(data.Result.Response);
            break;
          case 0:
            error = "Si è verificato un errore nella creazione del pagamento";
            break;
          case 2:
            error = "Il pagamento della transazione non è andato a buon fine";
            break;
        }
        request.errorNotificationMessage = error;
      }
      if (request.errorNotificationMessage !== false)
        notify(request.errorNotificationMessage, { type: NotifierTypeEnum.Error });
    } else if (data != null) {
      if (data.Result.Response != null)
        notify(data.Result.Response, { type: NotifierTypeEnum.Error });
      else
        notify(data.Result.Message, { type: NotifierTypeEnum.Error });
    } else
      notify("Si è verificato un errore", { type: NotifierTypeEnum.Error });
    if (request.errorCallback != null)
      request.errorCallback(data);
  }
  getOptions() {
    return this.options();
  }
  //#endregion
}
class PaypalStyle {
  size;
  color;
  shape;
  height;
  tagline;
  layout;
  fundingicons;
}
class PaypalWebApiRequest {
  authKey;
  method;
  successNotificationMessage;
  errorNotificationMessage;
  otherParameters;
  loader;
  callback;
  errorCallback;
  parameters;
}
class SetupPaymentRequest extends PaypalWebApiRequest {
  cancelUrl;
  returnUrl;
}
class ExecutePaymentRequest extends PaypalWebApiRequest {
  paymentIdPropertyName;
  payerIdPropertyName;
}
class OnPaypalCancelEvent extends VrControlsEvent {
  sender;
  data;
  actions;
}
class OnPaypalBeforePaymentEvent extends VrControlsEvent {
  sender;
}
class OnPaypalRenderedEvent extends VrControlsEvent {
  sender;
}
export {
  PaypalButton,
  PaypalButtonOptions
};
//# sourceMappingURL=paypalButton.js.map
