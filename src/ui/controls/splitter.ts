import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
import { ControlTypeEnum, createIcon, IconClassSolid, IconClass, puma, SplitterCollapsableSettings, SplitterCollapseDirectionEnum, SplitterDirectionEnum } from "../vr";

//#region Options
export class SplitterOptions extends VrControlOptions
{
	direction?: SplitterDirectionEnum;
	collapsable?: boolean | SplitterCollapsableSettings;
	resizable?: boolean;

	onBeforeExpandCollapse?: (e: SplitterBeforeExpandCollapseEvent) => void;
	onAfterExpandExpandCollapse?: (e: SplitterAfterExpandCollapseEvent) => void;
	onBeforeResize?: (e: SplitterBeforeResizeEvent) => void;
	onAfterResize?: (e: SplitterAfterResizeEvent) => void;
}
//#endregion

//#region Control
export class Splitter extends VrControl
{
	//#region Variables
	private _previousDiv: HTMLElement;
	private _nextDiv: HTMLElement;
	//#endregion

	constructor(element: HTMLElement, options?: SplitterOptions | null)
	{
		//#region Options
		if (options == null)
			options = new SplitterOptions();

		if (options.direction == null) options.direction = SplitterDirectionEnum.Horizontal;
		if (options.resizable == null) options.resizable = true;
		if (options.tabIndex == null) options.tabIndex = -1;

		if (options.collapsable == null) options.collapsable = false;
		if (options.collapsable === true)
		{
			options.collapsable = new SplitterCollapsableSettings();
			if (options.collapsable.direction == null) options.collapsable.direction = SplitterCollapseDirectionEnum.Left;
			if (options.collapsable.color == null) options.collapsable.color = "#000";

			if (options.direction == SplitterDirectionEnum.Horizontal) options.collapsable.direction = SplitterCollapseDirectionEnum.Left;
			else if (options.direction == SplitterDirectionEnum.Vertical) options.collapsable.direction = SplitterCollapseDirectionEnum.Up;
		}
		//#endregion

		super(element, options, ControlTypeEnum.Splitter);

		if (options.resizable)
			vrSplitterResizable(this, options);

		//#region Direction
		switch (options.direction)
		{
			case SplitterDirectionEnum.Horizontal: puma(this.element()).attr("data-direction", "horizontal"); break;
			case SplitterDirectionEnum.Vertical: puma(this.element()).attr("data-direction", "vertical"); break;
		}
		//#endregion

		//#region Collapse
		if (options.collapsable !== false)
		{
			let icon = "";
			let cssContainer = "";
			switch (options.collapsable.direction as SplitterCollapseDirectionEnum)
			{
				case SplitterCollapseDirectionEnum.Left:
					{
						icon = IconClassSolid.CaretLeft;
						cssContainer = "left: -5px; top: Calc(50% - 8px);";
					}
					break;
				case SplitterCollapseDirectionEnum.Right:
					{
						icon = IconClassSolid.CaretRight;
						cssContainer = "left: 0px; top: Calc(50% - 8px);";
					}
					break;
				case SplitterCollapseDirectionEnum.Up:
					{
						icon = IconClassSolid.CaretUp;
						cssContainer = "top: -10px; left: Calc(50% - 5px);";
					}
					break;
				case SplitterCollapseDirectionEnum.Down:
					{
						icon = IconClassSolid.CaretDown;
						cssContainer = "top: -5px; left: Calc(50% - 5px)";
					}
					break;
			}

			createIcon({
				value: icon,
				cssContainer: "position: absolute; " + cssContainer,
				color: options.collapsable.color,
				tag: "expanded",
				onClick: (e) =>
				{
					let tag = e.sender.tag(); // If 'expanded', you are collapsing it

					//#region Previous/Next div
					if (this._previousDiv == null)
					{
						this._previousDiv = this.container().previousElementSibling as HTMLElement;
						this._nextDiv = this.container().nextElementSibling as HTMLElement;
					}
					//#endregion

					//#region Before collapse/expand event
					if (options!.onBeforeExpandCollapse != null)
					{
						let beforeExpandCollapseEvent = new SplitterBeforeExpandCollapseEvent();
						beforeExpandCollapseEvent.sender = this;
						beforeExpandCollapseEvent.collapse = (tag == "expanded");
						beforeExpandCollapseEvent.previousDiv = this._previousDiv;
						beforeExpandCollapseEvent.nextDiv = this._nextDiv;
						options!.onBeforeExpandCollapse(beforeExpandCollapseEvent);

						if (beforeExpandCollapseEvent.isDefaultPrevented())
						{
							e.preventDefault();
							return;
						}
					}
					//#endregion

					switch ((options!.collapsable as SplitterCollapsableSettings).direction)
					{
						case SplitterCollapseDirectionEnum.Left:
							{
								//#region Left
								if (tag == "expanded")
								{
									puma(this._previousDiv).hide();
									puma(this._nextDiv).width("100%");
									e.sender.value(IconClassSolid.CaretRight);
									e.sender.cssContainer("left: 0px;");
								}
								else
								{
									puma(this._previousDiv).show();

									let width = (100 - this._previousDiv.style.width.vrGetNumericPart()) + "%";
									if (this._previousDiv.style.width.endsWith("px"))
										width = "Calc(100% - " + this._previousDiv.style.width.vrGetNumericPart() + "px)";
									puma(this._nextDiv).width(width);

									e.sender.value(IconClassSolid.CaretLeft);
									e.sender.cssContainer("left: -5px;");
								}
								//#endregion
							}
							break;
						case SplitterCollapseDirectionEnum.Right:
							{
								//#region Right
								if (tag == "expanded")
								{
									puma(this._previousDiv).width("100%");
									puma(this._nextDiv).hide();
									e.sender.value(IconClassSolid.CaretLeft);
									e.sender.cssContainer("left: -5px;");
								}
								else
								{
									let width = (100 - this._nextDiv.style.width.vrGetNumericPart()) + "%";
									if (this._nextDiv.style.width.endsWith("px"))
										width = "Calc(100% - " + this._nextDiv.style.width.vrGetNumericPart() + "px)";
									puma(this._previousDiv).width(width);

									puma(this._nextDiv).show();
									e.sender.value(IconClassSolid.CaretRight);
									e.sender.cssContainer("left: 0px;");
								}
								//#endregion
							}
							break;
						case SplitterCollapseDirectionEnum.Down:
							{
								//#region Down
								if (tag == "expanded")
								{
									puma(this._previousDiv).height("100%");
									puma(this._nextDiv).hide();
									e.sender.value(IconClassSolid.CaretUp);
									e.sender.cssContainer("top: -10px;");
								}
								else
								{
									let height = (100 - this._nextDiv.style.height.vrGetNumericPart()) + "%";
									if (this._nextDiv.style.height.endsWith("px"))
										height = "Calc(100% - " + this._nextDiv.style.height.vrGetNumericPart() + "px)";
									puma(this._previousDiv).height(height);

									puma(this._nextDiv).show();
									e.sender.value(IconClassSolid.CaretDown);
									e.sender.cssContainer("top: -5px;");
								}
								//#endregion
							}
							break;
						case SplitterCollapseDirectionEnum.Up:
							{
								//#region Up
								if (tag == "expanded")
								{
									puma(this._previousDiv).hide();
									puma(this._nextDiv).height("100%");
									e.sender.value(IconClassSolid.CaretDown);
									e.sender.cssContainer("top: -5px;");
								}
								else
								{
									puma(this._previousDiv).show();

									let height = (100 - this._previousDiv.style.height.vrGetNumericPart()) + "%";
									if (this._previousDiv.style.height.endsWith("px"))
										height = "Calc(100% - " + this._previousDiv.style.height.vrGetNumericPart() + "px)";
									puma(this._nextDiv).height(height);

									e.sender.value(IconClassSolid.CaretUp);
									e.sender.cssContainer("top: -10px;");
								}
								//#endregion
							}
							break;
					}

					//#region After collapse/expand event
					if (options!.onAfterExpandExpandCollapse != null)
					{
						let afterExpandCollapseEvent = new SplitterAfterExpandCollapseEvent();
						afterExpandCollapseEvent.sender = this;
						afterExpandCollapseEvent.collapse = (tag == "expanded");
						afterExpandCollapseEvent.previousDiv = this._previousDiv;
						afterExpandCollapseEvent.nextDiv = this._nextDiv;
						options!.onAfterExpandExpandCollapse(afterExpandCollapseEvent);
					}
					//#endregion

					if (tag == "expanded")
						e.sender.tag("collapsed");
					else
						e.sender.tag("expanded");
				}
			}, this.container())
		}
		//#endregion
	}
}
//#endregion

//#region Resize
let vrSplitterResizable = (sender: Splitter, options: SplitterOptions) =>
{
	let resizer = sender.element() as any;
	let direction: any = null;
	let prevSibling: any = null;
	let nextSibling: any = null;

	let x = 0;
	let y = 0;
	let prevSiblingHeight = 0;
	let prevSiblingWidth = 0;

	const mouseDownHandler = (e: any) =>
	{
		direction = resizer.getAttribute("data-direction") || "horizontal";
		prevSibling = resizer.parentElement.previousElementSibling;
		nextSibling = resizer.parentElement.nextElementSibling;

		//#region Before resize event
		if (options.onBeforeResize != null)
		{
			let beforeResizeEvent = new SplitterBeforeResizeEvent();
			beforeResizeEvent.sender = sender;
			beforeResizeEvent.previousDiv = prevSibling;
			beforeResizeEvent.nextDiv = nextSibling;
			beforeResizeEvent.direction = direction;
			options!.onBeforeResize(beforeResizeEvent);

			if (beforeResizeEvent.isDefaultPrevented())
			{
				e.preventDefault();
				return;
			}
		}
		//#endregion

		// Current mouse position
		x = e.clientX;
		y = e.clientY;

		// Previous sibling size
		const rect = prevSibling.getBoundingClientRect();
		prevSiblingHeight = rect.height;
		prevSiblingWidth = rect.width;

		document.addEventListener("mousemove", mouseMoveHandler);
		document.addEventListener("mouseup", mouseUpHandler);
	};

	const mouseMoveHandler = (e: any) =>
	{
		const dx = e.clientX - x;
		const dy = e.clientY - y;

		switch (direction)
		{
			case "vertical":
				{
					const h = (prevSiblingHeight + dy) * 100 / resizer.parentElement.parentNode.getBoundingClientRect().height;
					prevSibling.style.height = `${h}%`;
					nextSibling.style.height = `${100 - h}%`;
				}
				break;
			case "horizontal":
			default:
				{
					const w = (prevSiblingWidth + dx) * 100 / resizer.parentElement.parentNode.getBoundingClientRect().width;
					prevSibling.style.width = `${w}%`;
					nextSibling.style.width = `${100 - w}%`;
				}
				break;
		}

		//#region Cursor & PointerEvents
		const cursor = direction === "horizontal" ? "col-resize" : "row-resize";
		resizer.style.cursor = cursor;
		document.body.style.cursor = cursor;

		prevSibling.style.userSelect = "none";
		prevSibling.style.pointerEvents = "none";

		nextSibling.style.userSelect = "none";
		nextSibling.style.pointerEvents = "none";
		//#endregion
	};

	const mouseUpHandler = () =>
	{
		resizer.style.removeProperty("cursor");
		document.body.style.removeProperty("cursor");

		prevSibling.style.removeProperty("user-select");
		prevSibling.style.removeProperty("pointer-events");

		nextSibling.style.removeProperty("user-select");
		nextSibling.style.removeProperty("pointer-events");

		document.removeEventListener("mousemove", mouseMoveHandler);
		document.removeEventListener("mouseup", mouseUpHandler);

		//#region After resize event
		if (options.onAfterResize != null)
		{
			let beforeResizeEvent = new SplitterAfterResizeEvent();
			beforeResizeEvent.sender = sender;
			beforeResizeEvent.previousDiv = prevSibling;
			beforeResizeEvent.nextDiv = nextSibling;
			beforeResizeEvent.direction = direction;
			options!.onAfterResize(beforeResizeEvent);
		}
		//#endregion
	};

	// Attach the handler
	resizer.addEventListener("mousedown", mouseDownHandler);
};
//#endregion

//#region Classes
class SplitterEvent extends VrControlsEvent
{
	sender: Splitter;
}

class SplitterExpandCollapseEvent extends SplitterEvent
{
	collapse: boolean;
	previousDiv: HTMLElement;
	nextDiv: HTMLElement;
}
class SplitterBeforeExpandCollapseEvent extends SplitterExpandCollapseEvent { }
class SplitterAfterExpandCollapseEvent extends SplitterExpandCollapseEvent { }

class SplitterResizeEvent extends SplitterEvent
{
	sender: Splitter;
	previousDiv: HTMLElement;
	nextDiv: HTMLElement;
	direction: SplitterDirectionEnum;
}
class SplitterBeforeResizeEvent extends SplitterResizeEvent { }
class SplitterAfterResizeEvent extends SplitterResizeEvent { }
//#endregion