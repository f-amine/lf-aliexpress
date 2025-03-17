import { type ClassValue, clsx } from "clsx"
import { setIn } from "immutable";
import lodash from "lodash";
import React from "react";
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeStringForReg(q: string){
  return q.replace(/\\/g, "");
}

export function mapValueToKey(v:any): string {
	if (v === undefined) {
		return 'undefined';
	} else if (v === null) {
		return 'null';
	} else {
		return v.toString();
	}
}

type Action<T> = 
  | { type: 'setIn'; name: string[] | string; value: any }
  | { type: 'reset' }
  | { type: 'func'; func: (state: T) => T };

export function useLocalStore<Type>(
  initialData: Type | (() => Type),
  watch: any[] = [],
  reducer?: (a: Type, b: Type) => Type
): [Type, (a: ((state: Type) => Type) | string[] | string | React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, b?: any) => void] {


	const [state, dispatch] = React.useReducer(
		function (state, ac) {
			let prevState = state;
			switch (ac.type) {
				case 'setIn': {
					let { name, value } = ac;
					state = setIn(state, name, value);
					break;
				}
				case 'reset': {
					state = initialData;
					break;
				};
				case 'func': {
					state = ac.func(state);
					break;
				}
			}
			if (reducer) {
				state = reducer(state, prevState);
			}
			return state;
		},
		initialData,
		(state:any) => {
			if (lodash.isFunction(state)) {
				return state();
			}
			return state;
		}
	);

	const ref = React.useRef(false);

	React.useEffect(
		function () {
			if (!ref.current) {
				ref.current = true;
				return;
			}
			dispatch({ type: 'reset' });
		},
		watch
	);

	function onChange(...params: [any, any?]) {
		if (typeof params[0] === "function") {
			dispatch({
				type: 'func',
				func: params[0]
			});
		} else {
			let [name, value] = mapEventToKeyValue(...params);
			dispatch({
				type: 'setIn',
				name, value
			});
		}
	}

	return [state, onChange]
}

function mapEventToKeyValue(
  event: string[] | string | React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, 
  _value?: any
): [string[] | string, any] {
  if (Array.isArray(event) || (typeof event === 'string')) {
    return [lodash.castArray(event), _value];
  }
  
  let rt: any[] = [event.target.name.split(',')];
  
  if (event.target.type === "checkbox") {
    rt.push((event.target as HTMLInputElement).checked);
  } else if (event.target.type === "number") {
    let value = parseFloat(event.target.value);
    rt.push(isNaN(value) ? null : value);
  } else {
    rt.push(event.target.value);
  }
  
  return rt as [string[] | string, any];
}
