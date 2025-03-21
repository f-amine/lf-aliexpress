import React from "react";
import { createPopper, Placement } from '@popperjs/core';
import styles from './popover.module.scss';

type UsePopover = {
  disabled?: boolean;
  delay?: number;
  keepDelay?: number;
  ref?: React.MutableRefObject<HTMLElement | null>;
  showTemporary?: number;
};

export function usePopover(opts: UsePopover = { disabled: false, delay: 0, keepDelay: 0, ref: undefined, showTemporary: 0 }): [React.MutableRefObject<HTMLElement | null>, boolean] {
  const targetRef = React.useRef<HTMLElement | null>(null);
  const [show, setShow] = React.useState(false);
  const ref = React.useRef<any>({});

  React.useLayoutEffect(
    function () {
      if (opts.disabled) {
        return;
      }
      if (!targetRef.current) {
        return;
      }
      let t: NodeJS.Timeout;
      if (opts.showTemporary) {
        setShow(true);
        t = setTimeout(() => {
          setShow(false);
        }, opts.showTemporary);
      }
      
      function mouseover(event: MouseEvent) {
        ref.current.status = 'over';
        setTimeout(
          function () {
            if (ref.current.status !== 'left') {
              setShow(true);
            }
          },
          opts.delay || 0
        );
      }
      
      function mouseleave(event: MouseEvent) {
        Promise.race([
          opts.ref && opts.ref.current ?
            new Promise<boolean>(function (resolve) {
              opts.ref!.current!.addEventListener('mouseenter', function () {
                resolve(true);
              }, { once: true });
            }) : Promise.resolve(false),
          new Promise<boolean>(function (resolve) {
            setTimeout(() => (resolve(false)), opts.keepDelay || 0);
          })
        ])
          .then(
            function (e) {
              function close() {
                setShow(false);
                ref.current.status = 'left';
              }
              if (e === true && opts.ref?.current) {
                opts.ref.current.addEventListener('mouseleave', close, { once: true });
              } else {
                close();
              }
            }
          );
      }

      targetRef.current.addEventListener('mouseover', mouseover);
      targetRef.current.addEventListener('mouseleave', mouseleave);
      
      return () => {
        if (!targetRef.current) {
          return;
        }
        clearTimeout(t);
        targetRef.current.removeEventListener('mouseover', mouseover);
        targetRef.current.removeEventListener('mouseleave', mouseleave);
      };
    },
    [opts.disabled, opts.delay, opts.keepDelay, opts.ref, opts.showTemporary]
  );

  return [targetRef, show];
}

export interface StaticPopoverProps {
  target: React.MutableRefObject<HTMLElement>;
  placement?: Placement;
  className?: string;
  arrowClassName?: string;
  children: React.ReactNode;
  offset?: [number, number];
}

export const StaticPopover = React.forwardRef<HTMLDivElement, StaticPopoverProps>(function ({
  target,
  placement,
  className,
  arrowClassName,
  children,
  offset,
  ...props
}, ref) {
  const refPopover = React.useRef<HTMLDivElement | null>(null);
  const refArrow = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (target.current && refPopover.current) {
      const e = createPopper(target.current, refPopover.current, {
        placement: placement || 'bottom',
        modifiers: [
          {
            name: "arrow",
            options: {
              element: refArrow.current,
            },
          },
          {
            name: 'offset',
            options: {
              offset: offset ?? [0, 10]
            }
          },
        ]
      });
      return () => {
        e.destroy();
      };
    }
  }, [target, placement, offset]);

  return (
    <div
      {...props}
      className={`${styles.popover} ${className || ''}`}
      ref={(e) => {
        refPopover.current = e;
        if (typeof ref === 'function') {
          ref(e);
        } else if (ref) {
          ref.current = e;
        }
      }}
    >
      <div className={styles.arrow} ref={refArrow}>
        <div className={`${styles.visual} ${arrowClassName || ''}`}></div>
      </div>
      {children}
    </div>
  );
});
