import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { ControlTypeEnum, hideLoader, NotifierTypeEnum, notify, PaypalStyleColorEnum, PaypalStyleLabelEnum, PaypalStyleLayoutEnum, PaypalStyleShapeEnum, PaypalStyleSizeEnum, puma, showLoader } from "../vr";
declare var paypal: any;

//#region Options
export class PaypalButtonOptions extends VrControlOptions
{
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
//#endregion

//#region Control
export class PaypalButton extends VrControl
{
	constructor(element: HTMLElement, options?: PaypalButtonOptions | null)
	{
		//#region Options
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
		//#endregion

		super(element, options, ControlTypeEnum.PaypalButton);

		if (options.setupUrl != null)
		{
			if (options.setupUrl.clientId == null)
				throw Error("PayPal clientId obbligatorio");

			if (options.setupUrl.currency == null) options.setupUrl.currency = "EUR";
			if (options.setupUrl.intent == null) options.setupUrl.intent = "capture";
			if (options.setupUrl.commit == null) options.setupUrl.commit = false;
			if (options.setupUrl.locale == null) options.setupUrl.locale = "it_IT";

			(puma as any).getScript(`<script src='https://www.paypal.com/sdk/js?client-id=` + options.setupUrl.clientId
				+ `&currency=` + options.setupUrl.currency + `&intent=` + options.setupUrl.intent
				+ `&commit=` + options.setupUrl.commit + `&locale=` + options.setupUrl.locale + `'></script>`)
				.then(() => this.renderButton());
		}
		else
			this.renderButton();
	}

	//#region Methods
	private renderButton()
	{
		let options = this.getOptions();
		paypal.Buttons({
			enableStandardCardFields: options!.enableStandardCardFields,
			style: options!.style,
			createOrder: (data: any, actions: any) =>
			{
				showLoader(options!.createOrderRequest!.loader);

				if (options!.onBeforePayment != null)
				{
					let beforePaymentEvent = new OnPaypalBeforePaymentEvent();
					beforePaymentEvent.sender = this;
					options!.onBeforePayment(beforePaymentEvent);

					if (beforePaymentEvent.isDefaultPrevented())
					{
						hideLoader();
						return false;
					}
				}

				let json = this.prepareWebApiCall(options!.createOrderRequest!, PaypalWebApiTypeEnum.CreateOrder);
				return fetch(options!.createOrderRequest!.method!,
					{
						method: "post",
						headers: { "content-type": "application/json" },
						body: JSON.stringify(json)
					})
					.then((res) =>
					{
						let json = res.json() as any;
						return json;
					})
					.then((data) =>
					{
						if (data.token != null && data.token != "")
						{
							if (options!.createOrderRequest!.successNotificationMessage != null)
							{
								if (options!.createOrderRequest!.successNotificationMessage === true)
									options!.createOrderRequest!.successNotificationMessage = "Pagamento creato correttamente";

								if (options!.createOrderRequest!.successNotificationMessage !== false)
									notify(options!.createOrderRequest!.successNotificationMessage);
							}

							if (options!.createOrderRequest!.callback != null)
								options!.createOrderRequest!.callback(data);

							return data.token;
						}
						else
							this.manageError(options!.createOrderRequest!, PaypalWebApiTypeEnum.SetupError, data);
					},
						(exception: any) =>
						{
							hideLoader();
							this.manageError(options!.createOrderRequest!, PaypalWebApiTypeEnum.CreateOrder);
						});
			},
			onApprove: (data: any, actions: any) =>
			{
				let json = this.prepareWebApiCall(options!.approveRequest!, PaypalWebApiTypeEnum.OnApprove, data);
				showLoader(options!.approveRequest!.loader);

				return fetch(options!.approveRequest!.method!,
					{
						method: "post",
						headers: { "content-type": "application/json" },
						body: JSON.stringify(json)
					})
					.then((response: any) =>
					{
						hideLoader();
						if (response.ok == true)
						{
							if (options!.approveRequest!.successNotificationMessage != null)
							{
								if (options!.approveRequest!.successNotificationMessage === true)
									options!.approveRequest!.successNotificationMessage = "Pagamento creato correttamente";

								if (options!.approveRequest!.successNotificationMessage !== false)
									notify(options!.approveRequest!.successNotificationMessage);
							}

							if (options!.approveRequest!.callback != null)
								options!.approveRequest!.callback(response);
						}
						else
							this.manageError(options!.createOrderRequest!, PaypalWebApiTypeEnum.OnApprove, response);
					},
						(exception: any) =>
						{
							hideLoader();
							this.manageError(options!.createOrderRequest!, PaypalWebApiTypeEnum.OnApprove, exception);
						});
			},
			onCancel: (data: any, actions: any) =>
			{
				hideLoader();
				if (options!.onCancel != null)
				{
					let cancelEvent = new OnPaypalCancelEvent();
					cancelEvent.sender = this;
					cancelEvent.data = data;
					cancelEvent.actions = actions;
					options!.onCancel(cancelEvent);
				}
			},
			onError: (data: any) =>
			{
				hideLoader();
				notify("Si è verificato un errore", { type: NotifierTypeEnum.Error });
			}
		}).render(this.element()).then(() =>
		{
			if (options!.onRendered != null)
			{
				let renderedEvent = new OnPaypalRenderedEvent();
				renderedEvent.sender = this;
				options!.onRendered(renderedEvent);
			}
		});
	}

	private prepareWebApiCall(request: PaypalWebApiRequest, requestType: PaypalWebApiTypeEnum, data: any = null)
	{
		let json: any = {};
		json.AuthKey = request.authKey;

		//#region Method
		if (request.method!.startsWith("api/"))
			request.method = "/" + request.method;

		if (!request.method!.endsWith("/"))
			request.method! = request.method + "/";
		//#endregion

		//#region Type
		if (requestType == PaypalWebApiTypeEnum.CreateOrder)
		{
			if ((request as SetupPaymentRequest).cancelUrl != null)
				json[(request as SetupPaymentRequest).cancelUrl!] = (request as SetupPaymentRequest).cancelUrl;

			if ((request as SetupPaymentRequest).returnUrl != null)
				json[(request as SetupPaymentRequest).returnUrl!] = (request as SetupPaymentRequest).returnUrl;
		}
		else if (requestType == PaypalWebApiTypeEnum.OnApprove && data != null)
		{
			if ((request as ExecutePaymentRequest).paymentIdPropertyName == null)
				(request as ExecutePaymentRequest).paymentIdPropertyName = "paymentId";
			json[(request as ExecutePaymentRequest).paymentIdPropertyName!] = data.paymentID;

			if ((request as ExecutePaymentRequest).payerIdPropertyName == null)
				(request as ExecutePaymentRequest).payerIdPropertyName = "payerId";
			json[(request as ExecutePaymentRequest).payerIdPropertyName!] = data.payerID;
		}
		//#endregion

		//#region Paramaters
		if (request.otherParameters != null)
		{
			let jsonParameters = Object.getOwnPropertyNames(request.otherParameters);
			for (let param of jsonParameters)
				json[param] = request.otherParameters[param];
		}

		if (request.parameters != null)
		{
			let parameters = request.parameters();
			let jsonParameters = Object.getOwnPropertyNames(parameters);
			for (let param of jsonParameters)
				json[param] = parameters[param];
		}
		//#endregion

		return json;
	}

	private manageError(request: PaypalWebApiRequest, requestType: PaypalWebApiTypeEnum, data: any = undefined)
	{
		if (request.errorNotificationMessage != null)
		{
			if (request.errorNotificationMessage === true)
			{
				let error = "";
				switch (requestType)
				{
					case PaypalWebApiTypeEnum.SetupError: error = String(data.Result.Response); break;
					case PaypalWebApiTypeEnum.CreateOrder: error = "Si è verificato un errore nella creazione del pagamento"; break;
					case PaypalWebApiTypeEnum.OnApprove: error = "Il pagamento della transazione non è andato a buon fine"; break;
				}
				request.errorNotificationMessage = error;
			}

			if (request.errorNotificationMessage !== false)
				notify(request.errorNotificationMessage, { type: NotifierTypeEnum.Error });
		}
		else if (data != null)
		{
			if (data.Result.Response != null)
				notify(data.Result.Response, { type: NotifierTypeEnum.Error });
			else
				notify(data.Result.Message, { type: NotifierTypeEnum.Error });
		}
		else
			notify("Si è verificato un errore", { type: NotifierTypeEnum.Error });

		if (request.errorCallback != null)
			request.errorCallback(data);
	}

	getOptions()
	{
		return this.options<PaypalButtonOptions>();
	}
	//#endregion
}
//#endregion

//#region Classes
class PaypalSetupUrl
{
	clientId?: string;
	locale?: string;
	currency?: string;
	intent?: string;
	commit?: boolean;
}

class PaypalStyle
{
	size?: PaypalStyleSizeEnum;
	color?: PaypalStyleColorEnum;
	shape?: PaypalStyleShapeEnum;
	height?: number;
	tagline?: boolean;
	layout?: PaypalStyleLayoutEnum;
	fundingicons?: boolean;
}

class PaypalWebApiRequest
{
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

class SetupPaymentRequest extends PaypalWebApiRequest
{
	cancelUrl?: string;
	returnUrl?: string;
}

class ExecutePaymentRequest extends PaypalWebApiRequest
{
	paymentIdPropertyName?: string;
	payerIdPropertyName?: string;
}

enum PaypalWebApiTypeEnum
{
	CreateOrder,
	SetupError,
	OnApprove
}

class OnPaypalCancelEvent extends VrControlsEvent
{
	sender: PaypalButton;
	data: any;
	actions: any;
}

class OnPaypalBeforePaymentEvent extends VrControlsEvent
{
	sender: PaypalButton;
}

class OnPaypalRenderedEvent extends VrControlsEvent
{
	sender: PaypalButton;
}
//#endregion