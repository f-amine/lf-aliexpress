import { Instance, Placement, createPopper, Modifier } from '@popperjs/core';
import { cx as clsx } from 'class-variance-authority';
import React, { Fragment, ReactElement } from 'react';
import { createPortal } from 'react-dom';

type UseToggleOpts = {
  state?: boolean;
  key?: any;
  disabled?: boolean;
  placement?: Placement;
  offset?: [number, number];
  followTargetWidth?: boolean;
  nonTogglable?: boolean;
  testClose?: (event: MouseEvent) => boolean;
}

// Define a proper type for ReactElement props that can be spread
interface ElementWithProps<P = any> extends ReactElement {
  type: React.ComponentType<P>;
  props: P;
}

type DropdownProps = {
  placement?: Placement;
  keep_on_click_in?: boolean;
  label: ElementWithProps;
  menu?: ElementWithProps;
  className?: string;
  children?: React.ReactNode;
  offset?: [number, number];
}

export const modals = typeof document !== "undefined"
  ? (document.getElementById("modals") ?? document.body)
  : null;

export function Dropdown(props: DropdownProps) {
  const [ref_label, ref_menu, active, setIsOpen] = usePopover<HTMLButtonElement, HTMLDivElement>({
    placement: props.placement,
    offset: props.offset
  });

  const onClick = React.useCallback((e: React.MouseEvent) => {
    if (props.keep_on_click_in && ref_menu.current) {
      const nativeEvent = e.nativeEvent as unknown as { ignoreToggleClick?: HTMLDivElement[] };
      if (!nativeEvent.ignoreToggleClick) {
        nativeEvent.ignoreToggleClick = [];
      }
      nativeEvent.ignoreToggleClick.push(ref_menu.current);
    }
  }, [props.keep_on_click_in, ref_menu]);

  return (
    <Fragment>
      <props.label.type {...props.label.props} ref={ref_label} />
      {
        modals && createPortal(
          active && (
            props.menu ? (
              <props.menu.type
                {...props.menu.props}
                ref={ref_menu}
                onClick={
                  !props.keep_on_click_in
                    ? props.menu.props.onClick
                    : (event: React.MouseEvent) => {
                      if (props.menu?.props.onClick) {
                        props.menu.props.onClick(event);
                      }
                      onClick(event);
                    }
                }
              />
            ) : (
              <DropdownMenu
                onClick={onClick}
                ref={ref_menu}
              >
                {props.children}
              </DropdownMenu>
            )
          ),
          modals
        )
      }
    </Fragment>
  );
}

type DropdownMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  header?: React.ReactNode;
}

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  function DropdownMenu(props, ref) {
    return (
      <div
        {...props}
        ref={ref}
        className={clsx(
          'absolute flex flex-col bg-[#fff] shadow-[0px_3px_10px_rgba(0,0,0,0.08)] border border-[#D3DAE4] rounded-[8px] max-h-[min(50vh,220px)] overflow-y-hidden',
          props.className
        )}
      >
        {props.header}
        <div className="py-[4px] flex flex-col gap-[4px] flex-grow overflow-y-auto">
          {props.children}
        </div>
      </div>
    );
  }
);

export type DropdownItemProps = React.HTMLAttributes<HTMLDivElement> & {
  active?: boolean;
}

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  function DropdownItem({ active, ...props }, ref) {
    return (
      <div
        {...props}
        ref={ref}
        className={clsx(
          "px-[10px] py-[4px] cursor-pointer flex items-center gap-[8px] text-[14px] min-h-[36px]",
          "hover:bg-[#F4F4F4]",
          {
            "bg-[rgba(0,117,255,0.1)] text-[#0075FF] hover:bg-[rgba(0,117,255,0.15)]": active
          },
          props.className
        )}
      >
        {props.children}
      </div>
    );
  }
);

interface PopperOptions {
  placement?: Placement;
  modifiers?: Partial<Modifier<any, any>>[];
  onFirstUpdate?: (() => void) | undefined;
}

export function usePopover<Ref extends HTMLElement = HTMLElement, Menu extends HTMLElement = HTMLElement>(options: UseToggleOpts = {}) {
  const [isOpen, setIsOpen] = React.useState<boolean>(options.state || false);
  const ref = React.useRef<Ref>(null);
  const refMenu = React.useRef<Menu>(null);
  const popper = React.useRef<Instance | null>(null);
  const arrowRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (options.nonTogglable || !ref.current) {
      return;
    }
    function docHandler(event: MouseEvent) {
      if (!(options.testClose?.(event) ?? true)) {
        return;
      }
      setIsOpen(false);
    }
    function handler() {
      setIsOpen(true);
    }
    ref.current.addEventListener("click", handler);
    const t = setTimeout(() => {
      if (isOpen) {
        document.addEventListener("click", docHandler);
      }
    });
    return () => {
      clearTimeout(t);
      if (ref.current) {
        ref.current.removeEventListener("click", handler);
      }
      document.removeEventListener("click", docHandler);
    };
  }, [isOpen, options.testClose, options.nonTogglable]);

  React.useLayoutEffect(
    function () {
      if (options.disabled) {
        return;
      }

      if (!isOpen) {
        return;
      }

      if (!ref.current || !refMenu.current) {
        console.log(ref.current, refMenu.current);
        throw new Error('missing one of ref, refMenu');
      }

      if (options?.followTargetWidth !== false) {
        refMenu.current.style.minWidth = ref.current.offsetWidth + "px";
      }
      
      const opts: PopperOptions = {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: options.offset ?? [0, 8]
            }
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: true,
            }
          },
        ]
      };
      
      if (options.placement) {
        opts.placement = options.placement;
      }

      popper.current = createPopper(
        ref.current,
        refMenu.current,
        opts
      );

      return () => {
        if (popper.current) {
          popper.current.destroy();
          popper.current = null;
        }
      };
    },
    [isOpen, options.key, options.disabled, options.placement, options.offset, options.followTargetWidth]
  );

  return [
    ref as React.MutableRefObject<Ref>,
    refMenu as React.MutableRefObject<Menu>,
    isOpen,
    setIsOpen,
    popper,
    <div
      className={clsx(
        "absolute bg-inherit h-0",
        "data-[popper-placement^='bottom']:top-0",
        "data-[popper-placement^='top']:bottom-0",
        "data-[popper-placement^='right']:left-0",
        "data-[popper-placement^='left']:right-0"
      )}
      ref={arrowRef}
    >
      <div
        className={clsx(
          "w-4 h-4 border border-[#D3DAE4] border-r-transparent border-b-transparent rounded-tl-[3px] bg-inherit",
          "data-[popper-placement^='bottom']:-translate-y-1/2 rotate-45",
          "data-[popper-placement^='top']:-translate-y-1/2 rotate-[225deg]",
          "data-[popper-placement^='right']:-translate-x-1/2 rotate-[315deg]",
          "data-[popper-placement^='left']:translate-x-1/2 rotate-[135deg]"
        )}
      ></div>
    </div>
  ] as const;
}
